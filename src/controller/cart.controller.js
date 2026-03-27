import { Cart, Product } from "../models/index.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    const item = await Cart.create({
      UserId: req.user.id,
      ProductId: productId,
      quantity,
    });

    res.status(200).json({
      message: "Product added to cart",
      item,
      productPrice: product.price,
      total: product.price * quantity,
    });
  } catch (err) {
    console.error("Error creating cart.", err.message);
  }
};
