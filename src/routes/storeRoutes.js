import { Router } from "express"
import { updateWidget } from "../controllers/storeController.js";

const router = Router();

router.post("/updateWidget",
  updateWidget
)

export default router