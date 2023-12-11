// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import { signinController } from "../../controllers/registration_and_authentication_controller/signin_controller";

const signinRoute = express.Router();

signinRoute.post("/", expressAsyncHandler(signinController));

export default signinRoute;
