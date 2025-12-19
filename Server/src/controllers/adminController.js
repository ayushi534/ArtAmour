const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Product = require("../models/productModel"); 
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const { signToken, setTokenCookie} = require("../utils/jwt");

// Register (creates admin and returns token + admin info)
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "name, email, password required" });

  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already used" });

  const admin = new Admin({ name, email, password, role });
  await admin.save(); // will hash password via pre-save hook

  const token = signToken({
    id: admin._id,
    email: admin.email,
    role: "admin",
  });
  setTokenCookie(res, token);

  // hide password
  admin.password = undefined;

  res.status(201).json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    },
  });
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: admin._id,
    role: "admin"     
   
  });

  setTokenCookie(res, token);

  admin.password = undefined;

  res.json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    },
  });
});

const me = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const decoded = verifyAdminToken(token);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ message: "Not authenticated" });
    res.json({ admin });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = "approved";
    product.rejectionReason = "";

    await product.save();

    res.status(200).json({
      message: "Product approved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectProduct = async (req, res) => {
  try {
    const { reason } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = "rejected";
    product.rejectionReason = reason || "Admin rejected this product";

    await product.save();

    res.status(200).json({
      message: "Product rejected",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/adminController.js
const dashboardStats = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeSellers = await Seller.countDocuments({ status: "approved" });
  const users = await User.countDocuments();

  res.json({
    totalProducts,
    activeSellers,
    users,
  });
};


module.exports = { login, register, me, logout, approveProduct, rejectProduct , dashboardStats };
