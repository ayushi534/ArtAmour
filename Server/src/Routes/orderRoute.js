const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


//create order
router.post("/",orderController.createOrder)

// Get order
router.get("/:id", orderController.getOrderById);

module.exports=router;