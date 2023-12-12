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
exports.deleteImageController = exports.getImageController = void 0;
// imports
const mongoose_1 = __importDefault(require("mongoose"));
const files_config_1 = require("../../configurations/files_config");
const ObjectId = mongoose_1.default.Types.ObjectId;
const getImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let elements = [];
    if (!ObjectId.isValid(id)) {
        return res.status(400).json("ID not valid");
    }
    const data = files_config_1.gfs.GFS.find({ _id: new ObjectId(id) });
    yield data.forEach((element) => {
        elements.push(element);
    });
    // check if it exist
    if (elements.length > 0) {
        files_config_1.gfs.GFS.openDownloadStream(new ObjectId(id)).pipe(res);
    }
    else {
        return res.status(404).json("Dont exist");
    }
});
exports.getImageController = getImageController;
const deleteImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let elements = [];
    if (!ObjectId.isValid(id)) {
        return res.status(400).json("ID not valid");
    }
    const data = files_config_1.gfs.GFS.find({ _id: new ObjectId(id) });
    yield data.forEach((element) => {
        elements.push(element);
    });
    // check if it exist
    if (elements.length > 0) {
        files_config_1.gfs.GFS.delete(new ObjectId(id));
        return res.status(200).json("Ok");
    }
    // else {
    // 	return res.status(404).json("Don't exist");
    // }
});
exports.deleteImageController = deleteImageController;
