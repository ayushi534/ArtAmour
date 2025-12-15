const express = require("express");
const upload = require("../config/multer");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryByIdOrSlug,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const getCategories = getAllCategories;
const getCategory = getCategoryByIdOrSlug;
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
