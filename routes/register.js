const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Register a new user
router.post(
  "/",
  [
    body("fname", "First name must be alphabetic only.").isAlpha(),
    body("lname", "Last name must be alphabetic only.").isAlpha(),
    body("email", "Email must be valid email form.").isEmail(),
    body("password", "Password length must be min 4 characters.").isLength({
      min: 4,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((users) => {
      if (users) {
        return res
          .status(400)
          .send({ errors: [{ msg: "The user already exists in the DB." }] });
      }
      let newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(req.body.password, salt, (err, hashPwd) => {
          if (err) {
            throw err;
          }
          newUser.password = hashPwd;
          newUser.save();
          let payload = {
            userId: newUser._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        });
      });
    });
  }
);

module.exports = router;
