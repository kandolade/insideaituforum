const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answers = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  userImage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Answers", answers);
