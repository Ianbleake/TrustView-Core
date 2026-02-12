import { Router } from "express"

const router = Router()

router.get("/storeAnalytics", (req, res) => {
  res.json({ message: "store analytics working" })
})

router.get("/appAnalytics", (req, res) => {
  res.json({ message: "app analytics working" })
})

export default router
