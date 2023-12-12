// import packages
import mongoose, { Document, Schema, model } from "mongoose";

export interface ICartItem extends Document {
	cartId: mongoose.Types.ObjectId;
	productItemId: mongoose.Types.ObjectId;
	quantity: number;
}

const CartItemSchema = new Schema<ICartItem>(
	{
		cartId: { type: mongoose.Schema.Types.ObjectId, required: true },
		productItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
		quantity: { type: mongoose.Schema.Types.Number, required: true },
	},
	{ timestamps: true }
);

export default model<ICartItem>("CartItem", CartItemSchema);
