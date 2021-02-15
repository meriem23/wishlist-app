const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
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
    const { fname, lname, email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .send({ errors: [{ msg: "The user already exists in the DB." }] });
        } else {
          user = new User({
            fname,
            lname,
            email,
            password,
          });
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          bcrypt.hash(user.password, salt, (err, hashPwd) => {
            if (err) {
              throw err;
            }
            user.password = hashPwd;
            user.save();
            let payload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              { expiresIn: 3600000 },
              (err, token) => {
                if (err) {
                  throw err;
                }
                res.send({ token });
              }
            );
          });
        });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server error");
      });
  }
);

module.exports = router;
