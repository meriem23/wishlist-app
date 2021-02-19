const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  WishlistName: String,
  Name: String,
  Description: String,
  Price: Number,
  Image: {
    type: String,
    default:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  },
  Status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
