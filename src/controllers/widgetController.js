import { successResponse } from "../utils/response.js";
import { getInternalStoreId, productRatingReviews, productReviewsService, widgetConfig, widgetLastReviews } from "../services/widgetService.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";
import { logger } from "../utils/logger.js";
import { createReviewService } from "../services/reviewsService.js";

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

    logger.info("Product Reviews geted", {
      store: store_id
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

export async function newReview(req,res,next){

  try{

    const widgetReview = req.body;

    const internal_store_id = await getInternalStoreId(widgetReview.tn_store_id)

    const newReview = {
      store_id: internal_store_id,
      product_id: widgetReview.product_id,
      product_name: widgetReview.product_name,
      author_name: widgetReview.author_name,
      rating: widgetReview.rating,
      content: widgetReview.content,
      tienda_nube_user_id: widgetReview.tn_store_id,
      product_url: widgetReview.product_url,
    }

    await createReviewService(newReview)

    successResponse(res, {
      status: 200,
      data: null,
    });

  }catch(error){
    next(error);
  }
}