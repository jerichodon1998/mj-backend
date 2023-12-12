"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const signin_controller_1 = require("../../controllers/registration_and_authentication_controller/signin_controller");
const signinRoute = express_1.default.Router();
signinRoute.post("/", (0, express_async_handler_1.default)(signin_controller_1.signinController));
exports.default = signinRoute;
