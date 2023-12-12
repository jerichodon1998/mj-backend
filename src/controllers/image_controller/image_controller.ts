// imports
import mongoose from "mongoose";
import { gfs } from "../../configurations/files_config";
import { Request, RequestHandler, Response } from "express";

const ObjectId = mongoose.Types.ObjectId;

export interface IImageReqParam {
	id: string;
}

export const getImageController: RequestHandler<IImageReqParam> = async (
	req: Request<IImageReqParam, {}, {}>,
	res: Response
) => {
	const { id } = req.params;
	let elements = [];
	if (!ObjectId.isValid(id)) {
		return res.status(400).json("ID not valid");
	}
	const data = gfs.GFS.find({ _id: new ObjectId(id) });

	await data.forEach((element) => {
		elements.push(element);
	});
	// check if it exist
	if (elements.length > 0) {
		gfs.GFS.openDownloadStream(new ObjectId(id)).pipe(res);
	} else {
		return res.status(404).json("Dont exist");
	}
};

export const deleteImageController: RequestHandler<IImageReqParam> = async (
	req: Request<IImageReqParam, {}, {}>,
	res: Response
) => {
	const { id } = req.params;
	let elements = [];
	if (!ObjectId.isValid(id)) {
		return res.status(400).json("ID not valid");
	}

	const data = gfs.GFS.find({ _id: new ObjectId(id) });

	await data.forEach((element) => {
		elements.push(element);
	});
	// check if it exist
	if (elements.length > 0) {
		gfs.GFS.delete(new ObjectId(id));
		return res.status(200).json("Ok");
	}

	// else {
	// 	return res.status(404).json("Don't exist");
	// }
};
