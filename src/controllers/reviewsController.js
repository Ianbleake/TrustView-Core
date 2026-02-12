import { createReviewService, approveReviewService, getLastReviewsService, rejectReviewService, getReviewsService } from "../services/reviewsService.js";
import { logger } from "../utils/logger.js";
import { successResponse } from "../utils/response.js";


export async function getReviews(req, res, next) {
  try {

    const { storeId } = req.params;

    const reviews = await getReviewsService(storeId);

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      author: review.author_name,
      rating: review.rating,
      content: review.content,
      product: review.product_name,
      date: review.created_at,
      status: review.approved,
    }));

    successResponse(res, {
      data: formattedReviews,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLastReviews(req, res, next) {
  try {

    const limit = 6;

    const { storeId } = req.params;

    const reviews = await getLastReviewsService({
      storeId,
      limit: Number(limit),
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      author: review.author_name,
      rating: review.rating,
      content: review.content,
      product: review.product_name,
      date: review.created_at,
      status: review.approved,
    }));

    successResponse(res, {
      data: formattedReviews,
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

