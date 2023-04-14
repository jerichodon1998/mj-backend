// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	signinController,
} = require("../../controllers/registration_and_authentication_controller/signin_controller");

const signinRoute = express.Router();

signinRoute.post("/", expressAsyncHandler(signinController));

module.exports = signinRoute;
