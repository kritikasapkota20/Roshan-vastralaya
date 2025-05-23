const express = require("express");
const router = express.Router();
const usercontroller = require("../Controllers/user-controller");

const userAuth = require("../middleware/auth");

router.route("/register").post(usercontroller.adminRegister);
router.route("/login").post(usercontroller.adminLogin);
// router.route("/logout").get(usercontroller.logout);
router.route("/checkStatus").get(usercontroller.checkAdmin);

router
  .route("/token")
  .post(userAuth.isAuthenticated, usercontroller.getUserByToken);

module.exports = router;
