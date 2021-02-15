const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

/* Post Product */
router.post("/newProduct", upload.single("pImg"), (req, res) => {
  // let path =
  //   req.protocol +
  //   "://" +
  //   req.hostname +
  //   ":" +
  //   5000 +
  //   "/uploads/" +
  //   req.file.filename;
  // let newImage = new Product({ pImage: path });
  // newImage
  //   .save()
  //   .then((img) => res.status(201).send(img))
  //   .catch((err) => res.status(500).send({ msg: "Server error" }));
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => res.status(201).send(product))
    .catch((err) => res.status(500).send({ msg: "Server error." }));
});

/* Get all products*/
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.status(201).send(products))
    .catch((err) => res.status(500).send({ msg: "Server error" }));
});

/* Delete a product*/
router.delete("/deleteProduct/:prodID", (req, res) => {
  Product.findByIdAndDelete(req.params.prodID)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      }
      res.status(201).send({ msg: "Product was deleted" });
    })
    .catch((err) => res.status(500).send({ msg: "Server error" }));
});

/*Edit a product*/
router.put("/editProduct/:prodID", (req, res) => {
  Product.findByIdAndUpdate(req.params.prodID, { ...req.body }, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      }
      res.status(201).send({ msg: "Product edited", product });
    })
    .catch((err) => err.status(500).send({ msg: "Server error" }));
});

module.exports = router;
