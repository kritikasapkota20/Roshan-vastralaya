const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, "Please enter product Description"],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },

  brand: {
    type: String,
    required: [true, "Please enter product brand"],
    trim: true,
  },

  category: { type: mongoose.Types.ObjectId, ref: "Category" },

  image: {
    type: String,
    required: [true, "Please select image"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  catalog: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
