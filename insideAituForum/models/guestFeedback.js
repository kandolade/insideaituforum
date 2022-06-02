const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema({
  feedback: {
    type: String,
  },
});

module.exports = mongoose.model("GuestFeedback", guestSchema);
