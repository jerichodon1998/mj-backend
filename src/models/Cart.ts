// import packages
import { Document, Schema, model } from "mongoose";

export interface ICart extends Document {
	cartOwnerId: Schema.Types.ObjectId;
	cartItemsId: [Schema.Types.ObjectId];
	isCheckout: boolean;
}

const CartSchema = new Schema<ICart>(
	{
		cartOwnerId: { type: Schema.Types.ObjectId, required: true },
		cartItemsId: { type: [Schema.Types.ObjectId], default: [] },
		isCheckout: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default model("Cart", CartSchema);
