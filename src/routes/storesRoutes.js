import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Stores endpoint working" })
})

router.delete("/removeStore", (req, res) => {
  res.json({ message: "Store removed (fake for now)" })
})

export default router
