// controllers/CategoryController.js
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Category = require("../models/categoryModels");
const CategoryItem = require("../models/categoryitemsModel");
const Product = require("../models/productModel");

// ================= GET ALL CATEGORIES =================
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (err) {
    console.error("getAllCategories error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GET CATEGORY BY ID OR SLUG =================
const getCategoryByIdOrSlug = async (req, res) => {
  try {
    const { id } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    return res.json({ success: true, category });
  } catch (err) {
    console.error("getCategoryByIdOrSlug error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ================= CREATE CATEGORY =================
const createCategory = async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.name)
      return res.status(400).json({ success: false, message: "Name is required" });

    if (!payload.slug) {
      payload.slug = payload.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    const exists = await Category.findOne({ slug: payload.slug });
    if (exists)
      return res.status(409).json({ success: false, message: "Category slug already exists" });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const category = await Category.create({
      ...payload,
      image: imagePath,
      subCategories: [],
    });

    return res.status(201).json({ success: true, category });
  } catch (err) {
    console.error("createCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ================= UPDATE CATEGORY =================
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    const payload = req.body || {};

    // ========== UPDATE SLUG IF PROVIDED ==========
    if (payload.slug && payload.slug !== category.slug) {
      const other = await Category.findOne({ slug: payload.slug });
      if (other)
        return res.status(409).json({ success: false, message: "Category slug already exists" });
    }

    // ========== UPDATE IMAGE ==========
    if (req.file) {
      const newPath = `/uploads/${req.file.filename}`;

      // Delete old file if exists
      if (category.image && typeof category.image === "string" && category.image.startsWith("/uploads/")) {
        const oldFilePath = path.join(__dirname, "..", "..", category.image);
        fs.access(oldFilePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(oldFilePath, (unlinkErr) => {
              if (unlinkErr) console.error("Failed to delete old category image", unlinkErr);
            });
          }
        });
      }

      category.image = newPath;
    } else if (payload.image) {
      category.image = payload.image;
    }

    // ========== ADD SUBCATEGORY IF PROVIDED ==========
    if (payload.subCategory) {
      const slug = payload.subCategory.toLowerCase().trim().replace(/\s+/g, "-");

      const exists = category.subCategories?.some((s) => s.slug === slug);
      if (exists) {
        return res.status(409).json({ success: false, message: "SubCategory already exists" });
      }

      category.subCategories.push({
        name: payload.subCategory,
        slug,
      });

      delete payload.subCategory;
    }

    Object.assign(category, payload);
    await category.save();

    return res.json({ success: true, category });
  } catch (err) {
    console.error("updateCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ================= DELETE CATEGORY =================
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let category = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    const categoryItemCount = await CategoryItem.countDocuments({ category: category._id });
    const directProductCount = await Product.countDocuments({ category: category._id });

    if (categoryItemCount > 0 || directProductCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Category has assigned products. Remove or reassign products before deleting.",
        details: { categoryItemCount, directProductCount },
      });
    }

    await category.deleteOne();

    return res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    console.error("deleteCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByIdOrSlug,
  createCategory,
  updateCategory,
  deleteCategory,
};


