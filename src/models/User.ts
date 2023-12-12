// import packages
import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
	firstname: string;
	lastname: string;
	password: string;
	email: string;
	username: string;
	phoneNumber?: string;
	address?: string;
	profilePictureId?: Schema.Types.ObjectId;
	role: string[];
}

const UserSchema = new Schema<IUser>(
	{
		firstname: { type: Schema.Types.String, required: true },
		lastname: { type: Schema.Types.String, required: true },
		password: { type: Schema.Types.String, required: true },
		email: { type: Schema.Types.String, unique: true, required: true },
		username: { type: Schema.Types.String, unique: true, required: true },
		phoneNumber: { type: Schema.Types.String },
		address: { type: Schema.Types.String },
		profilePictureId: { type: Schema.Types.ObjectId },
		role: { type: [Schema.Types.String] },
	},
	{ timestamps: true }
);

export default model<IUser>("User", UserSchema);
