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
	checkOutCartController,
} = require("../../controllers/cart_controller/cart_controller");
const { verifyToken } = require("../../middleware/jwt_middleware");

const cartRoute = express.Router();

cartRoute.get(
	"/shipped/:uid",
	[verifyToken],
	expressAsyncHandler(getCartShippedController)
);

cartRoute.get("/:uid", [verifyToken], expressAsyncHandler(getCartController));

cartRoute.delete(
	"/:uid",
	[verifyToken],
	expressAsyncHandler(deleteCartController)
);

cartRoute.put(
	"/:uid/addToCart/:productId",
	[verifyToken],
	expressAsyncHandler(addToCartController)
);

cartRoute.put(
	"/:uid/removeFromCart/:cartItemId",
	[verifyToken],
	expressAsyncHandler(removeFromCartController)
);

cartRoute.put(
	"/checkOut/:uid",
	[verifyToken],
	expressAsyncHandler(checkOutCartController)
);

cartRoute.post(
	"/:uid",
	[verifyToken],
	expressAsyncHandler(createCartController)
);

module.exports = cartRoute;
