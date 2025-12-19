const SellerProduct = require("../models/sellerProductModel");

exports.getLiveProducts = async (req, res) => {
  try {
    const products = await SellerProduct.find({
      isActive: true,
      stock: { $gt: 0 },
    })
      .populate("product")
      .populate("seller", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
