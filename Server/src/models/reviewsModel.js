const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
      index: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"]
    },
    comment: {
      type: String,
      maxlength: [500, "Comment can’t exceed 500 characters"],
      default: null
    },
    title: {
      type: String,
      maxlength: [100, "Title can’t exceed 100 characters"],
      default: null
    },
    images: [{
      type: String, // URLs of uploaded images
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v);
        },
        message: "Invalid image URL format"
      }
    }],
    isApproved: {
      type: Boolean,
      default: false // Admin can approve reviews
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
