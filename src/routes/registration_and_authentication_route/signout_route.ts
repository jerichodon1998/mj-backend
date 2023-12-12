// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import { signoutController } from "../../controllers/registration_and_authentication_controller/signout_controller";

const signoutRoute = express.Router();

signoutRoute.post("/", expressAsyncHandler(signoutController));

export default signoutRoute;
