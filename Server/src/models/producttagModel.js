// models/productTagModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reusable slug generator
function makeSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')    // Replace spaces & non-word chars with '-'
    .replace(/^-+|-+$/g, '');     // Remove starting/trailing dashes
}

const productTagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    trim: true,
    minlength: [2, "Tag name must be at least 2 characters"],
    maxlength: [50, "Tag name too long"]
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  description: {
    type: String,
    maxlength: [200, "Description too long"],
    default: null
  },

  is_active: {
    type: Boolean,
    default: true
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Automatically create slug before saving
productTagSchema.pre('save', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = makeSlug(this.name);
  }
  this.updated_at = Date.now();
  next();
});

// Example helper: find tag by slug
productTagSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug, is_active: true });
};

const ProductTag = mongoose.model('ProductTag', productTagSchema);
module.exports = ProductTag;
