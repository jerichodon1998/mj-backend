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
exports.signinController = void 0;
// imports
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// my imports
const User_1 = __importDefault(require("../../models/User"));
const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //
    if (!email || !password) {
        return res.status(400).json("Provide input to all required fields");
    }
    const userExist = yield User_1.default.findOne({ email });
    // check if email/username already exist
    if (!userExist) {
        return res.status(404).json("Email on that account doesn't exist");
    }
    // check password hash match
    bcrypt_1.default.compare(password, userExist.password, function (err, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json("Internal server error");
            }
            if (result) {
                User_1.default.findById(userExist._id)
                    .select("-password")
                    .then((userData) => {
                    // create accessToken with JWT
                    const accessToken = jsonwebtoken_1.default.sign({ email: userData.email, id: userData.id }, accessTokenKey, {
                        expiresIn: "1h",
                    });
                    // Assigning refresh token in http-only cookie
                    res.cookie("Bearer", accessToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                        maxAge: 60 * 60 * 1000, // 1hr
                    });
                    return res.status(200).json(userData);
                })
                    .catch((err) => {
                    return res.status(500).json("Internal server error");
                });
            }
            else {
                return res.status(400).json("Email and Password don't match");
            }
        });
    });
});
exports.signinController = signinController;
