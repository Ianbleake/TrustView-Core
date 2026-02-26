import { logger } from "../utils/logger.js";
import { successResponse } from "../utils/response.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";
import { createReviewService, approveReviewService, getLastReviewsService, rejectReviewService, getReviewsService, deleteReviewService, importReviewsService } from "../services/reviewsService.js";


export async function getReviews(req, res, next) {
  try {

    const { storeId } = req.params;

    const reviews = await getReviewsService(storeId);

    const formattedReviews = reviews.map((review) => reviewResponseFormat(review));

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

    const formattedReviews = reviews.map((review) => reviewResponseFormat(review));

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

    const formattedReview = reviewResponseFormat(review);

    successResponse(res, {
      status: 201,
      data: formattedReview,
    });
  } catch (error) {
    next(error);
  }
}

export async function approveReview(req, res, next) {
  try {

    const { review_id } = req.body;

    const review = await approveReviewService(review_id);

    const formattedReview = reviewResponseFormat(review);

    logger.info("Review Updated", {
      review_id: review.id,
      status: review.approved,
    });

    successResponse(res, {
      status: 200,
      data: formattedReview,
    });

  } catch (error) {
    next(error);
  }
}

export async function rejectReview(req, res, next) {
  try {

    const { review_id } = req.body;

    const review = await rejectReviewService(review_id);

    const formattedReview = reviewResponseFormat(review);

    logger.info("Review Updated", {
      review_id: review.id,
      status: review.approved,
    });

    successResponse(res, {
      status: 200,
      data: formattedReview,
    });

  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req, res, next) {
  try {

    const { reviewId } = req.params;

    const removedReview = await deleteReviewService(reviewId);

    logger.info("Review Deleted", {
      review_id: removedReview.id,
    });

    successResponse(res, {
      status: 200,
      data: {
        id: removedReview.id,
      },
    });

  }catch (error){
    next(error);
  }
}

export async function importReviews(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Archivo requerido",
      });
    }

    const { store_id } = req.body;

    if (!store_id) {
      return res.status(400).json({
        message: "store_id requerido",
      });
    }

    const result = await importReviewsService({
      fileBuffer: req.file.buffer,
      store_id,
    });

    successResponse(res, {
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

