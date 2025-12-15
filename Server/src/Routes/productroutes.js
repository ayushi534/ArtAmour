const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getAllProducts,
  getProductById,
  getProductsByCategory
} = require('../controllers/productController');
const upload = require("../middleware/multerMiddleware");
const { protect, isSeller } = require('../middleware/authMiddleware');

router.get('/', getAllProducts);
router.get('/seller/me', protect, isSeller, getMyProducts);
router.get('/:id', getProductById);
router.get("/category/:categoryId", getProductsByCategory);
router.post('/', protect, isSeller,  upload.array("images", 5), createProduct);
router.put('/:id', protect, isSeller, updateProduct);
router.delete('/:id', protect, isSeller, deleteProduct);

module.exports = router;


