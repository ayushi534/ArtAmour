const express = require('express');
const router = express.Router();

// controller handlers
const {
  register,
  login,
  me,
  logout,
  approveProduct,
  rejectProduct,
  dashboardStats
} = require('../controllers/adminController');

// NOTE: correct folder name is "middlewares" (plural)
const { protect, isAdmin } = require("../middleware/authMiddleware");

// auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);

// protect -> ensure token valid, then isAdmin -> ensure admin role
router.put("/approve/:id", protect, isAdmin, approveProduct);
router.put("/reject/:id", protect, isAdmin, rejectProduct);
router.get("/dashboard-stats", protect, isAdmin, dashboardStats);


module.exports = router;


