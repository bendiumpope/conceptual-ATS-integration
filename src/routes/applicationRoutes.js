const express = require("express");
const { createApplication } = require("../controllers/application");
const { applicationValidator } = require("../middleware/validators");

const router = express.Router();

router.post("/", applicationValidator, createApplication);

module.exports = router;
