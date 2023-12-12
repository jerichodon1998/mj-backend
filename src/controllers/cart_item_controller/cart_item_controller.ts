import { Request, RequestHandler, Response } from "express";
import { isValidObjectId } from "../../helper/isValidObjectId";
import CartItem from "../../models/CartItem";

export interface ICartItemReqParam {
	id: string;
}

export const getCartItemController: RequestHandler<ICartItemReqParam> = async (
	req: Request<ICartItemReqParam>,
	res: Response
) => {
	const { id } = req.params;
	isValidObjectId(id, res);

	await CartItem.findById(id)
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
