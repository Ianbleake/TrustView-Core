import { createReviewService } from "../services/reviewsService.js";
import { logger } from "../utils/logger.js";
import { successResponse } from "../utils/response.js";

export async function createReview(req, res, next) {
  try {
    const review = await createReviewService(req.body);

    logger.info("Review created", {
      review_id: review.id,
      store_id: req.body.store_id,
      product_id: req.body.product_id,
    });

    successResponse(res, {
      status: 201,
      data: review,
    });
  } catch (error) {
    next(error);
  }
}

