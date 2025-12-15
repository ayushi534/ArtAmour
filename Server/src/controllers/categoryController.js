// controllers/CategoryController.js
const Category = require('../models/categoryModels');
const CategoryItem = require('../models/categoryitemsModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json({ 
      success: true, 
      count: categories.length, 
      categories });
  } catch (err) {
    console.error('getAllCategories error:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message });
  }
};

const getCategoryByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      category = await Category.findById(idOrSlug);
    } else {
      category = await Category.findOne({ slug: idOrSlug });
    }

    if (!category) return res.status(404).json({ 
      success: false, 
      message: 'Category not found' });
    return res.json({ 
      success: true, 
      category });
  } catch (err) {
    console.error('getCategoryByIdOrSlug error:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.name) return res.status(400).json({ success: false, message: 'Name is required' });
    if (!payload.slug) payload.slug = String(payload.name).toLowerCase().trim().replace(/\s+/g, '-');

    // check duplicate slug
    const exists = await Category.findOne({ slug: payload.slug });
    if (exists) return res.status(409).json({ success: false, message: 'Category slug already exists' });

    // handle file uploaded by multer
    let imagePath = null;
    if (req.file) {
      // multer saved file; store path as /uploads/<filename>
      imagePath = `/uploads/${req.file.filename}`;
    } else if (payload.image) {
      // if client sent image path already (optional)
      imagePath = payload.image;
    }

    const category = await Category.create({payload, image: imagePath,});
    return res.status(201).json({ success: true, category });
  } catch (err) {
    console.error('createCategory error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      category = await Category.findById(idOrSlug);
    } else {
      category = await Category.findOne({ slug: idOrSlug });
    }
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    const payload = req.body || {};

    if (payload.slug && payload.slug !== category.slug) {
      const other = await Category.findOne({ slug: payload.slug });
      if (other) return res.status(409).json({ success: false, message: 'Category slug already exists' });
    }
    if (req.file) {
      const newPath = `/uploads/${req.file.filename}`;

      // delete old file if it starts with /uploads/
      if (category.image && typeof category.image === 'string' && category.image.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '..', '..', category.image); // projectRoot + /uploads/...
        fs.access(oldFilePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(oldFilePath, (unlinkErr) => {
              if (unlinkErr) console.error('Failed to unlink old category image', unlinkErr);
            });
          }
        });
      }

      category.image = newPath;
    }


    Object.assign(category, payload);
    await category.save();
    return res.json({ success: true, category });
  } catch (err) {
    console.error('updateCategory error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      category = await Category.findById(idOrSlug);
    } else {
      category = await Category.findOne({ slug: idOrSlug });
    }

    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    // check category items
    const categoryItemCount = await CategoryItem.countDocuments({ category: category._id });
    const directProductCount = await Product.countDocuments({ category: category._id });

    if (categoryItemCount > 0 || directProductCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Category has assigned products. Remove or reassign products before deleting.',
        details: { categoryItemCount, directProductCount },
      });
    }

    await category.deleteOne();
    return res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error('deleteCategory error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByIdOrSlug,
  createCategory,
  updateCategory,
  deleteCategory,
};

