import express from "express";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { createOrder, getMyOrders } from "../controller/order.controller.js";

const router = express.Router();

router.post("/", protectedAuth, createOrder);
router.get("/", protectedAuth, getMyOrders);

export default router;
