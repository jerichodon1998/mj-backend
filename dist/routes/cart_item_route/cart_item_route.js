"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cart_item_controller_1 = require("../../controllers/cart_item_controller/cart_item_controller");
// my imports
const cartItemRoute = express_1.default.Router();
cartItemRoute.get("/:id", (0, express_async_handler_1.default)(cart_item_controller_1.getCartItemController));
exports.default = cartItemRoute;
