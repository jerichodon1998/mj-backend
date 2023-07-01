// imports
const mongoose = require("mongoose");

// my exports
const isValidObjectId = require("../../helper/isValidObjectId");
const Cart = require("../../models/Cart");
const CartItem = require("../../models/CartItem");
const User = require("../../models/User");
const Product = require("../../models/Product");

const getCartController = async (req, res) => {
	const { uid } = req.params;
	isValidObjectId(uid, res);

	Cart.findOne({ cartOwnerId: uid, isCheckout: false })
		.then((response) => {
			if (!response) {
				return res.status(404).json("No cart found");
			}

			return res.status(200).json(response);
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

const getCartShippedController = async (req, res) => {
	const { uid } = req.params;

	Cart.find({ cartOwnerId: uid, isCheckout: true })
		.then((response) => {
			if (response) {
				return res.status(200).json(response);
			}

			return res.status(404).json("No carts shipped");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

const checkOutCartController = async (req, res) => {
	const { uid } = req.params;

	await User.findById(uid)
		.then(async (user) => {
			if (!user.address) {
				return res
					.status(400)
					.json("No address found, update your address in your profile");
			}

			const foundCart = await Cart.findOne({
				cartOwnerId: uid,
				isCheckout: false,
			});
			for (const cartItemId of foundCart.cartItemsId) {
				const cartItem = await CartItem.findById(cartItemId);
				if (!cartItem) {
					return res.status(404).json("Cart Item Not Found");
				}

				const productItem = await Product.findById(cartItem.productItemId);
				if (!productItem) {
					return res.status(404).json("Product Item Not Found");
				}

				if (cartItem.quantity > productItem.stock) {
					return res
						.status(406)
						.json(`Insufficient stock available ${productItem.name}`);
				}

				await Product.findByIdAndUpdate(cartItem.productItemId, {
					stock: productItem.stock - cartItem.quantity,
				});
			}

			await Cart.findOneAndUpdate(
				{ cartOwnerId: uid, isCheckout: false },
				{ isCheckout: true }
			)
				.then((response) => {
					if (response) {
						return res.status(200).json("Cart Checked Out");
					}
					return res.status(404).json("No Cart to Check Out");
				})
				.catch((err) => {
					return res.status(500).json("Internal server error");
				});
		})
		.catch((error) => {
			return res.status(500).json("Internal Server Error");
		});
};

const createCartController = async (req, res) => {
	const { uid } = req.params;

	isValidObjectId(uid, res);

	Cart.create({ cartOwnerId: uid })
		.then((response) => {
			if (!response) {
				return res.status(500).json("Failed to create cart");
			}
			return res.status(200).json("Cart created");
		})
		.catch((err) => res.status(500).json("Internal server error"));
};

const addToCartController = async (req, res) => {
	const { quantity } = req.body;
	const { uid, productId } = req.params;
	isValidObjectId(uid, res);
	isValidObjectId(productId, res);

	if (!quantity) {
		return res.status(400).json("Quantity field is null or 0");
	}

	const foundCart = await Cart.findOne({
		cartOwnerId: uid,
		isCheckout: false,
	}).catch((err) => {
		return res.status(500).json("Internal server error");
	});

	if (!foundCart) {
		return res.status(404).json("No cart found");
	}

	const product = await Product.findById(productId);

	if (!product || product.stock <= 0 || quantity > product.stock) {
		return res.status(406).json("Insufficient stock available");
	}

	CartItem.create({
		cartId: foundCart.id,
		productItemId: productId,
		quantity: quantity,
	})
		.then(async (itemCreated) => {
			if (!itemCreated) {
				return res.status(500).json("Failed to create Cart Item");
			}

			await Cart.findByIdAndUpdate(foundCart.id, {
				cartItemsId: [...foundCart.cartItemsId, itemCreated.id],
			})
				.then((updatedCart) => {
					if (!updatedCart) {
						return res.status(500).json("Failed to add cart");
					}
					return res.status(200).json("Added to cart");
				})
				.catch((err) => res.status(500).json("Internal server error"));
		})
		.catch((err) => res.status(500).json("Internal server error"));
};

const deleteCartController = async (req, res) => {
	const { uid } = req.params;

	isValidObjectId(uid, res);

	Cart.findOneAndDelete({ cartOwnerId: uid, isCheckout: false })
		.then((response) => {
			if (!response) {
				return res.status(404).json("No cart to be deleted");
			}
			return res.status(200).json("Cart deleted successfully");
		})
		.catch((err) => res.status(500).json("Internal server error"));
};

const removeFromCartController = async (req, res) => {
	const { uid, cartItemId } = req.params;
	isValidObjectId(uid, res);
	isValidObjectId(cartItemId, res);

	const foundCart = await Cart.findOne({
		cartOwnerId: uid,
		isCheckout: false,
	}).catch((err) => {
		return res.status(500).json("Internal server error");
	});

	if (!foundCart) {
		return res.status(400).json("No cart found");
	}

	Cart.findByIdAndUpdate(foundCart.id, {
		cartItemsId: [
			...foundCart.cartItemsId.filter((itemId) => {
				if (itemId !== cartItemId) return itemId;
			}),
		],
	})
		.then(async (response) => {
			CartItem.findByIdAndDelete(cartItemId)
				.then((response) => {
					return res.status(200).json("Cart item removed");
				})
				.catch((err) => res.status(500).json("Internal server error"));
		})
		.catch((err) => res.status(500).json("Internal server error"));
};

module.exports = {
	getCartController,
	getCartShippedController,
	createCartController,
	addToCartController,
	removeFromCartController,
	deleteCartController,
	checkOutCartController,
};
