const mongoose = require('mongoose');
const { Schema } = mongoose;

// 📦 Inventory Schema
const inventorySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required'],
      index: true
    },

    sku: {
      type: Schema.Types.ObjectId,
      ref: 'SKU',
      required: [true, 'SKU (Stock Keeping Unit) is required'],
      unique: true,
      trim: true,
      uppercase: true
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative']
    },

    unit: {
      type: String,
      enum: ['piece', 'set', 'kg', 'g', 'liter', 'ml'],
      default: 'piece'
    },

    reserved: {
      type: Number,
      default: 0,
      min: [0, 'Reserved quantity cannot be negative']
    },

    warehouseLocation: {
      type: String,
      trim: true,
      default: 'Main Warehouse'
    },

    status: {
      type: String,
      enum: ['in_stock', 'low_stock', 'out_of_stock'],
      default: 'in_stock'
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

// 🧠 Auto-update status before saving
inventorySchema.pre('save', function (next) {
  if (this.quantity <= 0) {
    this.status = 'out_of_stock';
  } else if (this.quantity <= 5) {
    this.status = 'low_stock';
  } else {
    this.status = 'in_stock';
  }
  this.lastUpdated = Date.now();
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;

