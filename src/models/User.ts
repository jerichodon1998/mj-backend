// import packages
import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
	firstname: Schema.Types.String;
	lastname: Schema.Types.String;
	password: Schema.Types.String;
	email: Schema.Types.String;
	username: Schema.Types.String;
	phoneNumber?: Schema.Types.String;
	address?: Schema.Types.String;
	profilePictureId?: Schema.Types.ObjectId;
	role: [Schema.Types.String];
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

export default model("User", UserSchema);
