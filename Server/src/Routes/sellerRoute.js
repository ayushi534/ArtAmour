const express = require('express');
const router = express.Router();
const { registerSeller, loginSeller, getSellerProfile } = require('../controllers/sellerController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.get('/profile', protect, authorizeRoles('seller'), getSellerProfile);

module.exports = router;
