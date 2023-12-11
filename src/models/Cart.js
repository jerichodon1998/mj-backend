// import packages
const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema(
	{
		cartOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true },
		cartItemsId: { type: Array, default: [] },
		isCheckout: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
