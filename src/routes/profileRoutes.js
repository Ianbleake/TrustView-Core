import { Router } from "express"
import { updateAvatar, updateBanner, updateInfo } from "../controllers/profileController.js";


const router = Router();

router.post("/updateAvatar",
  updateAvatar
)

router.post("/updateBanner",
  updateBanner
)

router.post("/updateInfo",
  updateInfo
)

export default router