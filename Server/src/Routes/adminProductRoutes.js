// backend/routes/adminProductRoutes.js
const express = require("express");
const router = express.Router();
const {
  listProductsForAdmin,
  getProductForReview,
  approveProduct,
  rejectProduct,
}  = require("../controllers/adminProductController");
const { protect, isAdmin } = require("../middleware/authMiddleware"); // adjust path if needed

// list (default pending)
router.get("/", protect, isAdmin, listProductsForAdmin);
router.get("/:id", protect, isAdmin, getProductForReview);
//router.put("/:id/approve", protect, isAdmin, approveProduct);
//router.put("/:id/reject", protect, isAdmin, rejectProduct);

module.exports = router;
