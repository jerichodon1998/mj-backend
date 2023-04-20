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

// my imports

const productRoute = express.Router();

productRoute.get("/", expressAsyncHandler(getProductsController));

productRoute.get("/:id", expressAsyncHandler(getProductController));

productRoute.post(
	"/",
	[verifyToken, upload.any("file")],
	expressAsyncHandler(createProduct)
);

productRoute.put(
	"/:id",
	[verifyToken, upload.array("file")],
	expressAsyncHandler(productUpdateController)
);

productRoute.delete(
	"/:id",
	[verifyToken],
	expressAsyncHandler(productDeleteController)
);

module.exports = productRoute;
