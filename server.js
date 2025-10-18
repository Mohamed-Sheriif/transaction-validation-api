import express from "express";

import errorMiddleware from "./middlewares/error-middleware.js";
import transactionRoutes from "./routes/transaction-route.js";
import logger from "./utils/logger.js";

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use("/api/v1/transactions", transactionRoutes);

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
