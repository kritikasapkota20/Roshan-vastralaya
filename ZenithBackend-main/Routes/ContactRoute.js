const express = require("express");
const router = express.Router();
const contactform = require("../Controllers/contactController");

router.route("/").post(contactform.contactData);

module.exports = router;
