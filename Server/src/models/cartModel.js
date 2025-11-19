// models/cartModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    default: null
  },
  sessionId: {
    type: String,   
    default: null
  },
  totalAmount: { type: Number, default: 0, min: 0 },
  totalItems: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Recalculate updatedAt on save
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Recalculate totals by aggregating CartItem collection.
 * Returns updated cart doc.
 */
cartSchema.statics.recalculateTotals = async function (cartId) {
  const CartItem = mongoose.model('CartItem');
  const Cart = this;

  const agg = await CartItem.aggregate([
    { $match: { cart: mongoose.Types.ObjectId(cartId) } },
    {
      $group: {
        _id: '$cart',
        totalAmount: { $sum: '$subtotal' },
        totalItems: { $sum: '$quantity' }
      }
    }
  ]);

  const totals = agg[0] || { totalAmount: 0, totalItems: 0 };
  const updated = await Cart.findByIdAndUpdate(cartId, {
    totalAmount: Number((totals.totalAmount || 0).toFixed(2)),
    totalItems: totals.totalItems || 0,
    updatedAt: Date.now()
  }, { new: true });

  return updated;
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
