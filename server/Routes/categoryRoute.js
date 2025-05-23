const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const categoryController = require("../Controllers/categoryController");

router.route("/").post(auth.isAuthenticated, categoryController.createCategory);

router.route("/").get(categoryController.getCategories);

router
  .route("/:id")
  .delete(auth.isAuthenticated, categoryController.deleteCategory);

module.exports = router;
