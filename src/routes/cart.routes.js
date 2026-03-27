import express from "express";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/", protectedAuth, addToCart);
router.get("/", protectedAuth, getCart);

export default router;
