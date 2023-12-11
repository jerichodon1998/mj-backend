// my imports
const { gfs } = require("../../configurations/files_config");
const isValidObjectId = require("../../helper/isValidObjectId");
const User = require("../../models/User");

const getProfileController = async (req, res) => {
	const { uid } = req.params;
	isValidObjectId(uid, res);
	const user = await User.findById(uid)
		.select("-password")
		.then((user) => {
			if (!user) {
				return res.status(404).json("User not found");
			}
			return res.status(200).json(user);
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

const updateProfileController = async (req, res) => {
	const { uid } = req.params;
	const { firstname, lastname, role, email, phoneNumber, address } = req.body;

	const userExist = await User.findById(uid);

	if (!userExist) {
		return res.status(404).json("User not found");
	}

	const updates = {};
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
		.then((docs) => {
			return res.status(200).json("Profile updated successfully");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

module.exports = { updateProfileController, getProfileController };
