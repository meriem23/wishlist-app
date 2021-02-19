const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDB");
const app = express();

//Requiring variables
require("dotenv").config();
// Connecting to the database
connectDB();
// Define middlewares
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));
// Define routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/product", require("./routes/product"));
app.use("/api/wishlist", require("./routes/wishlist"));

// Listening to the server 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
