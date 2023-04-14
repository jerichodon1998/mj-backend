// imports
const mongoose = require("mongoose");
const { gfs } = require("../../configurations/files_config");

// my imports

const ObjectId = mongoose.Types.ObjectId;

const getImageController = async (req, res) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) {
		return res.status(400).json("ID not valid");
	}
	gfs.GFS.openDownloadStream(new ObjectId(id)).pipe(res);
};

const deleteImageController = async (req, res) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) {
		return res.status(400).json("ID not valid");
	}

	gfs.GFS.delete(new ObjectId(id));
	return res.status(200).json("Ok");
};

module.exports = { getImageController, deleteImageController };
