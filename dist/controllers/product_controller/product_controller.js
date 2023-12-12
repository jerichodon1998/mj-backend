"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDeleteController = exports.productUpdateController = exports.createProduct = exports.getProductController = exports.getProductsController = void 0;
// my exports
const Product_1 = __importDefault(require("../../models/Product"));
const isValidObjectId_1 = require("../../helper/isValidObjectId");
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageStringNum = req.query.page;
    const page = parseInt(pageStringNum) || 1;
    const productPerPage = 28;
    yield Product_1.default.find({})
        .skip((page - 1) * productPerPage)
        .limit(productPerPage)
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield Product_1.default.countDocuments({});
        const pages = Math.ceil(count / productPerPage);
        return res
            .status(200)
            .json({ products: data, pages: pages, items: data.length });
    }))
        .catch((error) => res.status(500).json("Internal server error"));
});
exports.getProductsController = getProductsController;
const getProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(id, res);
    const product = yield Product_1.default.findById(id);
    if (product) {
        return res.status(200).json(product);
    }
    return res.status(404).json("Product not found");
});
exports.getProductController = getProductController;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerId, currency, category, description, price, stock, brand, } = req.body;
    const uploadedImages = req.files;
    const imagesId = (uploadedImages === null || uploadedImages === void 0 ? void 0 : uploadedImages.map((image) => image.id)) || null;
    // check if all fields has values
    if (!name ||
        !ownerId ||
        !currency ||
        !category ||
        !description ||
        !price ||
        !stock ||
        !imagesId ||
        !brand) {
        return res.status(400).json("Provide input in all fields");
    }
    yield Product_1.default.create({
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
});
exports.createProduct = createProduct;
const productUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield Product_1.default.findByIdAndUpdate(id, updates)
        .then((response) => {
        return res.status(200).json("Product updated");
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.productUpdateController = productUpdateController;
const productDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(id, res);
    Product_1.default.findByIdAndDelete(id)
        .then((response) => {
        return res.status(200).json("Deleted successfully");
    })
        .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error");
    });
});
exports.productDeleteController = productDeleteController;
