const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

router.get("/", usersAPIController.getUsers);
router.get("/:id", usersAPIController.getUser);
router.get("/:id/image", usersAPIController.getUserImage);

module.exports = router;
