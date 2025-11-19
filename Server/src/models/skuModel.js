const mongoose = require('mongoose');
const { Schema } = mongoose;

// SKU Schema
const skuSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku_code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z0-9-]+$/, "SKU code must contain only letters, numbers, and dashes"]
  },
  variant: {
    type: String,
    trim: true,
    default: null
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"]
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be negative"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔹 Validation before saving
skuSchema.pre('save', function (next) {
  if (!this.sku_code) {
    throw new Error("SKU code is required");
  }
  if (this.price < 0 || this.stock < 0) {
    throw new Error("Price and stock must be non-negative");
  }
  next();
});

const SKU = mongoose.model('SKU', skuSchema);
module.exports = SKU;
