const mongoose = require('mongoose')
const {Schema} = mongoose ;

const addressSchema = new Schema(
    { 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },

        houseNo: {
            type: String,
            trim: true,
        },

        street: {
            type: String,
            trim: true,
        },

        city: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'City',
            required: [true, "City is required"],
            trim: true,
        },

        state: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'State',
            required: [true, "State is required"],
            trim: true,
        },

        pincode: {
            type: String,
            required: [true,"pincode is required"],
            match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
        },

        country: {
            type: String,
            default: "India"
        },

        addressType: {
            type: String,
            enum: ["Home","Office","Other"],
            default: 'Home'
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
});

const Address = mongoose.model('Adress',addressSchema);
module.exports = Address;