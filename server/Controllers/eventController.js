const asyncHandler = require("express-async-handler");
const Event = require("../Models/eventModel");
const path = require("path");
const fs = require("fs");

module.exports.eventUpload = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (req.files) {
    const event = new Event({
      title: req.body.title,
    });
    req.files.forEach(async (file) => {
      event.images.push(file.path);
    });
    await event.save();
  }
  res.json({
    success: true,
    message: "event photos uploaded",
  });
});

module.exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort("-createdAt");
  res.json({
    success: true,
    events,
  });
});
module.exports.getEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  console.log("event", event);
  res.json({
    success: true,
    event,
  });
});

module.exports.deleteEventImage = asyncHandler(async (req, res) => {
  const queries = req.query;
  const { src } = req.query;

  if (src) {
    const imageArr = src.split("/");
    console.log(imageArr.length, "str to delete");
    if (imageArr.length === 4) {
      const imgStr = imageArr[3];
      console.log(imgStr);
      const eventFrom = await Event.findById(req.params.id);
      if (eventFrom?.images?.includes(imgStr)) {
        filteredImage = eventFrom.images.filter(
          (imgString) => imgString !== imgStr
        );
        const normalisedPath = path.normalize(imgStr);
        eventFrom.images = filteredImage;
        await eventFrom.save();
        if (fs.existsSync(normalisedPath)) {
          fs.unlink(normalisedPath, async (err) => {
            if (err) {
              console.error(`Error deleting file: ${err.message}`);
              return res
                .status(500)
                .json({ message: "Error deleting file", error: err.message });
            }

            return res.json({ success: true, message: "image deleted" });
          });
        } else {
          return res.json({
            success: true,
            message: "event image data deleted",
          });
        }
      }
      return;
    }
  }

  const imageToDelete = await Event.findByIdAndDelete(req.params.id);
  console.log(imageToDelete);

  if (!imageToDelete) {
    return res.status(404).json({ message: "Event not found" });
  }
  imageToDelete.images.forEach((imageUrl) => {
    const fullPath = path.join(__dirname, "..", imageUrl);
    const normalisedPath = path.normalize(fullPath);
    fs.unlink(normalisedPath, (err) => {
      if (err) {
        return console.error(
          `Failed to delete file ${fullPath}: ${err.message}`
        );
      }
      console.log("deleted file at path ", normalisedPath);
    });
  });
  res
    .status(200)
    .json({ success: true, message: "Event deleted and files removed" });
});

module.exports.addEventPhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  req.files.forEach(async (file) => {
    event.images.push(file.path);
  });
  await event.save();
  res.json({
    success: true,
    message: "event photos uploaded",
  });
});
