// src/middleware/protectAdmin.js
const asyncHandler = require('express-async-handler');
const { verifyToken, signToken, setTokenCookie } = require('../utils/jwt'); // you provided verifyToken and setTokenCookie earlier
const Admin = require('../models/adminModel');

const protectAdmin = asyncHandler(async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Admin token missing' });
    }

    const decoded = verifyToken(token); // throws if invalid
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const admin = await Admin.findById(decoded.id).select('+password'); // select password if needed for some checks
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // attach admin object (without password)
    admin.password = undefined;
    req.admin = admin;
    req.role = admin.role || 'admin';
    next();
  } catch (err) {
    console.error('protectAdmin error:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired admin token' });
  }
});

const requireRole = (roles = []) => (req, res, next) => {
  if (!Array.isArray(roles)) roles = [roles];
  if (!req.admin) return res.status(401).json({ success: false, message: 'Not authenticated' });
  if (!roles.includes(req.admin.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
  }
  next();
};

module.exports = { protectAdmin, requireRole };
