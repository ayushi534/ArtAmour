// src/middleware/authMiddleware.js
const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../utils/jwt');
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  // cookie first
  if (req.cookies && req.cookies.token) token = req.cookies.token;
  // header fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ success:false, message:'Not authorized, token missing' });

  try {
    const decoded = verifyToken(token); // { id, role, type }
    if (!decoded || !decoded.id) throw new Error('Invalid token');

    if (decoded.type === 'seller' || decoded.role === 'seller') {
      const seller = await Seller.findById(decoded.id).select('-password');
      if (!seller) return res.status(401).json({ success:false, message:'Seller not found' });
      req.seller = seller;
      req.user = null;
      req.role = 'seller';
      req.authId = seller._id;
    } else {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ success:false, message:'User not found' });
      req.user = user;
      req.seller = null;
      req.role = 'user';
      req.authId = user._id;
    }

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ success:false, message:'Not authorized, token invalid' });
  }
});

const authorizeRoles = (...allowed) => (req, res, next) => {
  if (!req.role) return res.status(403).json({ success:false, message:'Role not found' });
  if (!allowed.includes(req.role)) return res.status(403).json({ success:false, message:'Forbidden' });
  next();
};

module.exports = { protect, authorizeRoles };

