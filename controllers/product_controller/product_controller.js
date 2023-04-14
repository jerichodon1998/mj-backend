// imports
const mongoose = require("mongoose");

// my exports
const Product = require("../../models/Product");
const isValidObjectId = require("../../helper/isValidObjectId");

const getProductsController = async (req, res) => {
	const page = req.query.page || 1;
	const productPerPage = 30;

	await Product.find({})
		.skip((page - 1) * productPerPage)
		.limit(productPerPage)
		.then(async (data) => {
			const count = await Product.countDocuments({});

			const pages = Math.ceil(count / productPerPage);
			return res.status(200).json({ products: data, pages: pages, items: data.length });
		})
		.catch((error) => res.status(500).json("Internal server error"));
};
const getProductController = async (req, res) => {
	const { id } = req.params;
	isValidObjectId(id, res);
	const product = await Product.findById(id);

	if (product) {
		return res.status(200).json(product);
	}
	return res.status(404).json("Product not found");
};

const createProduct = async (req, res) => {
	const { name, ownerId, currency, category, description, price, stock, brand } = req.body;
	const imagesId = req.files?.map((image) => image.id) || null;
	// check if all fields has values
	if (
		(!name || !ownerId || !currency || !category || !description || !price || !stock,
		!imagesId,
		!brand)
	) {
		return res.status(400).json("Provide input in all fields");
	}

	Product.create({
		name,
		ownerId,
		currency,
		category,
		description,
		price,
		stock,
		imagesId,
		brand,
	})
		.then((response) => {
			return res.status(201).json("Product created");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

const productUpdateController = async (req, res) => {
	const { name, currency, category, description, price, stock, brand } = req.body;
	const { id } = req.params;
	const updates = {};
	if (name) {
		updates.name = name;
	}
	if (currency) {
		updates.currency = currency;
	}
	if (category) {
		updates.category = category;
	}
	if (brand) {
		updates.brand = brand;
	}
	if (description) {
		updates.description = description;
	}
	if (price) {
		updates.price = price;
	}
	if (stock) {
		updates.stock = stock;
	}

	Product.findByIdAndUpdate(id, updates)
		.then((response) => {
			return res.status(200).json("Product updated");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

const productDeleteController = async (req, res) => {
	const { id } = req.params;

	isValidObjectId(id, res);

	Product.findByIdAndDelete(id)
		.then((response) => {
			return res.status(200).json("Deleted successfully");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

module.exports = {
	getProductsController,
	getProductController,
	createProduct,
	productUpdateController,
	productDeleteController,
};
