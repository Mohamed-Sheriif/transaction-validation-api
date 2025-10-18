import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";

// Limits each IP to 3 transactions per 2-minute window
const fraudPreventionRateLimit = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3, // 3 requests per windowMs
  message: (req) => {
    const transaction_id = req.body?.transaction_id || "unknown";

    logger.warn(`Rate limit exceeded`, {
      transaction_id,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      url: req.url,
      method: req.method,
    });

    return {
      status: "rejected",
      transaction_id,
      reason: "velocity_limit_exceeded",
    };
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default fraudPreventionRateLimit;
