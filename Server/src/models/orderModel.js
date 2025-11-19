const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID required']
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    default: null
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  finalAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE', 'CARD', 'UPI'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  orderStatus: {
    type: String,
    enum: ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'],
    default: 'PLACED'
  },
  shippingAddress: {
    type: String,
    required: true
  },
  billingAddress: {
    type: String
  },
  trackingNumber: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

//Auto-calculate final amount before saving
orderSchema.pre('save', function (next) {
  this.finalAmount = this.totalAmount - this.discount;
  if (this.finalAmount < 0) this.finalAmount = 0;
  this.updatedAt = Date.now();
  next();
});

// Generate order number if missing
orderSchema.pre('validate', async function (next) {
  if (!this.orderNumber) {
    const datePart = new Date().getFullYear();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD-${datePart}-${randomPart}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;






