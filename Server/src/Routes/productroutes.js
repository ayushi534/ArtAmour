const express = require('express');
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getAllProducts,
  getProductById
} = require('../controllers/productController');

const { protect, isSeller } = require('../middleware/authMiddleware');

// PUBLIC: list all products
router.get('/', getAllProducts);

// Put specific seller route BEFORE the ':id' param route
router.get('/seller/me', protect, isSeller, getMyProducts);

// SINGLE PRODUCT (by id) — keep param routes after specific ones
router.get('/:id', getProductById);

// SELLER-ONLY: create / update / delete
router.post('/', protect, isSeller, createProduct);
router.put('/:id', protect, isSeller, updateProduct);
router.delete('/:id', protect, isSeller, deleteProduct);

module.exports = router;


