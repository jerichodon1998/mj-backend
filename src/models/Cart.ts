// import packages
import mongoose, { Document, Schema, model } from "mongoose";

export interface ICart extends Document {
	cartOwnerId: mongoose.Types.ObjectId;
	cartItemsId: [mongoose.Types.ObjectId];
	isCheckout: boolean;
}

const CartSchema = new Schema<ICart>(
	{
		cartOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true },
		cartItemsId: { type: [mongoose.Schema.Types.ObjectId], default: [] },
		isCheckout: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default model<ICart>("Cart", CartSchema);
