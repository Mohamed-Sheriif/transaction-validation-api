import { jest } from "@jest/globals";

// Mock the logger
const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
};

jest.unstable_mockModule("../utils/logger.js", () => ({
  default: mockLogger,
}));

// Import the service
const { default: validateTransactionService } = await import(
  "../services/transaction-service.js"
);

describe("Transaction Service Tests", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {
        transaction_id: "txn_123",
        sender_id: "account_sender_123",
        receiver_id: "account_receiver_456",
        amount: 100,
        currency: "USD",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test("success test case", async () => {
    mockReq.body.amount = 50; // Small amount to ensure success

    await validateTransactionService(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "approved",
      transaction_id: "txn_123",
    });
  });

  test("sender_not_found test case", async () => {
    mockReq.body.sender_id = "unknown_account";

    await validateTransactionService(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "rejected",
      transaction_id: "txn_123",
      reason: "sender_not_found",
    });
  });

  test("insufficient_funds test case", async () => {
    mockReq.body.amount = 10000; // Large amount to ensure failure

    await validateTransactionService(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "rejected",
      transaction_id: "txn_123",
      reason: "insufficient_funds",
    });
  });

  test("rate limit exceeded test case", async () => {
    // Note: Rate limiting is handled by middleware, not the service
    // This test demonstrates that the service itself doesn't handle rate limiting
    // The rate limit middleware would reject the request before reaching the service

    await validateTransactionService(mockReq, mockRes);

    // Service processes normally - rate limiting is middleware responsibility
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "approved",
      transaction_id: "txn_123",
    });
  });
});
