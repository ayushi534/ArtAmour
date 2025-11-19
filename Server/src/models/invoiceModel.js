const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, 'Invoice number is required'],
      unique: true,
      trim: true,
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order reference is required'],
      index: true,
    },

    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Buyer reference is required'],
      index: true,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: [true, 'Seller reference is required'],
      index: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product is required'],
        },
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        tax: { type: Number, default: 0 },
        subtotal: { type: Number, required: true, min: 0 }, // price * qty + tax
      },
    ],

    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
      enum: ['INR', 'USD', 'EUR', 'GBP'],
    },

    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    grandTotal: {
      type: Number,
      required: [true, 'Grand total is required'],
      min: 0,
    },

    billingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, default: 'India' },
      postalCode: { type: String, required: true },
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'cod', 'wallet'],
      default: 'upi',
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Auto-generate invoice number before saving
invoiceSchema.pre('validate', async function (next) {
  if (!this.invoiceNumber) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    this.invoiceNumber = `INV-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
