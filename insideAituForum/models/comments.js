const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const comments = new Schema({
  data: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: Schema.Types.String,
    ref: "User",
  },
});

module.exports = mongoose.model("Comments", comments);
