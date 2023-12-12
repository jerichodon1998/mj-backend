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
exports.getCartItemController = void 0;
const isValidObjectId_1 = require("../../helper/isValidObjectId");
const CartItem_1 = __importDefault(require("../../models/CartItem"));
const getCartItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isValidObjectId_1.isValidObjectId)(id, res);
    yield CartItem_1.default.findById(id)
        .then((response) => {
        if (!response) {
            return res.status(404).json("Nothing found");
        }
        return res.status(200).json(response);
    })
        .catch((error) => {
        return res.status(500).json("Internal Server error");
    });
});
exports.getCartItemController = getCartItemController;
