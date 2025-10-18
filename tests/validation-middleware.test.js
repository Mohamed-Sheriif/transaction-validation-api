import { jest } from "@jest/globals";

// Mock express-validator before importing
const mockValidationResult = jest.fn();
jest.unstable_mockModule("express-validator", () => ({
  validationResult: mockValidationResult,
}));

// Import the validation middleware after mocking
const validatorMiddleware = await import(
  "../middlewares/validator-middleware.js"
);

describe("Validation Middleware Tests", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  test("should fail validation when sender_id is missing", async () => {
    mockReq.body = {
      transaction_id: "txn_123",
      receiver_id: "account_receiver_456",
      amount: 100,
      currency: "USD",
    };

    // Mock validationResult to return errors
    mockValidationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        {
          msg: "Sender ID is required",
          param: "sender_id",
          value: undefined,
        },
      ],
    });

    await validatorMiddleware.default(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        {
          msg: "Sender ID is required",
          param: "sender_id",
          value: undefined,
        },
      ],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should fail validation when amount is invalid", async () => {
    mockReq.body = {
      transaction_id: "txn_123",
      sender_id: "account_sender_123",
      receiver_id: "account_receiver_456",
      amount: -50, // Negative amount
      currency: "USD",
    };

    // Mock validationResult to return errors
    mockValidationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        {
          msg: "Amount must be a positive number",
          param: "amount",
          value: -50,
        },
      ],
    });

    await validatorMiddleware.default(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        {
          msg: "Amount must be a positive number",
          param: "amount",
          value: -50,
        },
      ],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
