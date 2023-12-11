// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import {
	getImageController,
	deleteImageController,
} from "../../controllers/image_controller/image_controller";

const imageRoute = express.Router();

imageRoute.get("/:id", expressAsyncHandler(getImageController));

imageRoute.delete("/:id", expressAsyncHandler(deleteImageController));

export default imageRoute;
