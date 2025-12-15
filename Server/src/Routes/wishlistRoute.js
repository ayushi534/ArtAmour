// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const wishlistCtrl = require("../controllers/wishlistControlers");
const { protect } = require("../middleware/authMiddleware"); // implement verifyAuth

router.post("/", protect, wishlistCtrl.addToWishlist);
router.delete("/:productId", protect, wishlistCtrl.removeFromWishlist);
router.get("/", protect, wishlistCtrl.getWishlist);
router.get("/count", protect, wishlistCtrl.countWishlist);

module.exports = router;
