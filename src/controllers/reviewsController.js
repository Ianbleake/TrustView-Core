import { createReviewService, approveReviewService, getLastReviewsService, rejectReviewService, getReviewsService } from "../services/ReviewsService.js";
import { logger } from "../utils/logger.js";
import { successResponse } from "../utils/response.js";


export async function getReviews(req, res, next) {
  try {

    const {
      store_id,
    } = req.query;

    const reviews = await getReviewsService({ store_id });

    const formattedReviews = reviews.map((review) => {
      return {
        id: review.id,
        author: review.author_name,
        rating: review.rating,
        content: review.content,
        product: review.product_name,
        date: review.created_at,
        status: review.approved,

      }
    })

    successResponse(res, {
      data: formattedReviews,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLastReviews(req, res, next) {
  try {
    const { store_id, limit = 10 } = req.query;

    const reviews = await getLastReviewsService({
      store_id,
      limit: Number(limit),
    });

    successResponse(res, {
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
}

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

export async function approveReview(req, res, next) {
  try {
    const { review_id } = req.body;

    const review = await approveReviewService(review_id);

    successResponse(res, {
      data: review,
    });
  } catch (error) {
    next(error);
  }
}

export async function rejectReview(req, res, next) {
  try {
    const { review_id } = req.body;

    const review = await rejectReviewService(review_id);

    successResponse(res, {
      data: review,
    });
  } catch (error) {
    next(error);
  }
}

