"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import packages
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    cartOwnerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    cartItemsId: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    isCheckout: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Cart", CartSchema);
