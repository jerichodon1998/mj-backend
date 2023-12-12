// import packages
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
import crypto from "crypto";

export let gfs = { GFS: null };

// use env files for this
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommerce-app";

const storage = new GridFsStorage({
	url: uri,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const ext = path.extname(file.originalname);
			if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
				return reject("images only");
			}
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "images",
				};
				resolve(fileInfo);
			});
		});
	},
});

export const upload = multer({ storage });
