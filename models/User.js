const mongoose = require("mongoose");

const UserSchema =
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
  });

module.exports =
  mongoose.model(
    "User",
    UserSchema
  );