const express = require("express");
const router = express.Router();

const {
  createSellerProduct,
  getMySellerProducts,
  toggleSellerProduct,
  updateSellerProduct,
} = require("../controllers/sellerProductsControllers");

const { protect, isSeller } = require("../middleware/authMiddleware");

router.post("/", protect, isSeller, createSellerProduct);
router.get("/me", protect, isSeller, getMySellerProducts);
router.patch("/:id/toggle", protect, isSeller, toggleSellerProduct);
router.put("/:id", protect, isSeller, updateSellerProduct);

module.exports = router;

