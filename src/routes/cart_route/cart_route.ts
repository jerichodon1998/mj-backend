// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";

// my imports
import {
	getCartController,
	getCartShippedController,
	addToCartController,
	removeFromCartController,
	createCartController,
	deleteCartController,
	checkOutCartController,
} from "../../controllers/cart_controller/cart_controller";
import { verifyToken } from "../../middleware/jwt_middleware";

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

export default cartRoute;
