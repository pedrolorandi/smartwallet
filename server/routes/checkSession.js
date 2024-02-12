const express = require("express");
const router = express.Router();
const { checkSession } = require("../controllers/authController");

router.get("/", checkSession, (req, res) =>
  res.json({ isAuthenticated: true })
);

module.exports = router;
