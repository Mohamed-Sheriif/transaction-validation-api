import express from "express";

import { validateTransaction } from "../validators/transaction-validator.js";
import validateTransactionService from "../services/transaction-service.js";
import fraudPreventionRateLimit from "../middlewares/rate-limit-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/transactions/validate-transaction:
 *   post:
 *     summary: Validate a financial transaction
 *     description: Validates a financial transaction by checking sender balance and performing fraud prevention checks
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionRequest'
 *           examples:
 *             validTransaction:
 *               summary: Valid transaction example
 *               value:
 *                 transaction_id: "txn_123456789"
 *                 sender_id: "account_sender_123"
 *                 receiver_id: "account_receiver_456"
 *                 amount: 100
 *                 currency: "USD"
 *             insufficientFunds:
 *               summary: Transaction with insufficient funds
 *               value:
 *                 transaction_id: "txn_987654321"
 *                 sender_id: "account_sender_123"
 *                 receiver_id: "account_receiver_456"
 *                 amount: 1000
 *                 currency: "USD"
 *     responses:
 *       200:
 *         description: Transaction validation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *             examples:
 *               approved:
 *                 summary: Transaction approved
 *                 value:
 *                   status: "approved"
 *                   transaction_id: "txn_123456789"
 *       400:
 *         description: Transaction validation failed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TransactionResponse'
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               rejected:
 *                 summary: Transaction rejected
 *                 value:
 *                   status: "rejected"
 *                   transaction_id: "txn_987654321"
 *                   reason: "insufficient_funds"
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   errors:
 *                     - field: "amount"
 *                       message: "Amount must be a positive number"
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitError'
 *             example:
 *               status: "rejected"
 *               transaction_id: "txn_987654321"
 *               reason: "velocity_limit_exceeded"
 */
router.post(
  "/validate-transaction",
  fraudPreventionRateLimit,
  validateTransaction,
  validateTransactionService
);

export default router;
