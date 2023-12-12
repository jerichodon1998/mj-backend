// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import { signupController } from "../../controllers/registration_and_authentication_controller/signup_controller";

const signupRoute = express.Router();

signupRoute.post("/", expressAsyncHandler(signupController));

export default signupRoute;
