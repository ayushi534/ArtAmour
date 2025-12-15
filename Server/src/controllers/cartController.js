// controllers/cartController.js
const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

async function getOrCreateCart({ userId = null, sessionId = null }) {
  // prefer user cart
  if (userId) {
    let cart = await Cart.findOne({ user: userId, isActive: true });
    if (!cart) cart = await Cart.create({ user: userId });
    return cart;
  }
  // guest session
  if (sessionId) {
    let cart = await Cart.findOne({ sessionId, isActive: true });
    if (!cart) cart = await Cart.create({ sessionId });
    return cart;
  }
  // fallback: create anonymous cart without user or session (rare)
  return await Cart.create({});
}

exports.getCart = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const sessionId = req.cookies?.sessionId || req.header("x-session-id") || null;

    const cart = await getOrCreateCart({ userId, sessionId });

    // fetch items
    const items = await CartItem.find({ cart: cart._id }).populate({
      path: "product",
      select: "title price images stock status"
    });

    return res.status(200).json({ cart, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add item to cart
exports.addItem = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userId = req.user ? req.user._id : null;
    const sessionId = req.cookies?.sessionId || req.header("x-session-id") || null;
    const { productId, skuId = null, quantity = 1, replace = false } = req.body;

    // product validation
    const product = await Product.findById(productId);
    if (!product || product.status !== "approved") {
      await session.abortTransaction();
      return res.status(404).json({ message: "Product not available" });
    }

    if (product.stock <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // ensure requested qty <= stock
    if (quantity > product.stock) {
      await session.abortTransaction();
      return res.status(400).json({ message: `Only ${product.stock} items available` });
    }

    const cart = await getOrCreateCart({ userId, sessionId });

    // call static helper to addOrUpdate
    const item = await CartItem.addOrUpdate({
      cartId: cart._id,
      productId,
      skuId,
      productName: product.title,
      skuCode: null,
      unitPrice: Number(product.price),
      quantity: Number(quantity),
      replace,
      session
    });

    // commit
    await session.commitTransaction();
    session.endSession();

    // recalc totals and return
    const updatedCart = await Cart.recalculateTotals(cart._id);
    const items = await CartItem.find({ cart: cart._id }).populate("product", "title price images stock status");

    return res.status(200).json({ cart: updatedCart, items, item });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update cart item quantity
exports.updateItem = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const sessionId = req.cookies?.sessionId || req.header("x-session-id") || null;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findById(itemId).populate("product");
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    // security: ensure cart belongs to this user/session
    const cart = await Cart.findById(item.cart);
    if (userId && cart.user && cart.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!userId && sessionId && cart.sessionId !== sessionId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // check stock
    if (item.product.stock < quantity) {
      return res.status(400).json({ message: `Only ${item.product.stock} available` });
    }

    item.quantity = quantity;
    await item.save(); // post-save hook will recalc totals
    const updatedCart = await Cart.findById(cart._id);
    const items = await CartItem.find({ cart: cart._id }).populate("product", "title price images stock status");

    return res.status(200).json({ cart: updatedCart, items, item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove cart item
exports.removeItem = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const sessionId = req.cookies?.sessionId || req.header("x-session-id") || null;
    const { itemId } = req.params;

    const item = await CartItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    const cart = await Cart.findById(item.cart);
    if (userId && cart.user && cart.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!userId && sessionId && cart.sessionId !== sessionId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await item.remove(); // post-remove hook will recalc totals
    const updatedCart = await Cart.findById(cart._id);
    const items = await CartItem.find({ cart: cart._id }).populate("product", "title price images stock status");

    return res.status(200).json({ cart: updatedCart, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
