import app from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 3000;
const SCOPE = process.env.NODE_ENV;

const server = app.listen(PORT, "0.0.0.0", () => {
  const { port } = server.address();

  if (SCOPE === "development") {
    logger.info(`🚀 TrustView backend corriendo en http://localhost:${port}`);
  } else {
    logger.info(`🚀 TrustView backend iniciado`);
  }
});
