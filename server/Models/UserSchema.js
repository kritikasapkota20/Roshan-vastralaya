const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.model("User", usersSchema);
module.exports = userSchema;
