import { Product } from "../models/index.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.create({ name, price, stock });
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
