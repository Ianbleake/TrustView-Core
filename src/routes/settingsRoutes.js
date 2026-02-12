import { Router } from "express"

const router = Router()

router.get("/",(req, res) => {
  res.json({ message: "app settings working" })
})

export default router