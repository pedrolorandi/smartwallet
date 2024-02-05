const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  sub: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  givenName: String,
  familyName: String,
  profilePicture: String,
});

userSchema.index({ sub: 1 });

userSchema.statics.findOrCreate = async function ({
  sub,
  email,
  givenName,
  familyName,
  profilePicture,
}) {
  try {
    let user = await this.findOne({ sub });

    if (!user) {
      user = await this.create({
        sub,
        email,
        givenName,
        familyName,
        profilePicture,
      });
    }

    return user;
  } catch (error) {
    console.error("Error in findOrCreate:", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
