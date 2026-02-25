import { Router } from "express"
import oauthRoutes from "./oauthRoutes.js"
import reviewRoutes from "./reviewRoutes.js"
import healthRoutes from "./healthRoutes.js"
import onboardingRoutes from "./onboardingRoutes.js"
import analyticsRoutes from "./analyticsRoutes.js"
import storesRoutes from "./storesRoutes.js"
import settingsRoutes from "./settingsRoutes.js"
import storeRoutes from "./storeRoutes.js"
import profileRoutes from "./profileRoutes.js"
import widgetRoutes from "./widgetRoutes.js"

const router = Router()

router.use(healthRoutes)                
router.use("/oauth", oauthRoutes);
router.use("/onboarding", onboardingRoutes);       
router.use("/reviews", reviewRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/settings", settingsRoutes);
router.use("/stores", storesRoutes);
router.use("/store",storeRoutes);
router.use("/profile",profileRoutes);
router.use("/widget",widgetRoutes);

export default router
