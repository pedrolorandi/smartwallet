const mongoose = require("mongoose");
const User = require("../models/user");
const { createOAuthClient, getUserData } = require("../utils/oauthUtils");

const REACT_BASE_URL = process.env.REACT_BASE_URL;
const connectionString = process.env.ATLAS_URI || "";

mongoose.connect(connectionString);

async function handleOAuthCallback(req, res) {
  const code = req.query.code;

  try {
    const oAuth2Client = createOAuthClient();
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const {
      sub,
      email,
      given_name: givenName,
      family_name: familyName,
      picture: profilePicture,
    } = await getUserData(tokens.access_token);

    const userPayload = {
      sub,
      email,
      givenName,
      familyName,
      profilePicture,
    };

    const user = await User.findOrCreate(userPayload);
    req.session.isAuth = true;
    req.session.user = user;
    req.session.save();
  } catch (err) {
    console.log("Error with signing in with Google:", err);
  }

  res.redirect(303, `${REACT_BASE_URL}/dashboard`);
}

module.exports = { handleOAuthCallback };
