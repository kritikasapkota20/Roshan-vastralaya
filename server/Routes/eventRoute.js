const express = require("express");
const router = express.Router();
const upload = require("../multerconfig/Storageconfig");
const { isAuthenticated } = require("../middleware/auth");
const eventController = require("../Controllers/eventController");

router.post(
  "/",
  isAuthenticated,
  upload.array("event"),
  eventController.eventUpload
);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.delete("/:id", isAuthenticated, eventController.deleteEventImage);
router.post(
  "/:id",
  isAuthenticated,
  upload.array("event"),
  eventController.addEventPhoto
);

module.exports = router;
