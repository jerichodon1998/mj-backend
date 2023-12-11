// imports
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getCartItemController } from "../../controllers/cart_item_controller/cart_item_controller";

// my imports

const cartItemRoute = express.Router();

cartItemRoute.get("/:id", expressAsyncHandler(getCartItemController));

export default cartItemRoute;
