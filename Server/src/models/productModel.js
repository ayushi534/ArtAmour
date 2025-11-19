const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: [true, 'Seller is required'],
        index: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    },

    name: {
        type: String,
        required: [true, "required product name"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name cannot exceed 50 characters"],
    },

    description: {
        type: String,
        default: ''
    },

    price: {
        type: Number,
        required: [true,"price is required"],
        min: [0,"price must be >=0"]
    },

    mrp: {
        type: Number,
        min: [0, 'MRP must be >= 0']
    },

    image: {
        type: String,
        default: "product image url"
    },

    quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer'
        }
    },

    material: {
        type: String,
        trim: true,
        maxlength: [100, 'Material description too long']
    },



    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;