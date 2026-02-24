import { Router } from "express";
import { updateSettingsNotifications } from "../controllers/settingsController.js";

const router = Router();

router.patch("/notifications", updateSettingsNotifications);

export default router;