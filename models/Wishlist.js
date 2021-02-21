const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  wishlist: String,
  DateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("wishlist", WishlistSchema);
