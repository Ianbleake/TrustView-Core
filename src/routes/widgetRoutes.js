import { Router } from "express"
import { getLastReviews, getProductRating, getProductReviews, getWidgetConfig, newReview } from "../controllers/widgetController.js";

const router = Router();

router.post("/lastreviews",
  getLastReviews
);

router.post("/product/rating",
  getProductRating
);

router.post("/product/reviews",
  getProductReviews
);

router.post("/config",
  getWidgetConfig
);

router.post("/newReview",
  newReview
)

export default router
