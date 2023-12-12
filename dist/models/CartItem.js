"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import packages
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    cartId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    productItemId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: mongoose_1.Schema.Types.Number, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("CartItem", CartItemSchema);
