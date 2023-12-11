// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {
	getProductsController,
	getProductController,
	createProduct,
	productUpdateController,
	productDeleteController,
} = require("../../controllers/product_controller/product_controller");
const { upload } = require("../../configurations/files_config");
const { verifyToken } = require("../../middleware/jwt_middleware");
const { verifyAdmin } = require("../../middleware/user_roles_verify");

// my imports

const productRoute = express.Router();

productRoute.get("/", expressAsyncHandler(getProductsController));

productRoute.get("/:id", expressAsyncHandler(getProductController));

productRoute.post(
	"/",
	[verifyToken, verifyAdmin, upload.any("file")],
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

module.exports = productRoute;
