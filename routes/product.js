const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
const upload = require("../config/multerStorage");
/* Private Routes */

/* Get all products*/
router.get("/", authMiddleware, (req, res) => {
  Product.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((products) => res.status(201).send(products))
    .catch((err) => res.status(500).send({ msg: "Server error" }));
});

/* Post Product */
router.post(
  "/",
  [
    upload.single("pImage"),
    authMiddleware,
    [
      body("pName", "Product Name is required").notEmpty(),
      body("pDesc", "Product Description is required").notEmpty(),
      body("pPrice", "Product Price is required").notEmpty(),
      body("pStatus", "Product Status is required").notEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pName, pDesc, pPrice, pImage, pStatus } = req.body;
    let img = req.file.filename;
    const newProduct = new Product({
      pName,
      pDesc,
      pPrice,
      pStatus,
      pImage: img,
      user: req.user.id,
    });
    newProduct
      .save()
      .then((product) => res.status(201).send(product))
      .catch((err) => res.status(500).send({ msg: "Server error." }));
  }
);

/* Delete a product*/
router.delete("/:id", authMiddleware, (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      } else if (product.user.toString() !== req.user.id) {
        res.status(401).json({ msg: "Not authorized" });
      } else {
        Product.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Product deleted" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

/*Edit a product*/
router.put("/:id", authMiddleware, (req, res) => {
  const { pName, pDesc, pPrice, pImage, pStatus } = req.body;
  let productFields = {};
  if (pName) musicFields.pName = pName;
  if (pDesc) musicFields.pDesc = pDesc;
  if (pPrice) musicFields.pPrice = pPrice;
  if (pImage) musicFields.pImage = pImage;
  if (pStatus) musicFields.pStatus = pStatus;

  Product.findById(req.params.id).then((product) => {
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    } else if (product.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not authorized" });
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        { $set: productFields },
        (err, data) => {
          res.json({ msg: "Product updated" });
        }
      );
    }
  });
});

module.exports = router;
