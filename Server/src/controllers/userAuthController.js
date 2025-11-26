/// src/controllers/userAuthController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { signToken, setTokenCookie } = require("../utils/jwt");

// Register user
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, dob } = req.body;
  if (!name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "name,email,password,phone required" });
  }

  const exists = await User.findOne({ email });
  if (exists)
    return res
      .status(400)
      .json({ success: false, message: "Email already registered" });

  const user = await User.create({
    name,
    email,
    password,
    phone,
    dob,
    role: "user",
  });

  // create token and set cookie (so user is logged in immediately after register)
  const token = signToken({ id: user._id.toString(), role: "user" });
  setTokenCookie(res, token);

  const obj = user.toObject();
  delete obj.password;

  res
    .status(201)
    .json({ success: true, message: "User registered", token, user: obj });
});

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "email & password required" });

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const ok = await user.matchPassword(password);
  if (!ok)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const token = signToken({ id: user._id.toString(), role: user.role });
  setTokenCookie(res, token);

  const obj = user.toObject();
  delete obj.password;

  res.json({ success: true, message: "Login successful", token, user: obj });
});

// Logout user (clear cookie)
const logout = asyncHandler(async (req, res) => {
  // Clear cookie: set empty value and maxAge 0
  // Note: try to match attributes used in setTokenCookie for predictable behavior.
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // if utils uses 'lax' in dev; keep consistent
    maxAge: 0,
  });

  res.json({ success: true, message: "Logged out" });
});

// Get my profile (protected)
const profile = asyncHandler(async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  res.json({ success: true, user: req.user, seller: req.seller || null });
});

module.exports = { register, login, logout, profile };
