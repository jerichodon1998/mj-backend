"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const image_controller_1 = require("../../controllers/image_controller/image_controller");
const imageRoute = express_1.default.Router();
imageRoute.get("/:id", (0, express_async_handler_1.default)(image_controller_1.getImageController));
imageRoute.delete("/:id", (0, express_async_handler_1.default)(image_controller_1.deleteImageController));
exports.default = imageRoute;
