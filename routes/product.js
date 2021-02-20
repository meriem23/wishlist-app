const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

/* Private Routes */

/* Get all products*/
router.get("/", authMiddleware, (req, res) => {
  Product.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((products) => res.status(201).send(products))
    .catch((err) => res.status(500).send({ msg: "Server error" }));
});

/* Post Product */
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
});
router.post(
  "/",
  [
    upload.single("Image"),
    authMiddleware,
    [
      body("Name", "Product Name is required").notEmpty(),
      body("Description", "Product Description is required").notEmpty(),
      body("Price", "Product Price is required").notEmpty(),
      body("Status", "Product Status is required").notEmpty(),
      body("WishlistName", "Wishlist is required").notEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let path;
    if (req.file) {
      path = `/${req.file.filename}`;
    }
    const { Name, Description, Price, Status, WishlistName } = req.body;
    const newProduct = new Product({
      Name,
      Description,
      Price,
      Status,
      WishlistName,
      Image: path || null,
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
router.put(
  "/:id",
  [
    upload.single("Image"),
    authMiddleware,
    [
      body("Name", "Product Name is required").notEmpty(),
      body("Description", "Product Description is required").notEmpty(),
      body("Price", "Product Price is required").notEmpty(),
      body("Status", "Product Status is required").notEmpty(),
      body("WishlistName", "Wishlist is required").notEmpty(),
    ],
  ],
  (req, res) => {
    let path;
    if (req.file) {
      path = `/${req.file.filename}`;
    }
    const { Name, Description, Price, Status, Image, WishlistName } = req.body;
    let productFields = {};
    if (Name) productFields.Name = Name;
    if (Description) productFields.Description = Description;
    if (Price) productFields.Price = Price;
    if (Status) productFields.Status = Status;
    if (WishlistName) productFields.WishlistName = WishlistName;
    (productFields.Image = path || null),
      Product.findById(req.params.id).then((product) => {
        if (!product) {
          return res.status(404).json({ msg: "Product not found" });
        } else if (product.user.toString() !== req.user.id) {
          res.status(401).json({ msg: "Not authorized" });
        } else {
          Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true },
            (err, data) => {
              res.json(data);
            }
          );
        }
      });
  }
);

module.exports = router;
