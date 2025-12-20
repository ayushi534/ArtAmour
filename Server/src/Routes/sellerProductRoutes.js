const express = require("express");
const router = express.Router();

const {
  createSellerProduct,
  getMySellerProducts,
  toggleSellerProduct,
  updateSellerProduct,
} = require("../controllers/sellerProductsControllers");

const { protect, isSeller } = require("../middleware/authMiddleware");

// ---------------- Seller Routes ---------------- //

// Create a new product request
router.post("/", protect, isSeller, createSellerProduct);

// Get seller's own products
router.get("/me", protect, isSeller, getMySellerProducts);

// Update a seller product (price, stock, discount)
router.put("/:id", protect, isSeller, updateSellerProduct);

// Toggle product visibility (activate/deactivate)
router.patch("/:id/toggle", protect, isSeller, toggleSellerProduct);

module.exports = router;

