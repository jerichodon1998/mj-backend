// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	signupController,
} = require("../../controllers/registration_and_authentication_controller/signup_controller");

const signupRoute = express.Router();

signupRoute.post("/", expressAsyncHandler(signupController));

module.exports = signupRoute;
