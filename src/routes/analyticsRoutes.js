import { Router } from "express"
import { storeAnalytics } from "../controllers/analyticsController.js"

const router = Router()

router.get("/:storeId",storeAnalytics);

router.get("/appAnalytics", (req, res) => {
  res.json({ message: "app analytics working" })
})

export default router
