// models/payoutModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const payoutSchema = new Schema({
  payoutReference: {                 // internal unique id e.g., PTO-2025-0001
    type: String,
    required: true,
    unique: true,
    index: true
  },

  recipientType: {                   // whom we are paying
    type: String,
    enum: ['Seller', 'DeliveryAgent', 'Vendor', 'Other'],
    required: true,
    index: true
  },

  recipient: {                       // id of recipient
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientType'         // dynamic ref to Seller/DeliveryAgent etc.
  },

  order: {                           // optional link to order (if payout related to specific order)
    type: Schema.Types.ObjectId,
    ref: 'Order',
    default: null,
    index: true
  },

  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be >= 0']
  },

  currency: { type: String, default: 'INR' },

  method: {                          // payout method/channel
    type: String,
    enum: ['BANK_TRANSFER','UPI','RAZORPAY_PAYOUT','PAYTM_PAYOUT','MANUAL','OTHER'],
    default: 'BANK_TRANSFER'
  },

  // recipient payout details (snapshot) — do NOT store raw sensitive bank data unnecessarily
  payoutDetails: {
    accountName: { type: String },
    accountNumberMasked: { type: String }, // masked, e.g., ****1234
    bankName: { type: String },
    ifsc: { type: String },
    upiId: { type: String },
    phone: { type: String }
  },

  fee: {                             // fee charged by gateway or platform (deducted)
    type: Number,
    default: 0,
    min: 0
  },

  netAmount: {                       // amount after fees (optional: calc)
    type: Number,
    min: 0
  },

  status: {
    type: String,
    enum: ['REQUESTED','SCHEDULED','PROCESSING','SENT','FAILED','REVERSED','CANCELLED'],
    default: 'REQUESTED',
    index: true
  },

  scheduledAt: { type: Date, default: null },   // when payout planned
  processedAt: { type: Date, default: null },   // when gateway confirmed
  completedAt: { type: Date, default: null },   // final settlement time

  gateway: { type: String, default: null },     // gateway name used for payout
  gatewayPayoutId: { type: String, default: null }, // provider payout id for reconciliation
  idempotencyKey: { type: String, default: null, index: true },

  gatewayResponse: { type: Schema.Types.Mixed, default: {} }, // raw gateway response for logs

  note: { type: String, default: null },        // admin note / reason
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null }, // who initiated
  isActive: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now, index: true }
});

// auto-generate payoutReference & netAmount
payoutSchema.pre('validate', function (next) {
  if (!this.payoutReference) {
    const rnd = crypto.randomBytes(3).toString('hex').toUpperCase();
    this.payoutReference = `PTO-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}-${rnd}`;
  }
  // compute netAmount if not provided
  if (this.netAmount == null) {
    this.netAmount = Number((this.amount - (this.fee || 0)).toFixed(2));
    if (this.netAmount < 0) this.netAmount = 0;
  }
  this.updatedAt = Date.now();
  next();
});

// helper methods
payoutSchema.methods.markProcessing = function (gateway, gatewayResp, gatewayPayoutId) {
  this.status = 'PROCESSING';
  this.gateway = gateway || this.gateway;
  if (gatewayResp) this.gatewayResponse = gatewayResp;
  if (gatewayPayoutId) this.gatewayPayoutId = gatewayPayoutId;
  this.processedAt = new Date();
  return this.save();
};

payoutSchema.methods.markSent = function (gatewayResp, gatewayPayoutId) {
  this.status = 'SENT';
  if (gatewayResp) this.gatewayResponse = gatewayResp;
  if (gatewayPayoutId) this.gatewayPayoutId = gatewayPayoutId;
  this.completedAt = new Date();
  return this.save();
};

payoutSchema.methods.markFailed = function (errResp) {
  this.status = 'FAILED';
  if (errResp) this.gatewayResponse = Object.assign(this.gatewayResponse || {}, { lastError: errResp });
  this.updatedAt = new Date();
  return this.save();
};

const Payout = mongoose.model('Payout', payoutSchema);
module.exports = Payout;
