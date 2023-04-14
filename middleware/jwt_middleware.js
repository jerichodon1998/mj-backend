// imports
const jwt = require("jsonwebtoken");

const accessTokenKey = "accesstokenkey";

const verifyToken = (req, res, next) => {
	// ***** this get token code is for postman *****//
	// Take and split cookie from headers

	// this get token code for frontend
	const accessToken = req.cookies?.Bearer;

	// @this code puts null or "" in bearer token
	// req.cookies.Bearer = "" || null

	// verify access token
	jwt.verify(accessToken, accessTokenKey, (err) => {
		if (err) {
			return res.status(401).json(err);
		}

		return next();
	});
};

module.exports = { verifyToken };
