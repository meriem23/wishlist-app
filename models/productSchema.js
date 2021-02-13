const mongoose = require("mongoose");
const User = require("./userSchema");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  prodOwner: { type: Schema.Types.ObjectId, ref: "User" },
  prodName: String,
  prodDesc: String,
  prodImage: { type: String, default: "./utils/default-product-image.png" },
  prodStatus: String,
  addProdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema);
