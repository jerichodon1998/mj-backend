// imports
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {
	getCartItemController,
} = require("../../controllers/cart_item_controller/cart_item_controller");

// my imports

const cartItemRoute = express.Router();

cartItemRoute.get("/:id", expressAsyncHandler(getCartItemController));

module.exports = cartItemRoute;
