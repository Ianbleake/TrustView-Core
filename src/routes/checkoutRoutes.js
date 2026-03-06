import { Router } from "express";
import { createCheckoutSession, getCheckoutSessionStatus } from "../controllers/checkoutController.js";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);

router.get("/session-status", getCheckoutSessionStatus);

export default router;