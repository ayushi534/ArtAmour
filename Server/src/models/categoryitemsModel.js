// models/categoryItemModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryItemSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },

    position: {
        type: Number,
        default: 0,
        index: true
    },

    is_featured: {
        type: Boolean,
        default: false,
        index: true
    },

    custom_image: {
       type: String,
       default: null
    },
  
    created_at: {
        type: Date,
        default: Date.now,
        index: true
    },
    
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate mapping
categoryItemSchema.index({ category: 1, product: 1 }, { unique: true });

// keep updated_at fresh
categoryItemSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const CategoryItem = mongoose.model('CategoryItem', categoryItemSchema);
module.exports = CategoryItem;
