# Transaction Validation API

A robust RESTful API for validating financial transactions with built-in fraud prevention, balance checking, and comprehensive documentation.

## 🚀 Features

- **Transaction Validation**: Validate financial transactions with balance checking
- **Fraud Prevention**: Rate limiting to prevent suspicious activity
- **Balance Management**: Automatic balance updates for approved transactions
- **Comprehensive Documentation**: Interactive Swagger UI documentation
- **Error Handling**: Error responses with validation messages
- **Logging**: Structured logging with Winston
- **Input Validation**: Request validation using express-validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd transaction-validation-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Swagger UI

Interactive API documentation is available at: `http://localhost:3000/api-docs`

### Base URL

```
http://localhost:3000/api/v1
```

## 🔗 Endpoints

### POST /transactions/validate-transaction

Validates a financial transaction by checking sender balance and performing fraud prevention checks.

#### Request Body

```json
{
  "transaction_id": "txn_123456789",
  "sender_id": "account_sender_123",
  "receiver_id": "account_receiver_456",
  "amount": 100,
  "currency": "EGP"
}
```

#### Request Parameters

| Field            | Type    | Required | Description                               | Example                  |
| ---------------- | ------- | -------- | ----------------------------------------- | ------------------------ |
| `transaction_id` | string  | Yes      | Unique identifier for the transaction     | `"txn_123456789"`        |
| `sender_id`      | string  | Yes      | Unique identifier of the sender account   | `"account_sender_123"`   |
| `receiver_id`    | string  | Yes      | Unique identifier of the receiver account | `"account_receiver_456"` |
| `amount`         | integer | Yes      | Transaction amount (must be positive)     | `100`                    |
| `currency`       | string  | Yes      | Currency code (USD, EUR, EGP)             | `"USD"`                  |

#### Response Examples

**✅ Successful Transaction (200)**

```json
{
  "status": "approved",
  "transaction_id": "txn_123456789"
}
```

**❌ Insufficient Funds (400)**

```json
{
  "status": "rejected",
  "transaction_id": "txn_987654321",
  "reason": "insufficient_funds"
}
```

**❌ Sender Not Found (400)**

```json
{
  "status": "rejected",
  "transaction_id": "txn_987654321",
  "reason": "sender_not_found"
}
```

**❌ Validation Error (400)**

```json
{
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be a positive number"
    }
  ]
}
```

**❌ Rate Limit Exceeded (429)**

```json
{
  "status": "rejected",
  "transaction_id": "txn_987654321",
  "reason": "velocity_limit_exceeded"
}
```

## 🏗️ Project Structure

```
transaction-validation-api/
├── config/
│   └── swagger.js          # Swagger configuration
├── logs/
│   ├── combined.log        # Combined logs
│   └── error.log           # Error logs
├── middlewares/
│   ├── error-middleware.js # Error handling middleware
│   ├── rate-limit-middleware.js # Rate limiting middleware
│   └── validator-middleware.js  # Validation middleware
├── routes/
│   └── transaction-route.js # Transaction routes
├── services/
│   └── transaction-service.js # Transaction business logic
├── utils/
│   ├── api-error.js        # Custom error classes
│   └── logger.js           # Logger configuration
├── validators/
│   └── transaction-validator.js # Request validation rules
├── server.js               # Main server file
└── package.json            # Dependencies and scripts
```

## 📊 Logging

The API uses Winston for structured logging:

- **Info Logs**: Transaction processing and approvals
- **Warn Logs**: Validation failures and insufficient funds
- **Error Logs**: System errors and exceptions

Logs are stored in:

- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only
