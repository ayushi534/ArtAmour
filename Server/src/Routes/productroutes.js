const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// seller-only
router.post('/', protect, authorizeRoles('seller'), productController.createProduct);
router.get('/seller/me', protect, authorizeRoles('seller'), productController.getSellerProducts);
router.put('/:id', protect, authorizeRoles('seller'), productController.updateProduct);
router.delete('/:id', protect, authorizeRoles('seller'), productController.deleteProduct);

module.exports = router;


