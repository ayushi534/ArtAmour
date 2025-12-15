// controllers/CategoryItemController.js
const CategoryItem = require('../models/categoryitemsModel');
const Category = require('../models/categoryModels');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * POST /api/category-items
 * body: { category, product, position?, is_featured?, custom_image? }
 * ensures unique mapping (schema already enforces it)
 */
const addCategoryItem = async (req, res) => {
  try {
    const payload = req.body || {};
    const { category, product } = payload;
    if (!category || !product) return res.status(400).json({ success: false, message: 'category and product are required' });

    // validate ids
    if (!mongoose.Types.ObjectId.isValid(category) || !mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ success: false, message: 'Invalid category or product id' });
    }

    // ensure category and product exist
    const [cat, prod] = await Promise.all([Category.findById(category), Product.findById(product)]);
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });

    // create mapping (unique index prevents duplicates)
    const item = await CategoryItem.create(payload);
    return res.status(201).json({ success: true, item });
  } catch (err) {
    console.error('addCategoryItem error:', err);
    // duplicate key error handling
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Product already assigned to this category' });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/category-items/:id
 * update position, is_featured, custom_image
 */
const updateCategoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    const payload = req.body || {};
    const item = await CategoryItem.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'CategoryItem not found' });

    return res.json({ success: true, item });
  } catch (err) {
    console.error('updateCategoryItem error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/category-items/:id
 */
const removeCategoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    const item = await CategoryItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'CategoryItem not found' });

    return res.json({ success: true, message: 'CategoryItem removed' });
  } catch (err) {
    console.error('removeCategoryItem error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/category-items/category/:idOrSlug
 * returns products mapped to a category (paginated, sorted by position by default)
 */
const getItemsByCategory = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const { page = 1, limit = 20, sort } = req.query;
    const pageNum = Math.max(1, Number(page));
    const perPage = Math.max(1, Math.min(100, Number(limit)));

    let categoryId = null;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      categoryId = idOrSlug;
    } else {
      const cat = await Category.findOne({ slug: idOrSlug }).select('_id');
      if (cat) categoryId = cat._id;
    }

    if (!categoryId) return res.status(404).json({ success: false, message: 'Category not found' });

    const filter = { category: categoryId };

    let query = CategoryItem.find(filter).populate({ path: 'product', select: '-__v' }).sort({ position: 1, created_at: -1 });

    if (sort) {
      // allow custom sort like sort=position:asc,created_at:desc
      const parts = String(sort).split(',');
      const sortObj = {};
      parts.forEach(p => {
        const [k, d] = p.split(':');
        sortObj[k] = d === 'desc' ? -1 : 1;
      });
      query = query.sort(sortObj);
    }

    const total = await CategoryItem.countDocuments(filter);
    const items = await query.skip((pageNum - 1) * perPage).limit(perPage);

    return res.json({
      success: true,
      total,
      page: pageNum,
      perPage,
      count: items.length,
      items,
    });
  } catch (err) {
    console.error('getItemsByCategory error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/category-items/featured/:idOrSlug
 * returns only featured items for a category (limit optional)
 */
const getFeaturedItemsByCategory = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const limit = Math.max(1, Math.min(50, Number(req.query.limit || 10)));

    let categoryId = null;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      categoryId = idOrSlug;
    } else {
      const cat = await Category.findOne({ slug: idOrSlug }).select('_id');
      if (cat) categoryId = cat._id;
    }

    if (!categoryId) return res.status(404).json({ success: false, message: 'Category not found' });

    const items = await CategoryItem.find({ category: categoryId, is_featured: true })
      .populate('product')
      .sort({ position: 1 })
      .limit(limit);

    return res.json({ success: true, count: items.length, items });
  } catch (err) {
    console.error('getFeaturedItemsByCategory error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/category-items/product/:productId
 * returns categories that a product belongs to (useful for admin/product page)
 */
const getCategoriesForProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ success: false, message: 'Invalid product id' });

    const items = await CategoryItem.find({ product: productId }).populate('category', 'name slug');
    return res.json({ success: true, count: items.length, items });
  } catch (err) {
    console.error('getCategoriesForProduct error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/category-items/reorder
 * body: [{ id: '<categoryItemId>', position: 1 }, ...]
 * Bulk update positions — useful for drag-drop reorder in admin UI
 */
const reorderCategoryItems = async (req, res) => {
  try {
    const changes = Array.isArray(req.body) ? req.body : [];
    if (!changes.length) return res.status(400).json({ success: false, message: 'No reorder payload provided' });

    const bulkOps = changes.map(c => {
      if (!mongoose.Types.ObjectId.isValid(c.id)) return null;
      return {
        updateOne: {
          filter: { _id: c.id },
          update: { $set: { position: Number(c.position) || 0 } }
        }
      };
    }).filter(Boolean);

    if (!bulkOps.length) return res.status(400).json({ success: false, message: 'No valid items to update' });

    const result = await CategoryItem.bulkWrite(bulkOps);
    return res.json({ success: true, result });
  } catch (err) {
    console.error('reorderCategoryItems error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addCategoryItem,
  updateCategoryItem,
  removeCategoryItem,
  getItemsByCategory,
  getFeaturedItemsByCategory,
  getCategoriesForProduct,
  reorderCategoryItems,
};
