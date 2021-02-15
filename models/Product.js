const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  pName: String,
  pDesc: String,
  pPrice: Number,
  pImage: {
    type: String,
    default:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  },
  pStatus: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
