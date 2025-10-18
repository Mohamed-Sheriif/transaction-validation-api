import ApiError from "../utils/api-error.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
  // Log the error
  logger.error(`Error occurred`, {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorMiddleware;
