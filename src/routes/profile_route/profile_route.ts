// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import {
	getProfileController,
	updateProfileController,
} from "../../controllers/profile_controller/profile_controller";
import { upload } from "../../configurations/files_config";

const profileRoute = express.Router();

profileRoute.get("/:uid", expressAsyncHandler(getProfileController));

profileRoute.put(
	"/:uid",
	[upload.array("file")],
	expressAsyncHandler(updateProfileController)
);

export default profileRoute;
