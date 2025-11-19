// models/cartItemModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
    index: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  sku: { type: Schema.Types.ObjectId, ref: 'SKU', default: null, index: true },
  product_name: { type: String, required: true, trim: true }, // snapshot
  sku_code: { type: String, default: null, trim: true },      // snapshot
  unit_price: { type: Number, required: true, min: 0 },       // snapshot price at add time
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be >= 1'],
    validate: { validator: Number.isInteger, message: 'Quantity must be integer' }
  },
  subtotal: { type: Number, required: true, min: 0 }, // unit_price * quantity
  addedAt: { type: Date, default: Date.now }
});

// Ensure subtotal is correct before validation/save
cartItemSchema.pre('validate', function (next) {
  if (this.unit_price == null) return next(new Error('unit_price required'));
  if (this.quantity == null) return next(new Error('quantity required'));
  this.subtotal = Number((this.unit_price * this.quantity).toFixed(2));
  next();
});

/**
 * After saving or removing a CartItem, update Cart totals.
 * NOTE: in high-concurrency systems prefer using transactions and calling recalculateTotals
 * from service layer inside the same session.
 */
cartItemSchema.post('save', async function () {
  try {
    const Cart = mongoose.model('Cart');
    await Cart.recalculateTotals(this.cart);
  } catch (err) {
    // log error (do not throw)
    console.error('CartItem post-save recalc error:', err);
  }
});

cartItemSchema.post('remove', async function () {
  try {
    const Cart = mongoose.model('Cart');
    await Cart.recalculateTotals(this.cart);
  } catch (err) {
    console.error('CartItem post-remove recalc error:', err);
  }
});

/** Helper static: add or update item atomically (recommended to use session for transaction) */
cartItemSchema.statics.addOrUpdate = async function ({
  cartId, productId, skuId = null, productName, skuCode = null, unitPrice, quantity = 1, replace = false, session = null
}) {
  const CartItem = this;
  const query = skuId ? { cart: cartId, sku: skuId } : { cart: cartId, product: productId };

  // try to find existing
  const opts = session ? { session } : {};
  let existing = await CartItem.findOne(query, null, opts);

  if (existing) {
    existing.quantity = replace ? quantity : (existing.quantity + quantity);
    existing.unit_price = unitPrice; // update snapshot price if you want
    await existing.save(opts);
    return existing;
  } else {
    const created = await CartItem.create([{
      cart: cartId,
      product: productId,
      sku: skuId,
      product_name: productName,
      sku_code: skuCode,
      unit_price: unitPrice,
      quantity: quantity,
      // subtotal will be computed by pre-validate
    }], opts);
    return created[0];
  }
};

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
