const express = require("express");
const router = express.Router();
const { requestNewProduct } = require("../controllers/sellerProductRequestController");
const {protect, isSeller} = require("../middleware/authMiddleware");

router.post("/request-product", protect, isSeller, requestNewProduct
);

module.exports = router;
