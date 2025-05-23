const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
});

const contactModel = mongoose.model("getQuote", QuoteSchema);
module.exports = contactModel;
