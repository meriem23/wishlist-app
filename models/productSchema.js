const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  prodName: String,
  prodDesc: String,
  prodImage:String,
  prodStatus:[],
  addProdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("product", productSchema);
