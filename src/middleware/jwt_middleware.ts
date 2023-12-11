// imports
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenKey = process.env.ACCESS_TOKEN_KEY || "accesstokenkey";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
