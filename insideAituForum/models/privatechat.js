const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const privatechat = new Schema({
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
    userImage: {
        type: String,
    }
});

module.exports = mongoose.model("privatechat", privatechat);
