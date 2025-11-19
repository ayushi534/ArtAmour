// models/adminModel_nohash.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [150, 'Name too long']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        index: true
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // hides password by default in queries
    },

    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) { return !v || /^[0-9]{10,15}$/.test(v); },
            message: 'Phone must be 10–15 digits'
        }
    },

    role: {
        type: String,
        enum: ['superadmin', 'admin', 'moderator'],
        default: 'admin',
        index: true
    },

    permissions: {
        type: [String],
        default: []
    },

    is_active: {
        type: Boolean,
        default: true
    },

    profile_image: {
        type: String,
        default: null
    },

    last_login: {
       type: Date,
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

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
