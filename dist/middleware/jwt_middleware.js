"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";
const verifyToken = (req, res, next) => {
    // ***** this get token code is for postman *****//
    // Take and split cookie from headers
    var _a;
    // this get token code for frontend
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.Bearer;
    // @this code puts null or "" in bearer token
    // req.cookies.Bearer = "" || null
    // verify access token
    jsonwebtoken_1.default.verify(accessToken, accessTokenKey, (err) => {
        if (err) {
            return res.status(401).json(err);
        }
        return next();
    });
};
exports.verifyToken = verifyToken;
