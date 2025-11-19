const mongoose = require('mongoose');
const {Schema} = mongoose;

const citySchema = new Schema (
    {
        name:{
            type: String,
            required: [true, "city name is required"],
            trime: true,
            minlength: [2, "City name must be at least 2 characters long"]
        },

        state: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'State',
            required: [true, 'State is required'],
            trim: true
        },

        country: {
            type: String,
            default: "India",
            trim: true
        },

        pinCode: {
            type: String,
            match: [/^[0-9]{3}$/, "Pincode must be 3 digits"] // starting 3 digits lege pincode k example : 451111 toh iska 451 likhege 
        },

        isActive: {
            type: Boolean,
            default: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
});

const City = mongoose.model('City',citySchema)
module.exports = City;