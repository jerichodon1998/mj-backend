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
exports.persistUserController = void 0;
// imported packages
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// imported exported packages
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";
const User_1 = __importDefault(require("../../models/User"));
const persistUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this get token code for frontend
    const accessToken = req.cookies.Bearer;
    const decoded = jsonwebtoken_1.default.verify(accessToken, accessTokenKey);
    yield User_1.default.findById(decoded.id)
        .select("-password")
        .then((user) => {
        if (!user) {
            return res.status(404).json("No user found");
        }
        return res.status(200).json(user);
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.persistUserController = persistUserController;
