import { Router } from "express"
import { createReview, getLastReviews, approveReview, rejectReview, getReviews, deleteReview, importReviews } from "../controllers/reviewsController.js"
import { validate } from "../validation/validate.js"
import { createReviewSchema } from "../validation/schemas/reviewsSchema.js"
import { upload } from "../middlewares/filesMiddleware.js"

const router = Router()

router.get(
  "/:storeId/last",
  getLastReviews
);

router.get("/:storeId", getReviews);

router.delete("/remove/:reviewId",deleteReview );

router.post(
  "/newReview",
  validate(createReviewSchema),
  createReview
);

router.post(
  "/importReviews",
  upload.single("file"),
  importReviews
)

router.post(
  "/approveReview",
  approveReview
);

router.post(
  "/rejectReview",
  rejectReview
);


export default router
