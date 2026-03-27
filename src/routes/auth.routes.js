import express from "express";
import { createUser, login } from "../controller/auth.controller.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { authValidator } from "../middleware/validators.js";

const router = express.Router();

router.post("/register", authValidator, createUser);
router.post("/login", login);

export default router;
