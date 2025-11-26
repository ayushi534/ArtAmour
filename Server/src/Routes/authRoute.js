// src/Routes/authRoute.js
const express = require("express");
const router = express.Router();

const { register, login, logout, profile } = require("../controllers/userAuthController"); // note the filename
const { protect } = require("../middleware/authMiddleware"); // optional but recommended

// Public
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected
router.get("/profile", protect, profile);

module.exports = router;
