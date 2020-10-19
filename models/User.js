const mongoose = require("mongoose");
const imageSchema = require("./Image").schema;
const userSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    min: 6,
  },
  fullname: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  state: {
    type: String,
    required: true,
    min: 3,
  },
  dob: {
    type: Date,
    required: true,
  },
 
 image:[imageSchema], 

  password: {
    type: String,
    required: true,
    min: 5,
  },
  dateRegistered: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
