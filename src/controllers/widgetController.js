import { successResponse } from "../utils/response.js";
import { productRatingReviews, productReviewsService, widgetConfig, widgetLastReviews } from "../services/widgetService.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";

export async function getLastReviews(req, res, next) {
  try {
    const { storeId:store_id } = req.body;

    const lastReviews = await widgetLastReviews(store_id);

    const formattedReviews = lastReviews.map((review) => reviewResponseFormat(review));

    successResponse(res, {
      status: 200,
      data: formattedReviews,
    });

  } catch (error) {
    next(error);
  }
}

export async function getProductRating(req, res, next) {
  try {

    const { storeId: store_id, productId: product_id } = req.body;

    const ratingReviews = await productRatingReviews(
      store_id,
      product_id
    );

    const total = ratingReviews.length;

    if (total === 0) {
      return successResponse(res, {
        status: 200,
        data: {
          rating: 0,
        },
      });
    }

    const sum = ratingReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );

    const average = Number((sum / total).toFixed(1));

    return successResponse(res, {
      status: 200,
      data: {
        rating: average,
      },
    });

  } catch (error) {
    next(error);
  }
}

export async function getProductReviews(req, res, next) {
  try {

    const { storeId: store_id, productId: product_id } = req.body;

    const productReviews = await productReviewsService(store_id,product_id);

    const formattedReviews = productReviews.map((review) => reviewResponseFormat(review));

    successResponse(res, {
      status: 200,
      data: formattedReviews,
    });

  } catch (error) {
    next(error);
  }
}

export async function getWidgetConfig(req, res, next) {
  try {
    const { storeId:store_id } = req.body;

    const config = await widgetConfig(store_id);

    successResponse(res, {
      status: 200,
      data: {
        widgetConfig: config
      },
    });

  } catch (error) {
    next(error);
  }
}