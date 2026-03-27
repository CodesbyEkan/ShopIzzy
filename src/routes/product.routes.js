import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";
import { protectedAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectedAuth, createProduct);
router.get("/", protectedAuth, getProducts);

export default router;
