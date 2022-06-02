const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const social = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
});

module.exports = mongoose.model("Social", social);
