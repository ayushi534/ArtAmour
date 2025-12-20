const mongoose = require("mongoose");

const sellerProductSchema = new mongoose.Schema(
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
    category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Category",
       required: true,
    },
     subCategory: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Category",
     },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);


/* One seller can add a product only once */
sellerProductSchema.index({ product: 1, seller: 1 }, { unique: true });

module.exports = mongoose.model("SellerProduct", sellerProductSchema);
