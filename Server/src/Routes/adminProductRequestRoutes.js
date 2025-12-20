const express = require("express");
const router = express.Router();

const { protect, isAdmin} = require("../middleware/authMiddleware");

const {
  getAllProductRequests,
  approveProductRequest,
  rejectProductRequest,
} = require("../controllers/adminProductRequestController");


router.get("/product-requests",protect, isAdmin, getAllProductRequests);


router.put("/product-requests/:id/approve", protect, isAdmin, approveProductRequest);


router.put("/product-requests/:id/reject", protect, isAdmin, rejectProductRequest );

module.exports = router;
