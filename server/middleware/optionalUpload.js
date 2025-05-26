const multer = require("multer");
const upload = require("../multerconfig/Storageconfig");

const optionalUpload = (req, res, next) => {
  // If no files are being uploaded, skip multer
  if (!req.files && !req.file) {
    return next();
  }
  
  // Otherwise, use multer
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "catalogFile", maxCount: 1 },
  ])(req, res, next);
};

module.exports = optionalUpload; 