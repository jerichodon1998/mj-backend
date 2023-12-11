// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// my imports
const User = require("../../models/User");

const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";

const signinController = async (req, res) => {
	const { email, password } = req.body;

	//
	if (!email || !password) {
		return res.status(400).json("Provide input to all required fields");
	}

	const userExist = await User.findOne({ email });

	// check if email/username already exist
	if (!userExist) {
		return res.status(404).json("Email on that account doesn't exist");
	}

	// check password hash match
	bcrypt.compare(password, userExist.password, async function (err, result) {
		if (err) {
			return res.status(500).json("Internal server error");
		}
		if (result) {
			User.findById(userExist._id)
				.select("-password")
				.then((userData) => {
					// create accessToken with JWT
					const accessToken = jwt.sign(
						{ email: userData.email, id: userData.id },
						accessTokenKey,
						{
							expiresIn: "1h",
						}
					);

					// Assigning refresh token in http-only cookie
					res.cookie("Bearer", accessToken, {
						httpOnly: true,
						sameSite: "None",
						secure: true,
						maxAge: 60 * 60 * 1000, // 1hr
					});

					return res.status(200).json(userData);
				})
				.catch((err) => {
					return res.status(500).json("Internal server error");
				});
		} else {
			return res.status(400).json("Email and Password don't match");
		}
	});
};

module.exports = { signinController };
