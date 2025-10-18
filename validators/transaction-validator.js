import { check } from "express-validator";
import validatorMiddleware from "../middlewares/validator-middleware.js";

export const validateTransaction = [
  check("transaction_id").notEmpty().withMessage("Transaction ID is required"),
  check("sender_id").notEmpty().withMessage("Sender ID is required"),
  check("receiver_id").notEmpty().withMessage("Receiver ID is required"),
  check("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isInt({ min: 0 })
    .withMessage("Amount must be a positive number"),
  check("currency")
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "EGP"])
    .withMessage("Invalid currency , must be USD, EUR or EGP"),
  validatorMiddleware,
];
