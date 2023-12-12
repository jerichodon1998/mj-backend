// import packages
import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
	name: string;
	ownerId: Schema.Types.ObjectId;
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
		name: { type: Schema.Types.String, required: true },
		ownerId: { type: Schema.Types.ObjectId, required: true },
		currency: { type: Schema.Types.String, required: true },
		category: { type: Schema.Types.String, required: true },
		description: { type: Schema.Types.String, required: true },
		brand: { type: Schema.Types.String, required: true },
		price: { type: Schema.Types.Number, required: true },
		stock: { type: Schema.Types.Number, required: true },
		imagesId: { type: [Schema.Types.ObjectId], required: true },

		// optional or not a user input fields
		rating: { type: Schema.Types.Number, default: 0 },
	},
	{ timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
