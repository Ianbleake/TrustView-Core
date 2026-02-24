import { Router } from "express"
import { updateAvatar, updateBanner } from "../controllers/profileController.js";


const router = Router();

router.post("/updateAvatar",
  updateAvatar
)

router.post("/updateBanner",
  updateBanner
)

export default router