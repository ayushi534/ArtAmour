const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  getCartCount,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.get("/count", protect, getCartCount);
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;

