const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  getWishlistCount,
  removeFromWishlist,
} = require("../controllers/wishlistControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.get("/count", protect, getWishlistCount);
router.delete("/remove/:productId", protect, removeFromWishlist);

module.exports = router;

