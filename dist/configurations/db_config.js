"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
// import packages
const mongoose_1 = __importDefault(require("mongoose"));
// my imports
const files_config_1 = require("./files_config");
const URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommerce-app";
mongoose_1.default.connect(URI);
exports.conn = mongoose_1.default.connection;
exports.conn.once("open", (_) => {
    // connect multer gridfs to mongoose connection
    files_config_1.gfs.GFS = new mongoose_1.default.mongo.GridFSBucket(exports.conn.db, {
        bucketName: "images",
    });
    console.log(`Database connected on ${exports.conn.name}`);
});
exports.conn.once("error", (error) => {
    console.log(`Database error ${error}`);
});
