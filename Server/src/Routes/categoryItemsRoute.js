// routes/categoryItems.js
const express = require('express');
const router = express.Router();
const categoryItemController = require('../controllers/categoryItemsController');

// optional auth middleware (uncomment when available)
// const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public read endpoints
router.get('/category/:idOrSlug', categoryItemController.getItemsByCategory);
router.get('/featured/:idOrSlug', categoryItemController.getFeaturedItemsByCategory);
router.get('/product/:productId', categoryItemController.getCategoriesForProduct);

module.exports = router;
