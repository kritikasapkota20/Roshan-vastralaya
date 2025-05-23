const asyncHandler = require("express-async-handler");
const Gallery = require("../Models/galleryModel");
const path = require("path");
const fs = require("fs");

module.exports.galleryUpload = asyncHandler(async (req, res) => {
  if (req.files) {
    req.files.forEach(async (file) => {
      galleryImage = new Gallery({
        title: req.body.title,
        url: file.path,
      });
      await galleryImage.save();
    });
  }
  res.json({
    success: true,
    message: "photos uploaded",
  });
});

module.exports.getGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find({}).sort("-createdAt");
  res.json({
    success: true,
    gallery,
  });
});

module.exports.deleteGalleryImage = asyncHandler(async (req, res) => {
  const imageToDelete = await Gallery.findByIdAndDelete(req.params.id);

  console.log(imageToDelete);

  if (!imageToDelete) {
    return res.status(404).json({ message: "Gallery not found" });
  }
  const fullPath = path.join(__dirname, "..", imageToDelete.url); // Adjust 'uploads' to your actual folder name
  const normalisedPath = path.normalize(fullPath);
  fs.unlink(normalisedPath, (err) => {
    if (err) {
      return console.error(`Failed to delete file ${fullPath}: ${err.message}`);
    }
    console.log("deleted file at path ", normalisedPath);
  });

  res
    .status(200)
    .json({ success: true, message: "Gallery deleted and files removed" });
});
