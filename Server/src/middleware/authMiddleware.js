const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Cookie token (optional)
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2️⃣ Bearer token (preferred)
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

    if (!decoded.id || !decoded.role) {
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
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ✅ SELLER ONLY
exports.isSeller = (req, res, next) => {
  if (req.seller) return next();

  return res.status(403).json({
    success: false,
    message: "Seller access required",
  });
};

// ✅ ADMIN ONLY
exports.isAdmin = (req, res, next) => {
  if (req.admin) return next();

  return res.status(403).json({
    success: false,
    message: "Admin access required",
  });
};




