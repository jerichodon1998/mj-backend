// import packages
import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
	firstname: string;
	lastname: string;
	password: string;
	email: string;
	username: string;
	phoneNumber?: string;
	address?: string;
	profilePictureId?: mongoose.Types.ObjectId;
	role: string[];
}

const UserSchema = new Schema<IUser>(
	{
		firstname: { type: mongoose.Schema.Types.String, required: true },
		lastname: { type: mongoose.Schema.Types.String, required: true },
		password: { type: mongoose.Schema.Types.String, required: true },
		email: { type: mongoose.Schema.Types.String, unique: true, required: true },
		username: {
			type: mongoose.Schema.Types.String,
			unique: true,
			required: true,
		},
		phoneNumber: { type: mongoose.Schema.Types.String },
		address: { type: mongoose.Schema.Types.String },
		profilePictureId: { type: mongoose.Schema.Types.ObjectId },
		role: { type: [mongoose.Schema.Types.String] },
	},
	{ timestamps: true }
);

export default model<IUser>("User", UserSchema);
