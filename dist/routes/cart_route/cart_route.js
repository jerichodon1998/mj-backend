"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const cart_controller_1 = require("../../controllers/cart_controller/cart_controller");
const jwt_middleware_1 = require("../../middleware/jwt_middleware");
const cartRoute = express_1.default.Router();
cartRoute.get("/shipped/:uid", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.getCartShippedController));
cartRoute.get("/:uid", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.getCartController));
cartRoute.delete("/:uid", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.deleteCartController));
cartRoute.put("/:uid/addToCart/:productId", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.addToCartController));
cartRoute.put("/:uid/removeFromCart/:cartItemId", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.removeFromCartController));
cartRoute.put("/checkOut/:uid", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.checkOutCartController));
cartRoute.post("/:uid", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(cart_controller_1.createCartController));
exports.default = cartRoute;
