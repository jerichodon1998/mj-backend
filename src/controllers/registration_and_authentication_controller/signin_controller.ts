// imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// my imports
import User from "../../models/User";
import { Request, RequestHandler, Response } from "express";

const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";

export const signinController: RequestHandler = async (
	req: Request,
	res: Response
) => {
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
						sameSite: "none",
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
