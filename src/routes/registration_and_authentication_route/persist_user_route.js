// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	persistUserController,
} = require("../../controllers/registration_and_authentication_controller/persist_user_controller");
const { verifyToken } = require("../../middleware/jwt_middleware");

const persistUserRoute = express.Router();

persistUserRoute.get("/", [verifyToken], expressAsyncHandler(persistUserController));

module.exports = persistUserRoute;
