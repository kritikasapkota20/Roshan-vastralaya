const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    console.log('Database URI:', process.env.DataBase); // Debug line
    await mongoose.connect(process.env.DataBase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectDB;
