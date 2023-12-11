// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	getProfileController,
	updateProfileController,
} = require("../../controllers/profile_controller/profile_controller");
const { upload } = require("../../configurations/files_config");

const profileRoute = express.Router();

profileRoute.get("/:uid", expressAsyncHandler(getProfileController));

profileRoute.put("/:uid", [upload.array("file")], expressAsyncHandler(updateProfileController));

module.exports = profileRoute;
