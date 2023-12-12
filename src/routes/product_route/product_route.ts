// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
	getProductsController,
	getProductController,
	createProduct,
	productUpdateController,
	productDeleteController,
} from "../../controllers/product_controller/product_controller";
import { upload } from "../../configurations/files_config";
import { verifyToken } from "../../middleware/jwt_middleware";
import { verifyAdmin } from "../../middleware/user_roles_verify";

// my imports

const productRoute = express.Router();

productRoute.get("/", expressAsyncHandler(getProductsController));

productRoute.get("/:id", expressAsyncHandler(getProductController));

productRoute.post(
	"/",
	[verifyToken, verifyAdmin, upload.any()],
	expressAsyncHandler(createProduct)
);

productRoute.put(
	"/:id",
	[verifyToken, verifyAdmin, upload.array("file")],
	expressAsyncHandler(productUpdateController)
);

productRoute.delete(
	"/:id",
	[verifyToken, verifyAdmin],
	expressAsyncHandler(productDeleteController)
);

export default productRoute;
