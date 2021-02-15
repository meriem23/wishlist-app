const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
