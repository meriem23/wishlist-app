const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  WishlistName: String,
  Name: String,
  Description: String,
  Price: Number,
  Image: {
    type: String,
    default: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    // "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
  },
  Status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
