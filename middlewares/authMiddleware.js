const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const authMiddleware = (req, res, next) => {
  let token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "You are not an authorized user" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      throw err;
    }
    req.userId = payload.userId;
    next();
  });
};

module.exports = authMiddleware;
