const Order = require("../models/orderModel");

// Create a new order
const createOrder = async (req, res, next) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      totalPrice,
      orderStatus,
    } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      totalPrice,
      orderStatus,
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (err) {
    next(err);
  }
};

// Get order by id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (err) {
    next(err);
  }
};


module.exports={createOrder,getOrderById}
