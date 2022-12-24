const express = require("express");
const router = express.Router();
const mainAPIController = require("../../controllers/api/mainAPIController");

router.get("/session", mainAPIController.getSession);

module.exports = router;
