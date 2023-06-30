// imports
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
	// this get token code for frontend
	const accessToken = req.cookies?.Bearer;

	const decodedJwt = jwt.decode(accessToken);

	await User.findById(decodedJwt.id).then((response) => {
		if (response?.role?.includes("admin")) {
			next();
		} else {
			return res.status(401).json("sure ba Unauthorized access");
		}
	});
};

module.exports = { verifyAdmin };
