const isValidObjectId = require("../../helper/isValidObjectId");
const CartItem = require("../../models/CartItem");

const getCartItemController = async (req, res) => {
	const { id } = req.params;
	isValidObjectId(id, res);

	CartItem.findById(id)
		.then((response) => {
			if (!response) {
				return res.status(404).json("Nothing found");
			}

			return res.status(200).json(response);
		})
		.catch((error) => {
			return res.status(500).json("Internal Server error");
		});
};

module.exports = { getCartItemController };
