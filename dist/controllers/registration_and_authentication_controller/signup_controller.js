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
exports.signupController = void 0;
// imports
const bcrypt_1 = __importDefault(require("bcrypt"));
// my imports
const User_1 = __importDefault(require("../../models/User"));
const saltRounds = 10;
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, username, password } = req.body;
    //
    if (!firstname || !lastname || !email || !password || !username) {
        return res.status(400).json("Provide input to all required fields");
    }
    const userEmailExist = yield User_1.default.findOne({ email });
    const userUsernameExist = yield User_1.default.findOne({ username });
    // check if email/username already exist
    if (userEmailExist) {
        return res.status(400).json("Email already taken");
    }
    if (userUsernameExist) {
        return res.status(400).json("Username already taken");
    }
    // hash password
    bcrypt_1.default.hash(password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json(err);
        }
        User_1.default.create({ firstname, lastname, email, username, password: hash })
            .then((response) => {
            return res.status(201).json("User created");
        })
            .catch((err) => {
            return res.status(500).json(err);
        });
    });
});
exports.signupController = signupController;
