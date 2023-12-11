// import packages
import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
	name: Schema.Types.String;
	ownerId: Schema.Types.ObjectId;
	currency: Schema.Types.String;
	category: Schema.Types.String;
	description: Schema.Types.String;
	brand: Schema.Types.String;
	price: Schema.Types.Number;
	stock: Schema.Types.Number;
	imagesId: [Schema.Types.ObjectId];

	// optional or not a user input fields
	rating: { type: Schema.Types.Number; default: 0 };
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

export default model("Product", ProductSchema);
