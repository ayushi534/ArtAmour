const mongoose = require("mongoose");
const { Schema } = mongoose;

const returnSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        trim: true,
    },

    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
        reuqired: true,
        index: true,
    },
 
    seller: { 
        type: Schema.Types.ObjectId,
        ref: 'Seller', index: true, 
        default: null 
    },

    requestNumber: { type: String, required: true, unique: true, trim: true },
    totalRefundAmount: { type: Number, default: 0, min: 0 },
    totalItems: { type: Number, default: 0, min: 0 },
    returnType: { type: String, enum: ['RETURN','REFUND','EXCHANGE'], default: 'RETURN' },
    reasonSummary: { type: String, maxlength: 500 },

    status: {
        type: String,
        enum: ['REQUESTED','AWAITING_PICKUP','IN_TRANSIT','RECEIVED','INSPECTING','APPROVED','REJECTED','REFUNDED','EXCHANGED','CANCELLED'],
        default: 'REQUESTED',
        index: true
    },

    pickup_address: { type: String },
    pickup_scheduled_at: { type: Date, default: null },
    tracking_number: { type: String, default: null },
    seller_notes: { type: String, default: null },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    processedAt: { type: Date, default: null },

    refundTransactionId: { type: String, default: null },

    isActive: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now }
});

  // Recalculate totals from ReturnItem collection
returnSchema.statics.recalculateTotals = async function (returnId) {
    const ReturnItem = mongoose.model('ReturnItem');
    const agg = await ReturnItem.aggregate([
    { $match: { returnRef: mongoose.Types.ObjectId(returnId) } },
    {
      $group: {
        _id: '$returnRef',
        totalRefundAmount: { $sum: '$refund_amount' },
        totalItems: { $sum: '$quantity' }
      }
    }
  ]);

  const totals = agg[0] || { totalRefundAmount: 0, totalItems: 0 };
  return this.findByIdAndUpdate(returnId, {
    totalRefundAmount: Number((totals.totalRefundAmount || 0).toFixed(2)),
    totalItems: totals.totalItems || 0,
    updatedAt: Date.now()
  }, { new: true });
};

// convenience method to change status
returnSchema.methods.setStatus = function (newStatus, adminId = null, note = null) {
  this.status = newStatus;
  if (adminId) this.admin = adminId;
  if (note) {
    this.seller_notes = (this.seller_notes ? this.seller_notes + '\n' : '') + `[${new Date().toISOString()}] ${note}`;
  }
  if (['APPROVED','REJECTED','REFUNDED','EXCHANGED'].includes(newStatus)) {
    this.processedAt = new Date();
  }
  this.updatedAt = Date.now();
  return this.save();
};

const Return = mongoose.model('Return', returnSchema);
module.exports = Return;

