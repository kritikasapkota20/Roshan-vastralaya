const multer = require("multer");
const upload = require("../multerconfig/Storageconfig");

const optionalUpload = (req, res, next) => {
  // Otherwise, use multer
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "catalogFile", maxCount: 1 },
  ])(req, res, next);
};

module.exports = optionalUpload; 