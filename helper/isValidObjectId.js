// imports
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const isValidObjectId = (id, res) => {
	if (!ObjectId.isValid(id)) {
		return res.status(404).json("Not valid ID");
	}
};

module.exports = isValidObjectId;
