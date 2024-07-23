const express = require("express");
const multer = require("multer");
const { createExternalATS } = require("../controllers/externalATS");
const fileUpload = require("../middleware/file-upload");
const { externalATSValidator } = require("../middleware/validators");

const router = express.Router();

router.post(
  "/",
  fileUpload.single("cv"),
  externalATSValidator,
  createExternalATS
);

module.exports = router;
