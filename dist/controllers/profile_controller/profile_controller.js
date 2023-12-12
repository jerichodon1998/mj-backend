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
exports.updateProfileController = exports.getProfileController = void 0;
// my imports
const files_config_1 = require("../../configurations/files_config");
const isValidObjectId_1 = require("../../helper/isValidObjectId");
const User_1 = __importDefault(require("../../models/User"));
const getProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    yield User_1.default.findById(uid)
        .select("-password")
        .then((user) => {
        if (!user) {
            return res.status(404).json("User not found");
        }
        return res.status(200).json(user);
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.getProfileController = getProfileController;
const updateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { firstname, lastname, role, email, phoneNumber, address } = req.body;
    const userExist = yield User_1.default.findById(uid);
    if (!userExist) {
        return res.status(404).json("User not found");
    }
    const updates = {};
    if (firstname) {
        updates.firstname = firstname;
    }
    if (lastname) {
        updates.lastname = lastname;
    }
    if (role) {
        updates.role = role;
    }
    if (email) {
        updates.email = email;
    }
    if (phoneNumber) {
        updates.phoneNumber = phoneNumber;
    }
    if (address) {
        updates.address = address;
    }
    if (req.files[0]) {
        yield User_1.default.findById(uid).then((docs) => {
            if (docs.profilePictureId)
                files_config_1.gfs.GFS.delete(docs.profilePictureId);
        });
        updates.profilePictureId = req.files[0].id;
    }
    yield User_1.default.findByIdAndUpdate(uid, updates)
        .select("-password")
        .then((doc) => {
        return res.status(200).json("Profile updated successfully");
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.updateProfileController = updateProfileController;
