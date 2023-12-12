"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const persist_user_controller_1 = require("../../controllers/registration_and_authentication_controller/persist_user_controller");
const jwt_middleware_1 = require("../../middleware/jwt_middleware");
const persistUserRoute = express_1.default.Router();
persistUserRoute.get("/", [jwt_middleware_1.verifyToken], (0, express_async_handler_1.default)(persist_user_controller_1.persistUserController));
exports.default = persistUserRoute;
