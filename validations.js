import { body } from "express-validator";

export const loginValidation = [
  body("email", "Neverni format pochti").isEmail(),
  body("password", "Minimum 5 simvolov").isLength({ min: 5 }),
];
export const registerValidation = [
  body("email", "Neverni format pochti").isEmail(),
  body("password", "Minimum 5 simvolov").isLength({ min: 5 }),
  body("fullName", "Ukajite imya").isLength({ min: 3 }),
  body("avatarUrl", "Ukajite ssilku").optional().isURL(),
];
export const postCreateValidation = [
  body("title", "Zagalovok stati").isLength({ min: 3 }).isString(),
  body("text", "Text stati").isLength({ min: 3 }).isString(),
  body("tags", "Neverni format").optional().isString(),
  body("imageUrl", "Nevernaya ssilka").optional().isString(),
];
