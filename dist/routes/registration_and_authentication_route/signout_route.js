"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const signout_controller_1 = require("../../controllers/registration_and_authentication_controller/signout_controller");
const signoutRoute = express_1.default.Router();
signoutRoute.post("/", (0, express_async_handler_1.default)(signout_controller_1.signoutController));
exports.default = signoutRoute;
