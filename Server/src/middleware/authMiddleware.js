const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // ✅ ONLY Bearer token (frontend already uses this)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔴 MUST HAVE role
    if (!decoded.role || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // 🔹 ADMIN
    if (decoded.role === "admin") {
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) throw new Error("Admin not found");
    }

    // 🔹 SELLER
    if (decoded.role === "seller") {
      req.seller = await Seller.findById(decoded.id).select("-password");
      if (!req.seller) throw new Error("Seller not found");
    }

    // 🔹 USER
    if (decoded.role === "user") {
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) throw new Error("User not found");
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ✅ SELLER ONLY
exports.isSeller = (req, res, next) => {
  if (!req.seller) {
    return res.status(403).json({
      success: false,
      message: "Seller access required",
    });
  }
  next();
};

// ✅ ADMIN ONLY
exports.isAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};



