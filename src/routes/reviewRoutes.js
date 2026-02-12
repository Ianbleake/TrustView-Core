import { Router } from "express"
import { createReview, getLastReviews, approveReview, rejectReview, getReviews } from "../controllers/reviewsController.js"
import { validate } from "../validation/validate.js"
import { createReviewSchema } from "../validation/schemas/reviewsSchema.js"

const router = Router()

router.get("/", getReviews);


router.get(
  "/lastReviews",
  getLastReviews
);


router.post(
  "/newReview",
  validate(createReviewSchema),
  createReview
);

router.post(
  "/approveReview",
  approveReview
);


router.post(
  "/rejectReview",
  rejectReview
);


export default router
