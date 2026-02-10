import { Router } from "express";
import { completeOnboarding } from "../controllers/onboardingController.js";

const router = Router();

/**
 * POST /onboarding/complete
 * Completa el onboarding:
 * - crea auth user
 * - crea profile
 * - activa store
 */

router.post("/complete", completeOnboarding);

export default router;
