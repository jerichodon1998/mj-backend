import { Request, RequestHandler, Response } from "express";

export const signoutController: RequestHandler = async (
	req: Request,
	res: Response
) => {
	// jwt token should be revoked

	res.cookie("Bearer", "", {
		httpOnly: true,
		sameSite: "none",
		secure: true,
		maxAge: 0,
	});

	return res.status(200).json("Logged out");
};
