const express = require("express");
const { createContact } = require("../controllers/contact");
const { contactValidator } = require("../middleware/validators");

const router = express.Router();

router.post("/", contactValidator, createContact);

module.exports = router;
