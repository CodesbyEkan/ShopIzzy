import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const checkEmail = await User.findOne({ where: { email } });

  if (checkEmail) {
    return res.status(404).json({
      status: false,
      message: "Email has been used",
      data: [],
    });
  }

  const hashed_pass = bcrypt.hashSync(password, 10);

  const user = await User.create({ email, name, password: hashed_pass });

  if (!user) {
    return res.status(400).json({
      status: false,
      message: "Could not create the user",
      data: [],
    });
  }

  return res.status(201).json({
    status: true,
    message: "user created successfully",
    data: user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ status: false, message: "User not found" });
  }

  const isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid email or password!" });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  payload.token = token;

  res.json({
    status: true,
    message: "User successfully logged in.",
    userToken: payload,
  });
};
