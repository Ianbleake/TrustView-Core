import "dotenv/config";
import express from "express";
import helmet from "helmet";
import oauthRoutes from "./routes/oauthRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

app.get("/", (_, res) => {
  res.send("TrustView backend vivo");
});

app.use("/oauth", oauthRoutes);
app.use("/reviews", reviewRoutes);

app.use(errorHandler);

export default app;
