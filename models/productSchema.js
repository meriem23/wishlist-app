const mongoose = require("mongoose");
const User = require("./userSchema");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  pOwner: { type: Schema.Types.ObjectId, ref: "User" },
  pName: String,
  pDesc: String,
  pPrice: Number,
  pImage: {
    type: String,
    default:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  },
  pStatus: String,
  addpDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema);
