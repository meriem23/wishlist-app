const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
/* Private Routes */

/* Get all wishlist*/
router.get("/", authMiddleware, (req, res) => {
  Wishlist.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((wishlists) => res.status(201).send(wishlists))
    .catch((err) => res.status(500).send({ msg: "Server error" }));
});

/* Post Wishlist */
router.post(
  "/",
  [authMiddleware, [body("wishlist", "Wishlist Name is required").notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { wishlist } = req.body;
    const newWishlist = new Wishlist({
      wishlist,
      user: req.user.id,
    });
    newWishlist
      .save()
      .then((wishlist) => res.status(201).send(wishlist))
      .catch((err) => res.status(500).send({ msg: "Server error." }));
  }
);

// /* Delete a product*/
// router.delete("/:id", authMiddleware, (req, res) => {
//   Product.findById(req.params.id)
//     .then((product) => {
//       if (!product) {
//         return res.status(404).json({ msg: "Product not found" });
//       } else if (product.user.toString() !== req.user.id) {
//         res.status(401).json({ msg: "Not authorized" });
//       } else {
//         Product.findByIdAndDelete(req.params.id, (err, data) => {
//           res.json({ msg: "Product deleted" });
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send("Server error");
//     });
// });

// /*Edit a product*/
// router.put("/:id", authMiddleware, (req, res) => {
//   const { pName, pDesc, pPrice, pImage, pStatus } = req.body;
//   let productFields = {};
//   if (pName) musicFields.pName = pName;
//   if (pDesc) musicFields.pDesc = pDesc;
//   if (pPrice) musicFields.pPrice = pPrice;
//   if (pImage) musicFields.pImage = pImage;
//   if (pStatus) musicFields.pStatus = pStatus;

//   Product.findById(req.params.id).then((product) => {
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     } else if (product.user.toString() !== req.user.id) {
//       res.status(401).json({ msg: "Not authorized" });
//     } else {
//       Product.findByIdAndUpdate(
//         req.params.id,
//         { $set: productFields },
//         (err, data) => {
//           res.json({ msg: "Product updated" });
//         }
//       );
//     }
//   });
// });

module.exports = router;
