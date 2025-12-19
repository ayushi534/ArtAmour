const mongoose = require("mongoose");

const sellerProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
    type: Number,
    },

    discountPercent: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: false, 
    },

    adminNote:{
      type: String,
    },
  },
  { timestamps: true }
);

/* One seller can add a product only once */
sellerProductSchema.index({ product: 1, seller: 1 }, { unique: true });

module.exports = mongoose.model("SellerProduct", sellerProductSchema);
