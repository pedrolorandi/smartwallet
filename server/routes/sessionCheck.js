const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.json({ isAuth: true, user: req.session.user });
  } else {
    res.json({ isAuth: false, user: null });
  }
});

module.exports = router;
