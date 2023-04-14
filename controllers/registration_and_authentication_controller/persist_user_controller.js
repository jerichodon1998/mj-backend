// imported packages
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// imported exported packages
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const User = require("../../models/User");

const persistUserController = async (req, res) => {
	// this get token code for frontend
	const accessToken = req.cookies.Bearer;
	let decoded;

	try {
		decoded = jwt.decode(accessToken, accessTokenKey);
	} catch (err) {
		// err
		return res.status(401).json(err);
	}
	User.findById(decoded?.id)
		.select("-password")
		.then((user) => {
			if (!user) {
				return res.status(404).json("No user found");
			}
			return res.status(200).json(user);
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

module.exports = { persistUserController };
