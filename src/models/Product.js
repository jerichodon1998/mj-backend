// import packages
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		ownerId: { type: mongoose.Types.ObjectId, required: true },
		currency: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		brand: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		imagesId: { type: Array, required: true },

		// optional or not a user input fields
		rating: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
