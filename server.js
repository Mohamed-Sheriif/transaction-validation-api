import express from "express";

// imports
import logger from "./utils/logger.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
