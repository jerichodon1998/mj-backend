import { Request, RequestHandler, Response } from "express";
import { Schema } from "mongoose";
import { IUser } from "../../models/User";

// my imports
import { gfs } from "../../configurations/files_config";
import { isValidObjectId } from "../../helper/isValidObjectId";
import User from "../../models/User";

export interface IUpdates {
	firstname?: string;
	lastname?: string;
	role?: [string];
	email?: string;
	phoneNumber?: string;
	address?: string;
	profilePictureId?: Schema.Types.ObjectId;
}

export const getProfileController: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { uid } = req.params;
	isValidObjectId(uid, res);
	await User.findById(uid)
		.select("-password")
		.then((user: IUser) => {
			if (!user) {
				return res.status(404).json("User not found");
			}
			return res.status(200).json(user);
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

export const updateProfileController: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { uid } = req.params;
	const { firstname, lastname, role, email, phoneNumber, address } = req.body;

	const userExist: IUser = await User.findById(uid);

	if (!userExist) {
		return res.status(404).json("User not found");
	}

	const updates: IUpdates = {};
	if (firstname) {
		updates.firstname = firstname;
	}
	if (lastname) {
		updates.lastname = lastname;
	}
	if (role) {
		updates.role = role;
	}
	if (email) {
		updates.email = email;
	}

	if (phoneNumber) {
		updates.phoneNumber = phoneNumber;
	}

	if (address) {
		updates.address = address;
	}

	if (req.files[0]) {
		await User.findById(uid).then((docs) => {
			if (docs.profilePictureId) gfs.GFS.delete(docs.profilePictureId);
		});
		updates.profilePictureId = req.files[0].id;
	}

	await User.findByIdAndUpdate(uid, updates)
		.select("-password")
		.then((doc: IUser) => {
			return res.status(200).json("Profile updated successfully");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};
