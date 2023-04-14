// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// my imports
const {
	getCartController,
	getCartShippedController,
	addToCartController,
	removeFromCartController,
	createCartController,
	deleteCartController,
} = require("../../controllers/cart_controller/cart_controller");

const cartRoute = express.Router();

cartRoute.get("/shipped/:uid", expressAsyncHandler(getCartShippedController));

cartRoute.get("/:uid", expressAsyncHandler(getCartController));

cartRoute.delete("/:uid", expressAsyncHandler(deleteCartController));

cartRoute.put("/:uid/addToCart/:productId", expressAsyncHandler(addToCartController));

cartRoute.put("/:uid/removeFromCart/:cartItemId", expressAsyncHandler(removeFromCartController));

cartRoute.post("/:uid", expressAsyncHandler(createCartController));

module.exports = cartRoute;
