"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const signup_controller_1 = require("../../controllers/registration_and_authentication_controller/signup_controller");
const signupRoute = express_1.default.Router();
signupRoute.post("/", (0, express_async_handler_1.default)(signup_controller_1.signupController));
exports.default = signupRoute;
