// controllers/retailerAuthController.js
const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");
const { signToken, setTokenCookie } = require("../utils/jwt");

// Helper to sanitize seller before sending (remove password)
function sanitizeSeller(sellerDoc) {
  const s = sellerDoc.toObject ? sellerDoc.toObject() : { ...sellerDoc };
  delete s.password;
  return s;
}

const registerSeller = async (req, res, next) => {
  try {
    const { name, shopName, email, phone, password, shopAddress } = req.body;

    // Required fields
    if (!name || !shopName || !email || !phone || !password || !shopAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Basic phone/email format checks (optional but helpful)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!/^[0-9]{10}$/.test(String(phone))) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: "Seller already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create seller (include shopName and shopAddress correctly)
    const newRetailer = await Seller.create({
      name,
      shopName,
      email,
      phone,
      password: hashedPassword,
      shopAddress,
    });

    // Create JWT and set cookie (optional but recommended)
    const token = signToken({ id: Seller._id.toString(), role: "seller" });
    setTokenCookie(res, token);

    // Send sanitized seller
    res.status(201).json({
      message: "Seller registered successfully",
      token,
      seller: sanitizeSeller(Seller),
    });
  } catch (err) {
    next(err);
  }
};

const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    // Create JWT
    const token = signToken({ id: seller._id.toString(), role: "seller" });
    setTokenCookie(res, token);

    res.json({
      message: "Seller login successful",
      token,
      seller: sanitizeSeller(seller),
    });
  } catch (err) {
    next(err);
  }
};

const sellerProfile = async (req, res) => {
  // assuming protect middleware sets req.user to seller doc
  res.json({
    message: "Seller profile loaded",
    seller: req.user ? sanitizeSeller(req.user) : null,
  });
};

module.exports = { registerSeller, loginSeller, sellerProfile };
