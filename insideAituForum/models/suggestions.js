const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suggest = new Schema({
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Suggestion", suggest);
