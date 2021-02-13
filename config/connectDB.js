const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const URL = process.env.MONGO_URL;

const connectDB = () => {
  mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("DB is connected");
    }
  );
};

module.exports = connectDB;
