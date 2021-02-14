const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const authMiddleware = require("../middlewares/authMiddleware");

/* Post Product */
router.post("/newProduct", (req, res) => {
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
