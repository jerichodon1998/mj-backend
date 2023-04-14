// import packages
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		username: { type: String, unique: true, required: true },
		phoneNumber: { type: String },
		address: { type: String },
		profilePictureId: { type: mongoose.Types.ObjectId },
		role: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
