import { Router } from "express";
import { completeOnboarding } from "../controllers/onboardingController.js";

const router = Router();

router.post("/complete", completeOnboarding);

export default router;
