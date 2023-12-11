// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	signoutController,
} = require("../../controllers/registration_and_authentication_controller/signout_controller");

const signoutRoute = express.Router();

signoutRoute.post("/", expressAsyncHandler(signoutController));

module.exports = signoutRoute;
