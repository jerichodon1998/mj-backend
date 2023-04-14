// import packages
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");

const gfs = { GFS: null };

// use env files for this
const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommerce-app2";

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

const upload = multer({ storage });

module.exports = { upload, gfs };
