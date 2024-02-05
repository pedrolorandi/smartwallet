const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to handle the OAuth callback
router.get("/", authController.handleOAuthCallback);

module.exports = router;
