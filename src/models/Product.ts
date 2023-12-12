// import packages
import mongoose, { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
	name: string;
	ownerId: mongoose.Types.ObjectId;
	currency: string;
	category: string;
	description: string;
	brand: string;
	price: number;
	stock: number;
	imagesId: [Schema.Types.ObjectId];

	// optional or not a user input fields
	rating: { type: number; default: 0 };
}

const ProductSchema = new Schema<IProduct>(
	{
		name: { type: mongoose.Schema.Types.String, required: true },
		ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
		currency: { type: mongoose.Schema.Types.String, required: true },
		category: { type: mongoose.Schema.Types.String, required: true },
		description: { type: mongoose.Schema.Types.String, required: true },
		brand: { type: mongoose.Schema.Types.String, required: true },
		price: { type: mongoose.Schema.Types.Number, required: true },
		stock: { type: mongoose.Schema.Types.Number, required: true },
		imagesId: { type: [mongoose.Schema.Types.ObjectId], required: true },

		// optional or not a user input fields
		rating: { type: mongoose.Schema.Types.Number, default: 0 },
	},
	{ timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
