// src/controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// create product (seller required)
const createProduct = asyncHandler(async (req, res) => {
  const { name, title, description, price, images, image, category, mrp, quantity, material, isActive } = req.body;
  const productName = name || title;
  if (!productName || price == null) return res.status(400).json({ success:false, message:'name/title and price required' });

  if (!req.seller || !req.seller._id) return res.status(401).json({ success:false, message:'Not authenticated as seller' });

  const chosenImage = image || (Array.isArray(images) && images.length ? images[0] : undefined);

  const product = new Product({
    seller: req.seller._id,
    category,
    name: productName,
    description: description || '',
    price: Number(price),
    mrp: mrp != null ? Number(mrp) : undefined,
    image: chosenImage,
    quantity: quantity != null ? Number(quantity) : undefined,
    material,
    isActive: isActive == null ? true : !!isActive
  });

  await product.save();
  res.status(201).json({ success:true, data: product });
});

const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true }).select('-__v').populate({ path: 'seller', select: '_id shopName' });
  res.json({ success:true, count: products.length, data: products });
});

const getSellerProducts = asyncHandler(async (req, res) => {
  if (!req.seller) return res.status(401).json({ success:false, message:'Not authenticated as seller' });
  const products = await Product.find({ seller: req.seller._id });
  res.json({ success:true, count: products.length, data: products });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({ path: 'seller', select: '_id shopName' });
  if (!product) return res.status(404).json({ success:false, message:'Product not found' });
  res.json({ success:true, data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success:false, message:'Product not found' });
  if (!req.seller || product.seller.toString() !== req.seller._id.toString()) return res.status(403).json({ success:false, message:'Not your product' });

  const fields = ['name','title','description','price','images','image','isActive','mrp','quantity','material','category'];
  fields.forEach(f => { if (req.body[f] !== undefined) {
    if (f === 'title') product.name = req.body[f];
    else if (f === 'images' && Array.isArray(req.body[f]) && req.body[f].length) product.image = req.body[f][0];
    else product[f === 'title' ? 'name' : f] = req.body[f];
  }});
  await product.save();
  res.json({ success:true, data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success:false, message:'Product not found' });
  if (!req.seller || product.seller.toString() !== req.seller._id.toString()) return res.status(403).json({ success:false, message:'Not your product' });
  await product.remove();
  res.json({ success:true, message:'Product deleted' });
});

module.exports = { createProduct, listProducts, getSellerProducts, getProduct, updateProduct, deleteProduct };







