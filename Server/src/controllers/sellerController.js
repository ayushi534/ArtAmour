// src/controllers/sellerController.js
const asyncHandler = require('express-async-handler');
const Seller = require('../models/sellerModel');
const { signToken } = require('../utils/jwt');

// register seller
const registerSeller = asyncHandler(async (req, res) => {
  const { shopName, ownerName, email, password, phone, address } = req.body;
  if (!shopName || !ownerName || !email || !password) return res.status(400).json({ success:false, message:'shopName, ownerName, email, password required' });

  const exists = await Seller.findOne({ email });
  if (exists) return res.status(400).json({ success:false, message:'Email already registered' });

  const seller = await Seller.create({ shopName, ownerName, email, password, phone, address, role: 'seller' });

  const token = signToken({ id: seller._id.toString(), role: 'seller', type: 'seller' });
  const obj = seller.toObject(); delete obj.password;

  res.status(201).json({ success:true, token, seller: obj });
});

// login seller
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success:false, message:'email & password required' });

  const seller = await Seller.findOne({ email }).select('+password');
  if (!seller) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const ok = await seller.comparePassword(password);
  if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const token = signToken({ id: seller._id.toString(), role: 'seller', type: 'seller' });
  const obj = seller.toObject(); delete obj.password;

  res.json({ success:true, token, seller: obj });
});

const getSellerProfile = asyncHandler(async (req, res) => {
  if (!req.seller) return res.status(401).json({ success:false, message:'Not authenticated' });
  res.json({ success:true, seller: req.seller });
});

module.exports = { registerSeller, loginSeller, getSellerProfile };

