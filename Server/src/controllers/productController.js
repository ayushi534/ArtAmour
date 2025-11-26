const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success:true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, product: p });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const createProduct = asyncHandler(async (req, res) => {
  // req.seller should be present because isSeller middleware sets it
  if (!req.seller || !req.seller._id) return res.status(401).json({ success:false, message:'Not authenticated as seller' });

  const { name, description, price, mrp, category, image, quantity } = req.body;
  if (!name || price == null) return res.status(400).json({ success:false, message:'name and price required' });

  const product = await Product.create({
    seller: req.seller._id,
    name,
    description,
    price: Number(price),
    mrp: mrp != null ? Number(mrp) : undefined,
    category,
    image,
    quantity: quantity != null ? Number(quantity) : 1
  });

  res.status(201).json({ success:true, message:'Product created', product });
});

const getMyProducts = async (req, res) => {
  try {
    if (!req.seller) return res.status(403).json({ success:false, message:'Seller required' });
    const products = await Product.find({ seller: req.seller._id });
    res.json({ success:true, products });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.seller || product.seller.toString() !== req.seller._id.toString())
      return res.status(403).json({ success:false, message:'Not owner' });

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    await product.save();
    res.json({ success:true, product });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.seller || product.seller.toString() !== req.seller._id.toString())
      return res.status(403).json({ success:false, message:'Not owner' });
    await product.remove();
    res.json({ success:true, message:'Deleted' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

module.exports ={ getAllProducts, getProductById, createProduct, getMyProducts ,updateProduct, deleteProduct}







