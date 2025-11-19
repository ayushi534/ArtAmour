const mongoose = require('mongoose');
const {Schema} = mongoose;

const stateSchema = new Schema({
    name: {type: String,
        required: [true, "State name is required"],
        trim: true,
        minlength: [2, "State name must be at least 2 characters"]
    },

    country: {
        type: String,
        default: "India",
        trim: true
    },

    stateCode: {
        type: String,
        uppercase: true, 
        unique: true,
        match: [/^[A-Z]{2,3}$/, "State code must be 2-3 uppercase letters"] // like MP, MH, TN
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

const State = mongoose.model('State', stateSchema);
module.exports = State;
