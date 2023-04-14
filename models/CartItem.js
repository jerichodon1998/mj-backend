// import packages
const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartItemSchema = new Schema(
	{
		cartId: { type: mongoose.Schema.Types.ObjectId, required: true },
		productItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);
