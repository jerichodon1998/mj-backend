"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import packages
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.String, required: true },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    currency: { type: mongoose_1.Schema.Types.String, required: true },
    category: { type: mongoose_1.Schema.Types.String, required: true },
    description: { type: mongoose_1.Schema.Types.String, required: true },
    brand: { type: mongoose_1.Schema.Types.String, required: true },
    price: { type: mongoose_1.Schema.Types.Number, required: true },
    stock: { type: mongoose_1.Schema.Types.Number, required: true },
    imagesId: { type: [mongoose_1.Schema.Types.ObjectId], required: true },
    // optional or not a user input fields
    rating: { type: mongoose_1.Schema.Types.Number, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
