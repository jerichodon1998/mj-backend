// imports
import jwt from "jsonwebtoken";

import User from "../models/User";
import { NextFunction, Request, Response } from "express";

// Search for more cleaner way to implement this interface and other interfaces
export interface IJWTUserData {
	email: string;
	id: string;
}

export const verifyAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// this get token code for frontend
	const accessToken = req.cookies?.Bearer;

	const decodedJwt = jwt.decode(accessToken) as IJWTUserData;

	await User.findById(decodedJwt.id).then((response) => {
		if (response?.role?.includes("admin")) {
			next();
		} else {
			return res.status(401).json("sure ba Unauthorized access");
		}
	});
};
