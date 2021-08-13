const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  institution: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  usagePurpose: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", userSchema, "users");
