"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.gfs = void 0;
// import packages
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
exports.gfs = { GFS: null };
// use env files for this
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommerce-app";
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const ext = path_1.default.extname(file.originalname);
            if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
                return reject("images only");
            }
            crypto_1.default.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path_1.default.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "images",
                };
                resolve(fileInfo);
            });
        });
    },
});
exports.upload = (0, multer_1.default)({ storage });
