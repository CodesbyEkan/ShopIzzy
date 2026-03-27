import { Cart, Product } from "../models/index.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await Cart.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId,
      },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.json({
        message: "Cart updated",
        item: existingItem,
      });
    }

    const item = await Cart.create({
      UserId: req.user.id,
      ProductId: productId,
      quantity,
    });

    res.json({
      message: "Added to cart",
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

export const getCart = async (req, res) => {
  const items = await Cart.findAll({
    where: { UserId: req.user.id },
    include: Product,
  });

  res.json(items);
};
