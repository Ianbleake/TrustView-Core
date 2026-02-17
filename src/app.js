import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: [
    "https://trustview.noctis.lat",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));


app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

app.get("/", (_req, res) => {
  res.send("TrustView backend vivo");
});

app.use(`/api/${process.env.API_VERSION}`, routes);

app.use(errorHandler);

export default app;
