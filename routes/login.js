const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

// Load Connected User
router.get("/loadUser", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server error." });
    });
});

// Login User
router.post(
  "/loginUser",
  [
    body("email", "Please enter your email.").isEmail(),
    body("password", "Please enter your password.").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Please register first." }] });
      }
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error) {
          console.log(user.password);
        } else if (!isMatch) {
          return res.json({ errors: [{ msg: "Wrong password." }] });
        } else {
          let payload = {
            userId: user._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);

module.exports = router;
