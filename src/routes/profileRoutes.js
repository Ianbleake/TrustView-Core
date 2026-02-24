import { Router } from "express"
import { updateAvatar } from "../controllers/profileController.js";


const router = Router();

router.post("/updateAvatar",
  updateAvatar
)

export default router