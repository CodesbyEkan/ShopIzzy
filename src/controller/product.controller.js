import { Product } from "../models/index.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const [item, product] = await Product.findOrCreate({
      where: { name: req.body.name },
      defaults: { name, price, stock },
    });
    if (!product) {
      return res.status(400).json({
        status: false,
        message: "Duplicate names not allowed.",
      });
    }
    console.log(item);
    res.status(200).json({ status: true, product });
  } catch (err) {
    console.error("Error creating product.", err.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ status: true, products });
  } catch (err) {
    console.error("Error getting all  products", err.message);
  }
};
