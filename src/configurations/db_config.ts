// import packages
import mongoose from "mongoose";

// my imports
import { gfs } from "./files_config";

const URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommerce-app";

mongoose.connect(URI);

export const conn = mongoose.connection;
conn.once("open", (_) => {
	// connect multer gridfs to mongoose connection
	gfs.GFS = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "images",
	});
	console.log(`Database connected on ${conn.name}`);
});

conn.once("error", (error) => {
	console.log(`Database error ${error}`);
});
