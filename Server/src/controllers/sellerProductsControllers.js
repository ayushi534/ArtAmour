const asyncHandler = require("express-async-handler");
const SellerProduct = require("../models/sellerProductModel");

// Seller creates product listing
const createSellerProduct = asyncHandler(async (req, res) => {
  const { productId, price, stock, discountPercent } = req.body;

  // 1️⃣ Ensure required fields
  if (!productId || price == null || stock == null) {
    return res.status(400).json({
      message: "Product, price, and stock are required",
    });
  }

  // 2️⃣ Ensure seller exists
  if (!req.seller) {
    return res.status(403).json({
      message: "Seller authentication required",
    });
  }

  // 3️⃣ Prevent duplicate product for same seller
  const existing = await SellerProduct.findOne({
    seller: req.seller._id,
    product: productId,
  });

  if (existing) {
    return res.status(400).json({
      message: "You already submitted this product",
    });
  }

  // 4️⃣ Create product request (pending approval)
  const sellerProduct = await SellerProduct.create({
    product: productId,
    seller: req.seller._id,
    price,
    stock,
    discountPercent: discountPercent || 0,
    status: "pending",    // admin approval required
    isActive: false,      // seller can activate after approval
  });

  res.status(201).json({
    message: "Product submitted for admin approval",
    sellerProduct,
  });
});

// Get seller's products
const getMySellerProducts = asyncHandler(async (req, res) => {
  const products = await SellerProduct.find({ seller: req.seller._id })
    .populate("product", "name basePrice images")
    .sort({ createdAt: -1 });

  res.json({ success: true, products });
});

// Update product (price, stock, discount)
const updateSellerProduct = asyncHandler(async (req, res) => {
  const { price, stock, discountPercent } = req.body;

  const sellerProduct = await SellerProduct.findOne({
    _id: req.params.id,
    seller: req.seller._id,
  });

  if (!sellerProduct) return res.status(404).json({ message: "Not found" });

  sellerProduct.price = price ?? sellerProduct.price;
  sellerProduct.stock = stock ?? sellerProduct.stock;
  sellerProduct.discountPercent =
    discountPercent ?? sellerProduct.discountPercent;

  await sellerProduct.save();
  res.json({ message: "Product updated", sellerProduct });
});

// Toggle product visibility
const toggleSellerProduct = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const sellerProduct = await SellerProduct.findOne({
    _id: req.params.id,
    seller: req.seller._id,
  });

  if (!sellerProduct) return res.status(404).json({ message: "Not found" });

  if (sellerProduct.status !== "approved") {
    return res.status(403).json({
      message: "Product not approved by admin",
    });
  }

  sellerProduct.isActive = !!isActive;
  await sellerProduct.save();

  res.json({
    message: "Product visibility updated",
    isActive: sellerProduct.isActive,
  });
});

// Admin: get all pending products
const getPendingSellerProducts = asyncHandler(async (req, res) => {
  const products = await SellerProduct.find({ status: "pending" })
    .populate("product", "name images")
    .populate("seller", "name email");

  res.json({ success: true, products });
});

// Admin: approve/reject seller product
const updateSellerProductStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // approved | rejected

  const sellerProduct = await SellerProduct.findById(req.params.id);
  if (!sellerProduct)
    return res.status(404).json({ message: "Seller product not found" });

  sellerProduct.status = status;
  if (status === "approved") sellerProduct.isActive = false;

  await sellerProduct.save();

  res.json({
    message: `Product ${status}`,
    sellerProduct,
  });
});

module.exports = {
  createSellerProduct,
  getMySellerProducts,
  updateSellerProduct,
  toggleSellerProduct,
  getPendingSellerProducts,
  updateSellerProductStatus,
};
