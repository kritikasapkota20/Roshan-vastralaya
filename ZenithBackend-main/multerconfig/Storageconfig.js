const multer = require("multer");

// Set up Multer storage options for product images
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "productImage") {
      cb(null, "./uploads/products");
    } else if (file.fieldname === "catalogFile") {
      cb(null, "./uploads/catalog");
    } else if (file.fieldname === "gallery") {
      cb(null, "./uploads/gallery");
    } else if (file.fieldname === "event") {
      cb(null, "./uploads/event");
    }
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = `${file.fieldname}-${Date.now()}.${extension}`;
    cb(null, filename);
  },
});

// File filter for product images
const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "productImage" ||
    file.fieldname === "gallery" ||
    file.fieldname === "event"
  ) {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/avif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, png, jpg images are allowed"));
    }
  } else if (file.fieldname === "catalogFile") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
};

// Initialize a single multer instance to handle both product and catalog file uploads
const upload = multer({
  storage: productStorage,
  limits: function (req, file, cb) {
    let fileSizeLimit;
    if (
      file.fieldname === "productImage" ||
      file.fieldname === "gallery" ||
      file.fieldname === "event"
    ) {
      fileSizeLimit = 2 * 1024 * 1024;
    } else if (file.fieldname === "catalogFile") {
      fileSizeLimit = 20 * 1024 * 1024;
    } else {
      return cb(new Error("Unsupported file field"));
    }
    if (file.size > fileSizeLimit) {
      console.log(file.size);
      return cb(
        new Error(
          `File size should be less than ${fileSizeLimit / 1024 / 1024}MB`
        )
      );
    }
    cb(null, true);
  },
  fileFilter: fileFilter,
});

module.exports = upload;
