import express from "express";

import { validateTransaction } from "../validators/transaction-validator.js";
import validateTransactionService from "../services/transaction-service.js";
import fraudPreventionRateLimit from "../middlewares/rate-limit-middleware.js";

const router = express.Router();

router.post(
  "/validate-transaction",
  fraudPreventionRateLimit,
  validateTransaction,
  validateTransactionService
);

export default router;
