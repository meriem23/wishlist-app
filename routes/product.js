const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");

/* Post Product */
router.post("/newProduct", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => res.status(201).send(product))
    .catch((err) => res.status(500).send({ msg: "Server error." }));
});

module.exports = router;
