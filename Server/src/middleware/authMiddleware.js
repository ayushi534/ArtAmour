// middleware/authMiddleware.js
const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../utils/jwt");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");

// Protect: supports tokens with or without `type`.
// If token has type === "seller", load Seller by id.
// Otherwise try loading User first and then Seller linked to that user.
const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const decoded = verifyToken(token); // should throw if invalid
    if (!decoded || !decoded.id) return res.status(401).json({ success: false, message: "Invalid token" });

    // 1) If token explicitly marks seller -> load Seller by id
    if (decoded.type === "seller") {
      const seller = await Seller.findById(decoded.id).select("-password");
      if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
      req.seller = seller;
      req.user = seller; // backward compatibility (treat seller as user)
      req.role = "seller";
      return next();
    }

    // 2) If token explicitly marks user -> load User then seller (if any)
    if (decoded.type === "user") {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      req.user = user;
      req.role = user.role || "user";

      // find seller linked to this user (if your Seller schema stores userId or user)
      // adjust the query field to match your Seller schema (userId / user / owner)
      const seller = await Seller.findOne({ userId: user._id }) || await Seller.findOne({ user: user._id });
      req.seller = seller || null;
      return next();
    }

    // 3) If token has no type: try User -> Seller fallback
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
      req.role = user.role || "user";
      const seller = await Seller.findOne({ userId: user._id }) || await Seller.findOne({ user: user._id });
      req.seller = seller || null;
      return next();
    }

    // 4) Finally, try to load Seller by id (maybe token id is seller id)
    const seller = await Seller.findById(decoded.id).select("-password");
    if (seller) {
      req.seller = seller;
      req.user = seller;
      req.role = "seller";
      return next();
    }

    return res.status(401).json({ success: false, message: "User/Seller not found" });
  } catch (err) {
    console.error("Protect error:", err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

// isSeller: ensure seller exists (set by protect)
const isSeller = asyncHandler(async (req, res, next) => {
  if (!req.seller) {
    return res.status(403).json({ success: false, message: "Seller account required" });
  }
  next();
});

const isAdmin = (req, res, next) => {
  if (!req.user || req.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only route" });
  }
  next();
};

module.exports = { protect, isSeller, isAdmin };
