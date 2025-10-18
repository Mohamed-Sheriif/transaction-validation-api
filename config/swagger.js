import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Validation API",
      version: "1.0.0",
      description: "API documentation for the Transaction Validation API",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        TransactionRequest: {
          type: "object",
          required: [
            "transaction_id",
            "sender_id",
            "receiver_id",
            "amount",
            "currency",
          ],
          properties: {
            transaction_id: {
              type: "string",
              description: "Unique identifier for the transaction",
              example: "txn_123456789",
            },
            sender_id: {
              type: "string",
              description: "Unique identifier of the sender account",
              example: "account_sender_123",
            },
            receiver_id: {
              type: "string",
              description: "Unique identifier of the receiver account",
              example: "account_receiver_456",
            },
            amount: {
              type: "integer",
              minimum: 0,
              description: "Transaction amount (must be a positive integer)",
              example: 100,
            },
            currency: {
              type: "string",
              enum: ["USD", "EUR", "EGP"],
              description: "Currency code for the transaction",
              example: "USD",
            },
          },
        },
        TransactionResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["approved", "rejected"],
              description: "Transaction validation status",
              example: "approved",
            },
            transaction_id: {
              type: "string",
              description: "Unique identifier for the transaction",
              example: "txn_123456789",
            },
            reason: {
              type: "string",
              enum: ["sender_not_found", "insufficient_funds"],
              description:
                "Reason for rejection (only present when status is rejected)",
              example: "insufficient_funds",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    description: "Field name that caused the error",
                  },
                  message: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        RateLimitError: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["rejected"],
              description: "Status of the rate limit error",
              example: "rejected",
            },
            transaction_id: {
              type: "string",
              description: "Unique identifier for the transaction",
              example: "txn_123456789",
            },
            reason: {
              type: "string",
              enum: ["velocity_limit_exceeded"],
              description: "Reason for the rate limit error",
              example: "velocity_limit_exceeded",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Transactions",
        description: "Transaction validation operations",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
