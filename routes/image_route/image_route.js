// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	getImageController,
	deleteImageController,
} = require("../../controllers/image_controller/image_controller");

const imageRoute = express.Router();

imageRoute.get("/:id", expressAsyncHandler(getImageController));

imageRoute.delete("/:id", expressAsyncHandler(deleteImageController));

module.exports = imageRoute;
