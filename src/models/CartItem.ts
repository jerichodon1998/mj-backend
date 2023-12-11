// import packages
import { Document, Schema, model } from "mongoose";

export interface ICartItem extends Document {
	cartId: Schema.Types.ObjectId;
	productItemId: Schema.Types.ObjectId;
	quantity: Number;
}

const CartItemSchema = new Schema<ICartItem>(
	{
		cartId: { type: Schema.Types.ObjectId, required: true },
		productItemId: { type: Schema.Types.ObjectId, required: true },
		quantity: { type: Schema.Types.Number, required: true },
	},
	{ timestamps: true }
);

export default model<ICartItem>("CartItem", CartItemSchema);
