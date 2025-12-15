// src/models/adminModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <- make sure this line is present
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
    select: false // hide by default
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'admin',
  },
  permissions: {
    type: [String],
    default: []
  },
  is_active: {
    type: Boolean,
    default: true
  },
  profile_image: { type: String, default: null },
  last_login: { type: Date, default: null },
  created_at: { type: Date, default: Date.now, index: true },
  updated_at: { type: Date, default: Date.now }
});

// hash password before save
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// method to compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);

