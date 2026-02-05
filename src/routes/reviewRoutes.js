import { Router } from "express"
import { createReview } from "../controllers/reviewsController.js"
import { validate } from "../validation/validate.js"
import { createReviewSchema } from "../validation/schemas/reviewsSchema.js"

const router = Router()

router.post(
  "/",
  validate(createReviewSchema),
  createReview
)

export default router
