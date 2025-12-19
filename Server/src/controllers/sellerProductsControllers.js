const asyncHandler = require("express-async-handler");
const SellerProduct = require("../models/sellerProductModel");

// Seller creates product listing
const createSellerProduct = async (req, res) => {
  try {
    const { productId, price, stock, discountPercent } = req.body;

    const sellerProduct = await SellerProduct.create({
      product: productId,
      seller:req.seller._id,
      price,
      stock,
      discountPercent,
      status: "pending",   // 👈 default, but explicit
      isActive: false,     // 👈 default, but explicit
    });

    res.status(201).json({
      message: "Product submitted for admin approval",
      sellerProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Product already added or invalid data",
      error: error.message,
    });
  }
};


const getMySellerProducts = asyncHandler(async (req, res) => {
  const products = await SellerProduct.find({
    seller: req.seller._id,
  }).populate("product", "name basePrice");

  res.json(products);
});

const toggleSellerProduct = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const sellerProduct = await SellerProduct.findOne({
    _id: req.params.id,
    seller: req.seller._id,
  });

  if (!sellerProduct)
    return res.status(404).json({ message: "Not found" });

  if (sellerProduct.status !== "approved")
    return res.status(403).json({
      message: "Product not approved by admin",
    });

  sellerProduct.isActive = isActive;
  await sellerProduct.save();

  res.json({
    message: "Product visibility updated",
    isActive: sellerProduct.isActive,
  });
});

const updateSellerProduct = asyncHandler(async (req, res) => {
  const { price, stock, discountPercent } = req.body;

  const sellerProduct = await SellerProduct.findOne({
    _id: req.params.id,
    seller: req.seller._id,
  });

  if (!sellerProduct)
    return res.status(404).json({ message: "Not found" });

  sellerProduct.price = price ?? sellerProduct.price;
  sellerProduct.stock = stock ?? sellerProduct.stock;
  sellerProduct.discountPercent =
    discountPercent ?? sellerProduct.discountPercent;

  await sellerProduct.save();
  res.json(sellerProduct);
});

const getPendingSellerProducts = async (req, res) => {
  const products = await SellerProduct.find({ status: "pending" })
    .populate("product", "name images")
    .populate("seller", "name email");

  res.json(products);
};

const updateSellerProductStatus = async (req, res) => {
  const { status } = req.body; // approved | rejected

  const sellerProduct = await SellerProduct.findById(req.params.id);

  if (!sellerProduct)
    return res.status(404).json({ message: "Seller product not found" });

  sellerProduct.status = status;

  if (status === "approved") {
    sellerProduct.isActive = false; // seller activates
  }

  await sellerProduct.save();

  res.json({
    message: `Product ${status}`,
    sellerProduct,
  });
};

module.exports = {
  createSellerProduct,
  getMySellerProducts,
  updateSellerProduct,
  toggleSellerProduct,
  getPendingSellerProducts,
  updateSellerProductStatus
};
