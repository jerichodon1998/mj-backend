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
exports.removeFromCartController = exports.deleteCartController = exports.addToCartController = exports.createCartController = exports.checkOutCartController = exports.getCartShippedController = exports.getCartController = void 0;
// my exports
const isValidObjectId_1 = require("../../helper/isValidObjectId");
const Cart_1 = __importDefault(require("../../models/Cart"));
const CartItem_1 = __importDefault(require("../../models/CartItem"));
const User_1 = __importDefault(require("../../models/User"));
const Product_1 = __importDefault(require("../../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const getCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    Cart_1.default.findOne({ cartOwnerId: uid, isCheckout: false })
        .then((response) => {
        if (!response) {
            return res.status(404).json("No cart found");
        }
        return res.status(200).json(response);
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.getCartController = getCartController;
const getCartShippedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    Cart_1.default.find({ cartOwnerId: uid, isCheckout: true })
        .then((response) => {
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(404).json("No carts shipped");
    })
        .catch((err) => {
        return res.status(500).json("Internal server error");
    });
});
exports.getCartShippedController = getCartShippedController;
const checkOutCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    yield User_1.default.findById(uid)
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user.address) {
            return res
                .status(400)
                .json("No address found, update your address in your profile");
        }
        const foundCart = yield Cart_1.default.findOne({
            cartOwnerId: uid,
            isCheckout: false,
        });
        for (const cartItemId of foundCart.cartItemsId) {
            const cartItem = yield CartItem_1.default.findById(cartItemId);
            if (!cartItem) {
                return res.status(404).json("Cart Item Not Found");
            }
            const productItem = (yield Product_1.default.findById(cartItem.productItemId)).toObject();
            if (!productItem) {
                return res.status(404).json("Product Item Not Found");
            }
            if (cartItem.quantity > productItem.stock) {
                return res
                    .status(406)
                    .json(`Insufficient stock available ${productItem.name}`);
            }
            yield Product_1.default.findByIdAndUpdate(cartItem.productItemId, {
                stock: productItem.stock - cartItem.quantity,
            });
        }
        yield Cart_1.default.findOneAndUpdate({ cartOwnerId: uid, isCheckout: false }, { isCheckout: true })
            .then((response) => {
            if (response) {
                return res.status(200).json("Cart Checked Out");
            }
            return res.status(404).json("No Cart to Check Out");
        })
            .catch((err) => {
            return res.status(500).json("Internal server error");
        });
    }))
        .catch((error) => {
        return res.status(500).json("Internal Server Error");
    });
});
exports.checkOutCartController = checkOutCartController;
const createCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    Cart_1.default.create({ cartOwnerId: uid })
        .then((response) => {
        if (!response) {
            return res.status(500).json("Failed to create cart");
        }
        return res.status(200).json("Cart created");
    })
        .catch((err) => res.status(500).json("Internal server error"));
});
exports.createCartController = createCartController;
const addToCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    const { uid, productId } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    (0, isValidObjectId_1.isValidObjectId)(productId, res);
    if (!quantity) {
        return res.status(400).json("Quantity field is null or 0");
    }
    const foundCart = yield Cart_1.default.findOne({
        cartOwnerId: uid,
        isCheckout: false,
    });
    if (!foundCart) {
        return res.status(404).json("No cart found");
    }
    const product = yield Product_1.default.findById(productId);
    if (!product || product.stock <= 0 || quantity > product.stock) {
        return res.status(406).json("Insufficient stock available");
    }
    CartItem_1.default.create({
        cartId: foundCart.id,
        productItemId: productId,
        quantity: quantity,
    })
        .then((itemCreated) => __awaiter(void 0, void 0, void 0, function* () {
        if (!itemCreated) {
            return res.status(500).json("Failed to create Cart Item");
        }
        yield Cart_1.default.findByIdAndUpdate(foundCart.id, {
            cartItemsId: [...foundCart.cartItemsId, itemCreated.id],
        })
            .then((updatedCart) => {
            if (!updatedCart) {
                return res.status(500).json("Failed to add cart");
            }
            return res.status(200).json("Added to cart");
        })
            .catch((err) => res.status(500).json("Internal server error"));
    }))
        .catch((err) => res.status(500).json("Internal server error"));
});
exports.addToCartController = addToCartController;
const deleteCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    Cart_1.default.findOneAndDelete({ cartOwnerId: uid, isCheckout: false })
        .then((response) => {
        if (!response) {
            return res.status(404).json("No cart to be deleted");
        }
        return res.status(200).json("Cart deleted successfully");
    })
        .catch((err) => res.status(500).json("Internal server error"));
});
exports.deleteCartController = deleteCartController;
const removeFromCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, cartItemId } = req.params;
    const cartItemObjectId = new mongoose_1.default.Schema.Types.ObjectId(cartItemId);
    (0, isValidObjectId_1.isValidObjectId)(uid, res);
    (0, isValidObjectId_1.isValidObjectId)(cartItemId, res);
    const foundCart = yield Cart_1.default.findOne({
        cartOwnerId: uid,
        isCheckout: false,
    });
    if (!foundCart) {
        return res.status(400).json("No cart found");
    }
    Cart_1.default.findByIdAndUpdate(foundCart.id, {
        cartItemsId: [
            ...foundCart.cartItemsId.filter((itemId) => {
                if (itemId !== cartItemObjectId)
                    return itemId;
            }),
        ],
    })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        CartItem_1.default.findByIdAndDelete(cartItemId)
            .then((response) => {
            return res.status(200).json("Cart item removed");
        })
            .catch((err) => res.status(500).json("Internal server error"));
    }))
        .catch((err) => res.status(500).json("Internal server error"));
});
exports.removeFromCartController = removeFromCartController;
