const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
 const SellerProduct = require("../models/sellerProductModel")
const Category = require('../models/categoryModels')


const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      color,
      categorySlug
    } = req.query;

    let filter = {
      status: "active" 
    };

    // 🔹 Category by ID
    if (category) {
      filter.category = category;
    }

    // 🔹 Category by SLUG (frontend friendly)
    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) filter.category = cat._id;
    }

    // 🔹 Subcategory (categoryItem)
    if (subcategory) {
      filter.subcategory = subcategory;
    }

    // 🔹 Color filter (if field exists)
    if (color) {
      filter.color = color;
    }

    // 🔹 Price filter
    if (minPrice || maxPrice) {
      filter.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subcategory", "name");

    res.json({
      success: true,
      count: products.length,
      products,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, product: p });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const createProduct = asyncHandler(async (req, res) => {
  if (!req.seller || !req.seller._id) {
    return res.status(401).json({
      success: false,
      message: "seller authenticated required"
    });
  }

  const {
    name,
    description,
    price,
    mrp,
    category,
    subcategory,
    stock,
    color
  } = req.body;

  if (!name || price == null || !category) {
    return res.status(400).json({
      success: false,
      message: "name, price and category are required"
    });
  }

   // ✅ Images from Multer
  const images = req.files
    ? req.files.map(file => `/uploads/products/${file.filename}`)
    : [];

  // 1️⃣ Validate main category
  const parentCategory = await Category.findById(category);
  if (!parentCategory) {
    return res.status(400).json({
      success: false,
      message: "Invalid category"
    });
  }

  // 2️⃣ Validate subcategory (if provided)
  if (subcategory) {
    const childCategory = await Category.findById(subcategory);
     if (
      !childCategory.parent ||
      childCategory.parent.toString() !== category.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory"
      });
    }
  }

  // 3️⃣ Create Product (this IS the category item)
  const product = await Product.create({
    seller: req.seller._id,
    name,
    description,
    price: Number(price),
    mrp: mrp ? Number(mrp) : undefined,
    category,
    subcategory: subcategory || null,
    images,
    stock: stock ? Number(stock) : 1,
    color,
    status: "active" 
  });

  res.status(201).json({
    success: true,
    message: "Product created and submitted for review",
    product
  });
});



const getMyProducts = async (req, res) => {
  try {
    if (!req.seller) return res.status(403).json({ success:false, message:'Seller required' });
    const products = await Product.find({ seller: req.seller._id });
    res.json({ success:true, products });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.seller || product.seller.toString() !== req.seller._id.toString())
      return res.status(403).json({ success:false, message:'Not owner' });

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    await product.save();
    res.json({ success:true, product });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.seller || product.seller.toString() !== req.seller._id.toString())
      return res.status(403).json({ success:false, message:'Not owner' });
    await product.remove();
    res.json({ success:true, message:'Deleted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

// controllers/productController.js
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const products = await SellerProduct.find({
    category: categoryId,
    status: "active",
  })
  .populate("subcategory", "name");

  res.status(200).json(products);
};

const getApprovedProducts = asyncHandler(async (req, res) => {
  try {
    const products = await SellerProduct.find({
      status: "approved",
      isActive: true,
    })
      .populate("product") // master product info
      .populate("seller", "name")
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("getApprovedProducts error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports ={ getAllProducts, getProductById, createProduct, getMyProducts ,updateProduct, deleteProduct, getProductsByCategory, getApprovedProducts}







