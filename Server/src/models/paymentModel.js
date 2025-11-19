// models/paymentModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const paymentSchema = new Schema({
  paymentReference: {                 // internal unique ref, e.g. PAY-2025-0001
    type: String,
    required: true,
    unique: true,
    index: true
  },

  order: {                            // optional: linked order
    type: Schema.Types.ObjectId,
    ref: 'Order',
    index: true,
    default: null
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    default: null
  },

  amount: {                           // amount processed (in smallest currency unit or decimal)
    type: Number,
    required: true,
    min: 0
  },

  currency: {
    type: String,
    default: 'INR'
  },

  method: {                           // payment method used
    type: String,
    enum: ['CARD','UPI','NETBANKING','WALLET','EMI','COD','OTHER'],
    required: true
  },

  status: {                           // overall status
    type: String,
    enum: ['INITIATED','PENDING','AUTHORISED','CAPTURED','FAILED','REFUNDED','PARTIALLY_REFUNDED','CANCELLED'],
    default: 'INITIATED',
    index: true
  },

  gateway: {                          // gateway name (Razorpay, Stripe, Paytm...)
    type: String,
    trim: true,
    default: null,
    index: true
  },

  gatewayPaymentId: {                 // provider's payment id (for reconciliation)
    type: String,
    default: null,
    index: true
  },

  gatewayRefundId: {                  // provider refund id (if refunded)
    type: String,
    default: null
  },

  idempotencyKey: {                   // important for retries (optional)
    type: String,
    default: null,
    index: true
  },

  // raw gateway response + webhook payload (store trimmed for debug)
  gatewayResponse: { type: Schema.Types.Mixed, default: {} },

  // keep minimal card/token info only if necessary (PCI!). Best is to store token or last4 only.
  card: {
    brand: String,
    last4: String,
    exp_month: Number,
    exp_year: Number,
    token: String // store gateway token (NOT raw PAN). nullable.
  },

  // optional: items or reason (for refunds)
  description: { type: String, default: null },

  // metadata for app usage (order type, source, campaign)
  metadata: { type: Schema.Types.Mixed, default: {} },

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now, index: true },
  isActive: { type: Boolean, default: true }
});

// Ensure paymentReference exists if not provided
paymentSchema.pre('validate', function (next) {
  if (!this.paymentReference) {
    const rnd = crypto.randomBytes(4).toString('hex').toUpperCase();
    this.paymentReference = `PAY-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}-${rnd}`;
  }
  this.updatedAt = Date.now();
  next();
});

// helper: mark captured
paymentSchema.methods.markCaptured = async function (gatewayId, gatewayResp = {}) {
  this.gatewayPaymentId = gatewayId;
  this.gatewayResponse = gatewayResp;
  this.status = 'CAPTURED';
  this.updatedAt = Date.now();
  return this.save();
};

// helper: mark refunded
paymentSchema.methods.markRefund = async function (gatewayRefundId, amountRefunded = 0, gatewayResp = {}) {
  this.gatewayRefundId = gatewayRefundId;
  if (amountRefunded && amountRefunded < this.amount) {
    this.status = 'PARTIALLY_REFUNDED';
  } else {
    this.status = 'REFUNDED';
  }
  this.gatewayResponse = Object.assign(this.gatewayResponse || {}, { lastRefund: gatewayResp });
  this.updatedAt = Date.now();
  return this.save();
};

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
