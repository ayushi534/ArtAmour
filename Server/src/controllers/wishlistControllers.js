const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

exports.addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const exists = await Wishlist.findOne({
    user: userId,
    product: productId,
    isActive: true,
  });

  if (exists) {
    return res.json({ message: "Already in wishlist" });
  }

  const wishlistItem = await Wishlist.create({
    user: userId,
    product: productId,
  });

  res.status(201).json({
    success: true,
    message: "Added to wishlist",
    wishlistItem,
  });
};

exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.find({
    user: req.user._id,
    isActive: true,
  }).populate("product");

  res.json(wishlist);
};

exports.getWishlistCount = async (req, res) => {
  const count = await Wishlist.countDocuments({
    user: req.user._id,
    isActive: true,
  });

  res.json({ count });
};

exports.removeFromWishlist = async (req, res) => {
  await Wishlist.findOneAndUpdate(
    { user: req.user._id, product: req.params.productId },
    { isActive: false }
  );

  res.json({ success: true, message: "Removed from wishlist" });
};

