"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const product_controller_1 = require("../../controllers/product_controller/product_controller");
const files_config_1 = require("../../configurations/files_config");
const jwt_middleware_1 = require("../../middleware/jwt_middleware");
const user_roles_verify_1 = require("../../middleware/user_roles_verify");
// my imports
const productRoute = express_1.default.Router();
productRoute.get("/", (0, express_async_handler_1.default)(product_controller_1.getProductsController));
productRoute.get("/:id", (0, express_async_handler_1.default)(product_controller_1.getProductController));
productRoute.post("/", [jwt_middleware_1.verifyToken, user_roles_verify_1.verifyAdmin, files_config_1.upload.any()], (0, express_async_handler_1.default)(product_controller_1.createProduct));
productRoute.put("/:id", [jwt_middleware_1.verifyToken, user_roles_verify_1.verifyAdmin, files_config_1.upload.array("file")], (0, express_async_handler_1.default)(product_controller_1.productUpdateController));
productRoute.delete("/:id", [jwt_middleware_1.verifyToken, user_roles_verify_1.verifyAdmin], (0, express_async_handler_1.default)(product_controller_1.productDeleteController));
exports.default = productRoute;
