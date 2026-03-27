import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { productValidator } from "../middleware/validators.js";

const router = express.Router();

router.post("/", protectedAuth, productValidator, createProduct);
router.get("/", protectedAuth, getProducts);

export default router;
