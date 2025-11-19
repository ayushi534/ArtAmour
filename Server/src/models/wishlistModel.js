const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "product is required"],
        index: true
    },

     isActive: {
        type: Boolean,
        default: true,
    },

    addedAt: {
        type: Date,
        default: Date.now,
    },
},
{timestamps: true,}
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;