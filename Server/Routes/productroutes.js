// routes/product.js
const express = require("express");
const router = express.Router();

// In-memory "database" (demo). Replace with real DB later.
let products = [
  {
    id: 101,
    name: "Resin Frame",
    category: "Art & Craft",
    price: 2000,
    size: "6 inch",
    material: "Resin",
    description:
      "Hand Crafted Rose Petals Floral Resin Frame for your Special one",
  },
  {
    id: 102,
    name: "Flower Painting",
    category: "Painting",
    price: 799,
    size: "8 inch",
    material: "Canvas",
    description: "Flower Paintings For your living room",
  },
];

// GET /product -> all products
router.get("/", (req, res) => {
  res.json({ status: 200, data: products });
});

// GET /product/:id -> product by id
router.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);
    if (!product)
      return res.status(404).json({ status: 404, message: "Product not found" });
    res.json({ status: 200, data: product });
  } catch (err) {
    next(err);
  }
});

// POST /product -> add product
router.post("/", (req, res, next) => {
  try {
    // simple id generation: choose a new id bigger than existing max id
    const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
    const newProduct = {
      id: maxId + 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      size: req.body.size,
      material: req.body.material,
      description: req.body.description,
    };
    products.push(newProduct);
    res.status(201).json({ status: 201, message: "Product created", data: newProduct });
  } catch (err) {
    next(err);
  }
});

// PUT /product/:id -> replace/update product
router.put("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1)
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });

    // Replace product (keep same id)
    const updated = { id, ...req.body };
    products[index] = updated;
    res.json({ status: 200, message: "Product updated", data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /product/:id -> delete product
router.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1)
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    products.splice(index, 1);
    res.json({ status: 200, message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
