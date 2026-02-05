import { createReviewService } from "../services/reviewsService.js";
import { logger } from "../utils/logger.js";

export async function createReview(req, res, next) {
  try {
    await createReviewService(req.body);
    logger.info("Review created", {
      store_id: req.body.store_id,
      product_id: req.body.product_id,
    });
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}
