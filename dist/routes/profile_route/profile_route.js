"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// my imports
const profile_controller_1 = require("../../controllers/profile_controller/profile_controller");
const files_config_1 = require("../../configurations/files_config");
const profileRoute = express_1.default.Router();
profileRoute.get("/:uid", (0, express_async_handler_1.default)(profile_controller_1.getProfileController));
profileRoute.put("/:uid", [files_config_1.upload.array("file")], (0, express_async_handler_1.default)(profile_controller_1.updateProfileController));
exports.default = profileRoute;
