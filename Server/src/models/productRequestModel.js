const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    approvedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
    },

    priceSuggestion: {
      type: Number,
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model( "ProductRequest", productRequestSchema);

