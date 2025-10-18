import express from "express";
import swaggerUi from "swagger-ui-express";

import errorMiddleware from "./middlewares/error-middleware.js";
import transactionRoutes from "./routes/transaction-route.js";
import logger from "./utils/logger.js";
import swaggerSpec from "./config/swagger.js";

const app = express();
const port = 3000;

// Middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// Routes
app.use("/api/v1/transactions", transactionRoutes);

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
