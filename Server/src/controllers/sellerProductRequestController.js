// src/controllers/sellerProductRequestController.js
const ProductRequest = require("../models/productRequestModel");

exports.requestNewProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      priceSuggestion,
      images,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required",
      });
    }

    const request = await ProductRequest.create({
      seller: req.seller._id,
      name,
      description,
      category,
      subCategory,
      priceSuggestion,
      images,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Product request sent to admin",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send product request",
    });
  }
};
