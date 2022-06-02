const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: "User",
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  location: {
    type: String,
  },
  language: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "images/unknown.png",
  },
  password: {
    type: String,
  },
  feedback: {
    type: String,
  },
  oauth_id: {
    type: String,
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model("User", userSchema);
