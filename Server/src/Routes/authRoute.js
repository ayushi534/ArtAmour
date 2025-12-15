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
router.get("/me", protect, (req, res) => {
  res.json({
    loggedIn: true,
    role: req.role,
    user: req.user
  });
});


module.exports = router;
