import express from "express";
import {
  createProduct,
  getProducts,
} from "../controller/product.controller.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { productValidator } from "../middleware/validators.js";

const router = express.Router();

router.post("/", productValidator, protectedAuth, createProduct);
router.get("/", protectedAuth, getProducts);

export default router;
