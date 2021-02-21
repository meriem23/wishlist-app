const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "wishlists" },
  WishlistName: String,
  Name: String,
  Description: String,
  Price: String,
  Image: String,
  Status: String,
  DateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
