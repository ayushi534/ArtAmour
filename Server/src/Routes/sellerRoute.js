const express = require('express');
const router = express.Router();

const {
  registerSeller,
  loginSeller,
  sellerProfile
} = require('../controllers/sellerAuthController');

const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/signup', registerSeller);
router.post('/login', loginSeller);

// Protected
router.get('/profile', protect, sellerProfile);

module.exports = router;




