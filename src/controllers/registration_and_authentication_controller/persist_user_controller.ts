// imported packages
import jwt, { DecodeOptions } from "jsonwebtoken";
import mongoose from "mongoose";
// imported exported packages
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
import User from "../../models/User";
import { Request, RequestHandler, Response } from "express";

export interface IToken {
	email: string;
	id: string;
}

export const persistUserController: RequestHandler = async (
	req: Request,
	res: Response
) => {
	// this get token code for frontend
	const accessToken = req.cookies.Bearer;
	let decoded;

	try {
		if (!accessTokenKey) {
			return res.status(500).json("Internal Server Error");
		} else {
			decoded = jwt.decode(accessToken, { complete: true } as DecodeOptions);
		}
	} catch (err) {
		// err
		return res.status(401).json(err);
	}

	await User.findById(decoded.id)
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
