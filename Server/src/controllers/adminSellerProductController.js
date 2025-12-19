const asyncHandler = require("express-async-handler");
const SellerProduct = require("../models/sellerProductModel");

const listSellerProductsForAdmin = asyncHandler(async (req, res) => {
  const status = req.query.status || "pending";

  const sellerProducts = await SellerProduct.find({ status })
    .populate("product", "name images category")
    .populate("seller", "name email shopName")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    sellerProducts,
  });
});

// APPROVE
const approveSellerProduct = asyncHandler(async (req, res) => {
  const sellerProduct = await SellerProduct.findById(req.params.id);

  if (!sellerProduct) {
    res.status(404);
    throw new Error("Seller product not found");
  }

  sellerProduct.status = "approved";
  sellerProduct.isActive = false;
  sellerProduct.adminNote = null;

  await sellerProduct.save();

  res.json({
    success: true,
    message: "Seller product approved",
  });
});

// REJECT
const rejectSellerProduct = asyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note) {
    res.status(400);
    throw new Error("Rejection note required");
  }

  const sellerProduct = await SellerProduct.findById(req.params.id);

  if (!sellerProduct) {
    res.status(404);
    throw new Error("Seller product not found");
  }

  sellerProduct.status = "rejected";
  sellerProduct.isActive = false;
  sellerProduct.adminNote = note;

  await sellerProduct.save();

  res.json({
    success: true,
    message: "Seller product rejected",
  });
});

module.exports = {
  listSellerProductsForAdmin,
  approveSellerProduct,
  rejectSellerProduct,
};


