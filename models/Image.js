const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    default: "noimage",
  },
});

module.exports = mongoose.model("Image", imageSchema);