const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  WishlistName: String,
  Name: String,
  Description: String,
  Price: String,
  Image: String,
  Status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
