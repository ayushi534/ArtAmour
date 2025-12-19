// backend/controllers/adminProductController.js
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, subCategory } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: "Name and category are required",
    });
  }

  const images = req.files?.map((file) => file.path) || [];

  const product = await Product.create({
    name,
    description,
    category,
    subcategory: subCategory || null,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});


const listProductsForAdmin = asyncHandler(async (req, res) => {
  const { status = "pending", page = 1, limit = 30 } = req.query;
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

  const query = { status };
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("category", "name slug")
    .populate("subcategory", "name slug");

  const total = await Product.countDocuments(query);

  res.json({ success: true, total, page: Number(page), products });
});


const getProductForReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("seller", "name email shopName profileImage")
    .populate("category", "name slug")
    .populate("subcategory", "name slug");

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({ success: true, product });
});


const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.status = "approved";
  product.adminNote = null;
  await product.save();

  res.json({
    success: true,
    message: "Product approved successfully",
    product,
  });
});


const rejectProduct = asyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note || String(note).trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Rejection reason required (min 3 characters)",
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.status = "rejected";
  product.adminNote = note;
  await product.save();

  res.json({
    success: true,
    message: "Product rejected",
    product,
  });
});

module.exports = {
  createProduct,
  listProductsForAdmin,
  getProductForReview,
  approveProduct,
  rejectProduct,
};
