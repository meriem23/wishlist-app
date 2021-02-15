const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Load Connected User
router.get("/", authMiddleware, (req, res) => {
  User.findById(req.user.id)
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
  "/",
  [
    body("email", "Please enter your email.").isEmail(),
    body("password", "Please enter your password.").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ errors: [{ msg: "Please register first." }] });
        }
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
            console.log(err.message);
          } else if (!isMatch) {
            const payload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              { expiresIn: 3600000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          } else {
            return res.status(400).json({ msg: "Wrong Password" });
          }
        });
      })
      .catch((err) => {
        res.status(500).send("Server error");
      });
  }
);

module.exports = router;
// else if (!isMatch) {
//   return res.status(400).json({ errors: [{ msg: "Wrong password." }] });
// } else {
//   let payload = {
//     user: user._id,
//   };
//   jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
//     if (err) {
//       throw err;
//     }
//     res.send({ token });
//   });
