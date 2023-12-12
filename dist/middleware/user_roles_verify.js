"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
// imports
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // this get token code for frontend
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.Bearer;
    const decodedJwt = jsonwebtoken_1.default.decode(accessToken);
    yield User_1.default.findById(decodedJwt.id).then((response) => {
        var _a;
        if ((_a = response === null || response === void 0 ? void 0 : response.role) === null || _a === void 0 ? void 0 : _a.includes("admin")) {
            next();
        }
        else {
            return res.status(401).json("sure ba Unauthorized access");
        }
    });
});
exports.verifyAdmin = verifyAdmin;
