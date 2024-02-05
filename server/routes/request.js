// Import necessary modules
const express = require("express");
const router = express.Router();
const { createOAuthClient } = require("../utils/oauthUtils");

// Base URL of the React frontend, used for redirection after authentication
const REACT_BASE_URL = process.env.REACT_BASE_URL;

// Route to handle OAuth2 callback
router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", REACT_BASE_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const oAuth2Client = createOAuthClient();
  const authorizeURL = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    prompt: "consent",
  });

  res.json({ url: authorizeURL });
});

module.exports = router;
