const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
