// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import { persistUserController } from "../../controllers/registration_and_authentication_controller/persist_user_controller";
import { verifyToken } from "../../middleware/jwt_middleware";

const persistUserRoute = express.Router();

persistUserRoute.get(
	"/",
	[verifyToken],
	expressAsyncHandler(persistUserController)
);

export default persistUserRoute;
