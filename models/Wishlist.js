const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  wishlist: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("wishlist", WishlistSchema);
