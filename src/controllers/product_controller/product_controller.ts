// my exports
import Product from "../../models/Product";
import { isValidObjectId } from "../../helper/isValidObjectId";
import { Request, RequestHandler, Response } from "express";

export interface ICreateProductReqBody {
	name?: string;
	ownerId?: string;
	currency?: string;
	category?: string;
	description?: string;
	price?: string;
	stock?: string;
	brand?: string;
}

export interface IProductUpdate {
	name?: string;
	currency?: string;
	brand?: string;
	category?: string;
	description?: string;
	price?: number;
	stock?: number;
}

export const getProductsController: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const pageStringNum: string | undefined = req.query.page as
		| string
		| undefined;
	const page: number = parseInt(pageStringNum) || 1;
	const productPerPage = 28;

	await Product.find({})
		.skip((page - 1) * productPerPage)
		.limit(productPerPage)
		.then(async (data) => {
			const count = await Product.countDocuments({});

			const pages = Math.ceil(count / productPerPage);
			return res
				.status(200)
				.json({ products: data, pages: pages, items: data.length });
		})
		.catch((error) => res.status(500).json("Internal server error"));
};
export const getProductController = async (req, res) => {
	const { id } = req.params;
	isValidObjectId(id, res);
	const product = await Product.findById(id);

	if (product) {
		return res.status(200).json(product);
	}
	return res.status(404).json("Product not found");
};

export const createProduct: RequestHandler = async (
	req: Request<{}, {}, ICreateProductReqBody>,
	res: Response
) => {
	const {
		name,
		ownerId,
		currency,
		category,
		description,
		price,
		stock,
		brand,
	} = req.body;
	const uploadedImages = req.files as Express.Multer.File[];
	const imagesId = uploadedImages?.map((image) => image.id) || null;
	// check if all fields has values
	if (
		!name ||
		!ownerId ||
		!currency ||
		!category ||
		!description ||
		!price ||
		!stock ||
		!imagesId ||
		!brand
	) {
		return res.status(400).json("Provide input in all fields");
	}

	await Product.create({
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

export const productUpdateController = async (req, res) => {
	const { name, currency, category, description, price, stock, brand } =
		req.body;
	const { id } = req.params;
	const updates: IProductUpdate = {};
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

	await Product.findByIdAndUpdate(id, updates)
		.then((response) => {
			return res.status(200).json("Product updated");
		})
		.catch((err) => {
			return res.status(500).json("Internal server error");
		});
};

export const productDeleteController = async (req, res) => {
	const { id } = req.params;

	isValidObjectId(id, res);

	Product.findByIdAndDelete(id)
		.then((response) => {
			return res.status(200).json("Deleted successfully");
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json("Internal server error");
		});
};
