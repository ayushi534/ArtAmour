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

// Protected endpoints (admin or seller)
// Add protect/authorizeRoles as per your app
// router.post('/', protect, authorizeRoles('admin'), categoryItemController.addCategoryItem);
// router.put('/:id', protect, authorizeRoles('admin'), categoryItemController.updateCategoryItem);
// router.delete('/:id', protect, authorizeRoles('admin'), categoryItemController.removeCategoryItem);
// router.put('/reorder', protect, authorizeRoles('admin'), categoryItemController.reorderCategoryItems);

// If you only have a single protect middleware (no roles), use:
// router.post('/', protect, categoryItemController.addCategoryItem);
// router.put('/:id', protect, categoryItemController.updateCategoryItem);
// router.delete('/:id', protect, categoryItemController.removeCategoryItem);
// router.put('/reorder', protect, categoryItemController.reorderCategoryItems);

module.exports = router;
