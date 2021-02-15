const express = require("express");
var cors = require("cors");
const connectDB = require("./config/connectDB");
const app = express();
//const directory = path.join(__dirname, "/uploads");

//Requiring variables
require("dotenv").config();
// Connecting to the database
connectDB();
// Define middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Define routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/product", require("./routes/product"));
// Listening to the server 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
