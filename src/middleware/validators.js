import { body } from "express-validator";

export const authValidator = [
  body("name").escape().trim().notEmpty().withMessage("Name can't be empty"),
  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid!"),
  body("password").escape().isLength({ min: 5, max: 25 }),
];

export const productValidator = [];
