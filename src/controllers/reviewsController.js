import { createReviewService } from "../services/reviewsService.js";

export async function createReview(req, res, next) {
  try {
    await createReviewService(req.body);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}
