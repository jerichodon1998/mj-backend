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

// my imports

const productRoute = express.Router();

productRoute.get("/", expressAsyncHandler(getProductsController));

productRoute.get("/:id", expressAsyncHandler(getProductController));

productRoute.post("/", [upload.any("file")], expressAsyncHandler(createProduct));

productRoute.put("/:id", [upload.array("file")], expressAsyncHandler(productUpdateController));

productRoute.delete("/:id", expressAsyncHandler(productDeleteController));

module.exports = productRoute;
