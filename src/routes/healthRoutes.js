import { Router } from "express";
import { logger } from "../utils/logger.js";

const router = Router();

router.get("/health", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/api/${process.env.API_VERSION}/`;

  const healthPayload = {
    status: "ok",
    service: "TrustView API",
    version: process.env.API_VERSION ?? "v1",
    environment: process.env.NODE_ENV ?? "development",
    baseUrl,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  logger.info("Health check", healthPayload);

  res.status(200).json(healthPayload);
});

export default router;
