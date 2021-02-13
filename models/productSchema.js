const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  prodUser: String,
  prodName: String,
  prodDesc: String,
  prodImage: String,
  prodStatus: String,
  addProdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema);
