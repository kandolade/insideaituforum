const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const followSchema = new Schema({
  posts: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
  followedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Follow", followSchema);
