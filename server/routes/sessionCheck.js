const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.isAuth ? res.json({ isAuth: true }) : res.json({ isAuth: false });
});

module.exports = router;
