import express from "express";

import { validateTransaction } from "../validators/transaction-validator.js";
import validateTransactionService from "../services/transaction-service.js";

const router = express.Router();

router.post(
  "/validate-transaction",
  validateTransaction,
  validateTransactionService
);

export default router;
