import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
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
  purpose: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model("userModel", userSchema, "users");

export default userModel;
