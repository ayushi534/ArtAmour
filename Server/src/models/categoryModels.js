const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxlength: [100, 'Category name too long'],
        minlength: [2, 'Category name too short']
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: ''
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
        index: true
    },

    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
},
{ timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;