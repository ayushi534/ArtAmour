// controllers/wishlistController.js
const Wishlist = require("../models/wishlistModel"); 
const Product = require("../models/productModel");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // validate product exists and is approved
    const product = await Product.findById(productId);
    if (!product || product.status !== "approved") {
      return res.status(404).json({ message: "Product not available" });
    }

    // check if already exists and active
    let existing = await Wishlist.findOne({ user: userId, product: productId });

    if (existing && existing.isActive) {
      return res.status(200).json({ message: "Already in wishlist", wishlist: existing });
    }

    if (existing && !existing.isActive) {
      existing.isActive = true;
      existing.addedAt = Date.now();
      await existing.save();
      return res.status(200).json({ message: "Added to wishlist", wishlist: existing });
    }

    // create
    const wishlist = await Wishlist.create({ user: userId, product: productId });
    return res.status(201).json({ message: "Added to wishlist", wishlist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove (soft-delete or delete) from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const doc = await Wishlist.findOne({ user: userId, product: productId });
    if (!doc) return res.status(404).json({ message: "Wishlist item not found" });

    // soft-delete
    doc.isActive = false;
    await doc.save();
    return res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get user's wishlist (paginated)
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const items = await Wishlist.find({ user: userId, isActive: true })
      .sort({ addedAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate({
        path: "product",
        select: "title price images stock status"
      });

    return res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Count wishlist (for navbar)
exports.countWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Wishlist.countDocuments({ user: userId, isActive: true });
    return res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
