const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const galleryModel = mongoose.model("Gallery", gallerySchema);
module.exports = galleryModel;
