const express = require("express");
var cors = require("cors");
const connectDB = require("./config/connectDB");
const app = express();

//Requiring variables
require("dotenv").config();
// Connecting to the database
connectDB();
// Define middlewares
app.use(express.json());
app.use(cors());
// Define routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/product", require("./routes/product"));
// Listening to the server 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
