// src/controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { signToken } = require('../utils/jwt');

// register user (returns token + minimal user)
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success:false, message:'name,email,password required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ success:false, message:'Email already registered' });

  const user = await User.create({ name, email, password, phone, role: 'user' });

  const token = signToken({ id: user._id.toString(), role: 'user', type: 'user' });
  const obj = user.toObject(); delete obj.password;

  res.status(201).json({ success:true, token, user: obj });
});

// login user (returns token + minimal user)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success:false, message:'email & password required' });

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const token = signToken({ id: user._id.toString(), role: 'user', type: 'user' });
  const obj = user.toObject(); delete obj.password;

  res.json({ success:true, token, user: obj });
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set in auth middleware
  if (!req.user) return res.status(401).json({ success:false, message:'Not authenticated' });
  res.json({ success:true, user: req.user });
});

module.exports = { registerUser, loginUser, getUserProfile };

