const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const multer = require("multer");

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

router.post("/", upload.single("Image"), (req, res) => {
  let path =
    req.protocol +
    "://" +
    req.hostname +
    ":" +
    5000 +
    "/uploads/" +
    req.file.filename;
  let newImage = new Image({ Image: path });
  newImage
    .save()
    .then((img) => res.status(201).send(img))
    .catch((err) => res.status(500).send("Server error"));
});

module.exports = router;
