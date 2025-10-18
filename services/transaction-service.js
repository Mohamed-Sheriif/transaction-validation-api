import asyncHandler from "express-async-handler";
import logger from "../utils/logger.js";

// Mock database for balances
const balances = {
  account_sender_123: 500.0,
  account_receiver_456: 1200.5,
};

const validateTransactionService = asyncHandler(async (req, res) => {
  const { transaction_id, sender_id, receiver_id, amount, currency } = req.body;

  logger.info(`Transaction validation started`, {
    transaction_id,
    sender_id,
    receiver_id,
    amount,
    currency,
  });

  // Rule 2: Balance Check
  const senderBalance = balances[sender_id];
  if (senderBalance === undefined) {
    logger.warn(`Sender not found`, {
      transaction_id,
      sender_id,
    });
    return res.status(400).json({
      status: "rejected",
      transaction_id,
      reason: "sender_not_found",
    });
  }

  if (senderBalance < amount) {
    logger.warn(`Insufficient funds`, {
      transaction_id,
      sender_id,
      requested_amount: amount,
      available_balance: senderBalance,
    });
    return res.status(400).json({
      status: "rejected",
      transaction_id,
      reason: "insufficient_funds",
    });
  }

  // All validations passed - approve transaction
  // Update balance
  balances[sender_id] -= amount;
  balances[receiver_id] = (balances[receiver_id] || 0) + amount;

  logger.info(`Transaction approved`, {
    transaction_id,
    sender_id,
    receiver_id,
    amount,
    currency,
    new_sender_balance: balances[sender_id],
    new_receiver_balance: balances[receiver_id],
  });

  res.status(200).json({
    status: "approved",
    transaction_id,
  });
});

export default validateTransactionService;
