const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId, isActive: true });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  cart.totalAmount = cart.items.reduce(
    (sum, i) => sum + i.quantity * product.price,
    0
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Added to cart",
    cart,
  });
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id, isActive: true })
    .populate("items.product");

  res.json(cart || { items: [], totalItems: 0, totalAmount: 0 });
};

exports.getCartCount = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id, isActive: true });

  res.json({ count: cart ? cart.totalItems : 0 });
};

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id, isActive: true });

  if (!cart) return res.json({ success: true });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  cart.totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);
  cart.totalAmount = 0;

  await cart.save();

  res.json({ success: true, message: "Removed from cart" });
};
