// models/deliveryModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliveryHistorySchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','FAILED_DELIVERY','RETURNED_TO_SELLER','CANCELLED'],
    required: true
  },
  
  location: { type: String, default: null }, // human readable location or geo
  note: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, refPath: 'historyRefModel', default: null }, // admin/deliveryAgent/system
  historyRefModel: { type: String, enum: ['Admin','DeliveryAgent','System'], default: 'System' }
}, { _id: false });

const deliverySchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },

  orderItem: {                      // optional: when delivery is per-item (multi-seller)
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    default: null,
    index: true
  },

  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    default: null,
    index: true
  },

  courier: {                        // e.g., 'DHL', 'FedEx', 'Delhivery'
    type: String,
    trim: true,
    default: null,
    index: true
  },

  trackingNumber: {
    type: String,
    trim: true,
    default: null,
    index: true
  },

  // delivery statuses
  status: {
    type: String,
    enum: ['PENDING','ASSIGNED','PICKED_UP','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','FAILED_DELIVERY','RETURNED_TO_SELLER','CANCELLED'],
    default: 'PENDING',
    index: true
  },

  pickupAddress: { type: String, default: null },
  deliveryAddress: { type: String, required: true }, // snapshot of shipping address
  expectedPickupAt: { type: Date, default: null },
  expectedDeliveryAt: { type: Date, default: null },

  pickedUpAt: { type: Date, default: null },
  shippedAt: { type: Date, default: null },
  outForDeliveryAt: { type: Date, default: null },
  deliveredAt: { type: Date, default: null },
  failedDeliveryAt: { type: Date, default: null },

  // courier charges and logistics
  shippingCharge: { type: Number, default: 0, min: 0 },
  shippingCurrency: { type: String, default: 'INR' },

  // physical data
  weight: {
    value: { type: Number, default: 0, min: 0 },
    unit: { type: String, enum: ['g','kg','lb'], default: 'g' }
  },

  dimensions: { // optional LxWxH in cm
    lengthCm: { type: Number, default: 0, min: 0 },
    widthCm: { type: Number, default: 0, min: 0 },
    heightCm: { type: Number, default: 0, min: 0 }
  },

  // proof of delivery: images URLs, signature hash, or POD id
  proofOfDelivery: {
    images: { type: [String], default: [] },
    signature: { type: String, default: null }, // optional encoded signature or reference id
    deliveredBy: { type: String, default: null } // name/id of courier deliverer
  },

  // history of status changes
  history: {
    type: [deliveryHistorySchema],
    default: []
  },

  // metadata for courier API responses or labels
  courierMeta: { type: Schema.Types.Mixed, default: {} },

  isActive: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now, index: true }
});

// update timestamps
deliverySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// helper: add history entry and update status/time
deliverySchema.methods.addHistory = async function ({ status, location = null, note = null, updatedBy = null, updatedByModel = 'System' }) {
  const entry = {
    status,
    location,
    note,
    timestamp: new Date(),
    updatedBy,
    historyRefModel: updatedByModel
  };
  this.history.push(entry);
  this.status = status;

  // set time fields automatically for key statuses
  if (status === 'PICKED_UP') this.pickedUpAt = entry.timestamp;
  if (status === 'IN_TRANSIT') this.shippedAt = entry.timestamp;
  if (status === 'OUT_FOR_DELIVERY') this.outForDeliveryAt = entry.timestamp;
  if (status === 'DELIVERED') this.deliveredAt = entry.timestamp;
  if (status === 'FAILED_DELIVERY') this.failedDeliveryAt = entry.timestamp;

  await this.save();
  return this;
};

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
