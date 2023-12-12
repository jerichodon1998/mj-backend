"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import packages
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstname: { type: mongoose_1.Schema.Types.String, required: true },
    lastname: { type: mongoose_1.Schema.Types.String, required: true },
    password: { type: mongoose_1.Schema.Types.String, required: true },
    email: { type: mongoose_1.Schema.Types.String, unique: true, required: true },
    username: { type: mongoose_1.Schema.Types.String, unique: true, required: true },
    phoneNumber: { type: mongoose_1.Schema.Types.String },
    address: { type: mongoose_1.Schema.Types.String },
    profilePictureId: { type: mongoose_1.Schema.Types.ObjectId },
    role: { type: [mongoose_1.Schema.Types.String] },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
