const mongoose = require('mongoose');
const { Schema } = mongoose;

const returnItemSchema = new Schema({
    returnRef: { 
        type: Schema.Types.ObjectId,
        ref: 'Return',
        required: true,
        index: true
    },

    orderItem: { type: Schema.Types.ObjectId, ref: 'OrderItem', required: true, index: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', default: null, index: true },

  // snapshots so historical data remains correct
    product_name: { type: String },
    sku_code: { type: String, default: null },

    quantity: { 
        type: Number, 
        required: true,
        min: 1, 
        validate: { 
            validator: Number.isInteger,
            message: 'Quantity must be integer' } },
    
    unit_price: { type: Number, required: true, min: 0 },
    refund_amount: { type: Number, required: true, min: 0 },
    reason: { type: String, maxlength: 500, default: null },
    images: { type: [String], default: [] }, // URLs

    createdAt: { type: Date, default: Date.now }
});

// Ensure refund_amount computed if not provided and subtotal correctness
returnItemSchema.pre('validate', function (next) {
  try {
    if (this.unit_price == null) return next(new Error('unit_price is required'));
    if (this.quantity == null) return next(new Error('quantity is required'));
    // default refund_amount = unit_price * quantity if not provided
    if (this.refund_amount == null) {
      this.refund_amount = Number((this.unit_price * this.quantity).toFixed(2));
    } else {
      this.refund_amount = Number(this.refund_amount.toFixed(2));
    }
    next();
  } catch (err) {
    next(err);
  }
});

// After saving/removing a return item, update header totals
returnItemSchema.post('save', async function () {
  try {
    const Return = mongoose.model('Return');
    await Return.recalculateTotals(this.returnRef);
  } catch (err) {
    console.error('ReturnItem post-save recalc error:', err);
  }
});

returnItemSchema.post('remove', async function () {
  try {
    const Return = mongoose.model('Return');
    await Return.recalculateTotals(this.returnRef);
  } catch (err) {
    console.error('ReturnItem post-remove recalc error:', err);
  }
});

// Optional: validate returned quantity <= ordered quantity
// This requires fetching the orderItem; you can enable in pre('save') if needed.

const ReturnItem = mongoose.model('ReturnItem', returnItemSchema);
module.exports = ReturnItem;
