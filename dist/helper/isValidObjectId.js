"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
// imports
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const isValidObjectId = (id, res) => {
    if (!ObjectId.isValid(id)) {
        return res.status(404).json("Not valid ID");
    }
};
exports.isValidObjectId = isValidObjectId;
