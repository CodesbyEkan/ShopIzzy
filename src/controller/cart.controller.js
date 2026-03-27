import { Cart } from "../models/index.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const item = await Cart.create({
      UserId: req.user.id,
      ProductId: productId,
      quantity,
    });

    res
      .status(200)
      .json({ status: true, message: "Product added to cart.", item });
  } catch (err) {
    console.error("Error adding product to cart.", err.message);
  }
};
