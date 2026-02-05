import { logger } from "../utils/logger.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  logger.error("Unhandled error", {
    path: req?.path,
    method: req?.method,
    message: error?.message,
  });

  res.status(500).json({
    error: error?.message || "Error interno",
  });
}
