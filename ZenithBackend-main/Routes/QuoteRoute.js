const express = require("express");
const router = express.Router();
const quoteform = require("../Controllers/quoteController");

router.route("/quote").post(quoteform.quoteData);

module.exports = router;
