const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema({
  Image: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("image", ImageSchema);
