import { Response } from "express";

// imports
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

export const isValidObjectId = (id: string, res: Response) => {
	if (!ObjectId.isValid(id)) {
		return res.status(404).json("Not valid ID");
	}
};
