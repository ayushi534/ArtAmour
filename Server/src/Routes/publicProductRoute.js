const express = require("express");
const router = express.Router();
const publicProductController = require("../controllers/publicProductController");

router.get("/products", publicProductController.getLiveProducts);

module.exports = router;
