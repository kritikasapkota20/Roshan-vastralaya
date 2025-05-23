const express = require("express");
const router = express.Router();

const galleryController = require("../Controllers/galleryController");
const upload = require("../multerconfig/Storageconfig");
const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/",
  isAuthenticated,
  upload.array("gallery"),
  galleryController.galleryUpload
);
router.get("/", galleryController.getGallery);
router.delete("/:id", isAuthenticated, galleryController.deleteGalleryImage);

module.exports = router;
