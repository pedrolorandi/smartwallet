// Import necessary modules
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

// Environment variables for Google OAuth client configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const NODE_BASE_URL = process.env.NODE_BASE_URL;

// Retrieves user data from Google's UserInfo endpoint using an access token
async function getUserData(access_token) {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  return data;
}

// Creates and configures an OAuth2Client for Google authentication
function createOAuthClient() {
  const redirectURL = `${NODE_BASE_URL}/oauth`;
  return new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectURL);
}

module.exports = { createOAuthClient, getUserData };
