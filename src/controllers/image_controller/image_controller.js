// imports
const mongoose = require("mongoose");
const { gfs } = require("../../configurations/files_config");
const { conn } = require("../../configurations/db_config");

// my imports

const ObjectId = mongoose.Types.ObjectId;

const getImageController = async (req, res) => {
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

const deleteImageController = async (req, res) => {
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

module.exports = { getImageController, deleteImageController };
