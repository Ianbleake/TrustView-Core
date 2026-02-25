import { Router } from "express"
import { getLastReviews, getProductRating, getProductReviews, getWidgetConfig } from "../controllers/widgetController.js";

const router = Router();

router.post("/lastreviews",
  getLastReviews
);

router.post("/prroduct/rating",
  getProductRating
);

router.post("/product/reviews",
  getProductReviews
);

router.post("/config",
  getWidgetConfig
);

export default router