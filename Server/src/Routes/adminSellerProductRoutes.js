const express = require("express");
const router = express.Router();

const {
  listSellerProductsForAdmin,
  approveSellerProduct,
  rejectSellerProduct,
} = require("../controllers/adminSellerProductController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, isAdmin, listSellerProductsForAdmin);
router.put("/:id/approve", protect, isAdmin, approveSellerProduct);
router.put("/:id/reject", protect, isAdmin, rejectSellerProduct);

module.exports = router;



