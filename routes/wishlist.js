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

/* Delete a wishlist*/
router.delete("/:id", authMiddleware, (req, res) => {
  Wishlist.findById(req.params.id)
    .then((wishlist) => {
      if (!wishlist) {
        return res.status(404).json({ msg: "Wishlist not found" });
      } else if (wishlist.user.toString() !== req.user.id) {
        res.status(401).json({ msg: "Not authorized" });
      } else {
        Wishlist.findByIdAndDelete(req.params.id, (err, data) => {
          res.json({ msg: "Wishlist deleted" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

/*Edit a wishlist*/
router.put("/:id", authMiddleware, (req, res) => {
  const { wishlist } = req.body;
  let wishlistField = {};
  if (wishlist) wishlistField.wishlist = wishlist;

  Wishlist.findById(req.params.id).then((wishlist) => {
    if (!wishlist) {
      return res.status(404).json({ msg: "Wishlist not found" });
    } else if (wishlist.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not authorized" });
    } else {
      Wishlist.findByIdAndUpdate(
        req.params.id,
        { $set: wishlistField },
        (err, data) => {
          res.json({ msg: "Wishlist updated" });
        }
      );
    }
  });
});

module.exports = router;
