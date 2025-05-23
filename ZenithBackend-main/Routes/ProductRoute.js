const express = require("express");
const router = express.Router();
const productcontroller = require("../Controllers/ProductController");
const upload = require("../multerconfig/Storageconfig");
const auth = require("../middleware/auth");

router.route("/").post(
  // auth.isAuthenticated, // yo ekchin ko lagi comt out garne.
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "catalogFile", maxCount: 1 },
  ]),
  productcontroller.addProduct
);

router.route("/quote").post(productcontroller.quote);

router.route("/").get(productcontroller.getProducts);
router.route("/:id").get(productcontroller.getProductById);
router.route("/:id/catalog").get(productcontroller.catalogDownload);
router
  .route("/:id/catalog")
  .post(
    // auth.isAuthenticated,  // yo ekchin ko lagi comt out garne.
    upload.single("catalogFile"),
    productcontroller.catalogUpload
  );
router
  .route("/:id/catalog")
  .delete(auth.isAuthenticated, productcontroller.catalogDelete);

router
  .route("/:id")
  .put(
    auth.isAuthenticated,
    upload.fields([
      { name: "productImage", maxCount: 1 },
      { name: "catalogFile", maxCount: 1 },
    ]),
    productcontroller.editProduct
  );
router
  .route("/:id")
  .delete(auth.isAuthenticated, productcontroller.deleteProduct);

module.exports = router;
