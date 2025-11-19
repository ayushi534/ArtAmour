// src/controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const { signToken } = require('../utils/jwt');

// Combined register: client should pass role ('user'|'seller'), but both paths separate logic.
// This controller simply delegates but keeps endpoints consolidated.
const register = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (role === 'seller') {
    // delegate to seller flow
    const { shopName, ownerName, email, password, phone, address } = req.body;
    if (!shopName || !ownerName || email == null || password == null) return res.status(400).json({ success:false, message:'missing seller fields' });
    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ success:false, message:'Email already registered' });
    const seller = await Seller.create({ shopName, ownerName, email, password, phone, address, role:'seller' });
    const token = signToken({ id: seller._id.toString(), role: 'seller', type: 'seller' });
    const obj = seller.toObject(); delete obj.password;
    return res.status(201).json({ success:true, token, seller: obj });
  }

  // default: user
  const { name, email, password, phone } = req.body;
  if (!name || email == null || password == null) return res.status(400).json({ success:false, message:'missing user fields' });
  const existsUser = await User.findOne({ email });
  if (existsUser) return res.status(400).json({ success:false, message:'Email already registered' });
  const user = await User.create({ name, email, password, phone, role:'user' });
  const token = signToken({ id: user._id.toString(), role: 'user', type: 'user' });
  const obj = user.toObject(); delete obj.password;
  return res.status(201).json({ success:true, token, user: obj });
});

// Combined login: prefer role param, else auto-detect by email (user first then seller)
const login = asyncHandler(async (req, res) => {
  const { role, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success:false, message:'email & password required' });

  // if role explicitly provided -> restrict to that model
  if (role === 'user') {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = signToken({ id: user._id.toString(), role:'user', type:'user' });
    const obj = user.toObject(); delete obj.password;
    return res.json({ success:true, token, user: obj });
  } else if (role === 'seller') {
    const seller = await Seller.findOne({ email }).select('+password');
    if (!seller) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const ok = await seller.comparePassword(password);
    if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = signToken({ id: seller._id.toString(), role:'seller', type:'seller' });
    const obj = seller.toObject(); delete obj.password;
    return res.json({ success:true, token, seller: obj });
  }

  // auto-detect: try user first, then seller
  let user = await User.findOne({ email }).select('+password');
  if (user) {
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = signToken({ id: user._id.toString(), role:'user', type:'user' });
    const obj = user.toObject(); delete obj.password;
    return res.json({ success:true, token, user: obj });
  }

  const seller = await Seller.findOne({ email }).select('+password');
  if (seller) {
    const ok = await seller.comparePassword(password);
    if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = signToken({ id: seller._id.toString(), role:'seller', type:'seller' });
    const obj = seller.toObject(); delete obj.password;
    return res.json({ success:true, token, seller: obj });
  }

  return res.status(401).json({ success:false, message:'Invalid credentials' });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly:true, expires: new Date(0) });
  res.json({ success:true, message:'Logged out' });
});

const getMe = asyncHandler(async (req, res) => {
  if (req.role === 'seller') return res.json({ success:true, data: req.seller });
  if (req.role === 'user') return res.json({ success:true, data: req.user });
  return res.status(403).json({ success:false, message:'No profile' });
});

module.exports = { register, login, logout, getMe };


