const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const posts = new Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  contentWithoutMarkup: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  userImage: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [
    {
      type: String,
    },

  ],
});

module.exports = mongoose.model("Posts", posts);
