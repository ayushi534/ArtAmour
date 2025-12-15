// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware"); 

router.get("/", protect, cartCtrl.getCart);
router.post("/items", protect, cartCtrl.addItem);
router.put("/items/:itemId", protect, cartCtrl.updateItem);
router.delete("/items/:itemId", protect, cartCtrl.removeItem);

module.exports = router;
