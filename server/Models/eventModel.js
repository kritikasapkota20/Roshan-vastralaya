const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("Event", eventSchema);
module.exports = eventModel;
