const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDB");
const app = express();
const path = require("path");
const { buildSanitizeFunction } = require("express-validator");
//Requiring variables
require("dotenv").config();

// Connecting to the database
connectDB();

// Define middlewares and upload
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Define routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/product", require("./routes/product"));
app.use("/api/wishlist", require("./routes/wishlist"));

//Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listening to the server 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
