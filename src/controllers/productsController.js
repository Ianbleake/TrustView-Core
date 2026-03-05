import { getProductReviews, getStoreProducts } from "../services/productService.js";
import { successResponse } from "../utils/response.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";

export async function getProducts(req, res, next) {

  try {

    const { storeId } = req.params;

    const storeProducts = await getStoreProducts(storeId);

    const completeProducts = storeProducts.map(async ( product ) => {

      const productReviews = await getProductReviews(product.id,"rating");

      const productRating = productReviews.length
        ? Number(
            (
              productReviews.reduce((acc, r) => acc + r.rating, 0) /
              productReviews.length
            ).toFixed(1)
          )
        : 0;

      return {
        id: product.id,
        product_img: product.product_img,
        product_name: product.product_name,
        product_url: product.product_url,
        rating: productRating,
        reviews: {
          total: productReviews.length,
        }
      }
    })

    successResponse({
      status: 200,
      data: completeProducts,
    })

  } catch(error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {

  function calculateTrend(current, previous) {
    if (previous === 0) {
      if (current === 0) return 0;
      return 100;
    }
  
    const result = ((current - previous) / previous) * 100;
    return Math.round(result);
  }

  try{

    const { productId } = req.params;

    const product = await getProduct(productId);

    const productReviews = await getProductReviews(productId);

    const totalReviews = productReviews.length;

    const reviewsDistribution = [1,2,3,4,5]
      .map((star) => {
        const count = productReviews.filter(r => r.rating === star).length;
    
        return {
          stars: star,
          count,
          percentage: totalReviews
            ? Math.round((count / totalReviews) * 100)
            : 0
        };
      })
      .reverse();

    const productRating = productReviews.length
    ? Number(
        (
          productReviews.reduce((acc, r) => acc + r.rating, 0) /
          productReviews.length
        ).toFixed(1)
      )
    : 0;

    const formattedReviews = productReviews.map((review) => reviewResponseFormat(review));

    const now = new Date();

    const last30 = new Date(now);
    last30.setDate(now.getDate() - 30);

    const prev60 = new Date(now);
    prev60.setDate(now.getDate() - 60);

    const last30Reviews = productReviews.filter(
      r => new Date(r.created_at) >= last30
    );
    
    const prevReviews = productReviews.filter(
      r => {
        const date = new Date(r.created_at);
        return date >= prev60 && date < last30;
      }
    );
    
    const totalLast30 = last30Reviews.length;
    const totalPrev = prevReviews.length;

    const reviewsTrend = calculateTrend(totalLast30, totalPrev);

    const growth = reviewsTrend >= 0 ? "positive" : "negative";


    const completeProduct = {
      id: product.id,
      product_name: product.product_name,
      product_img: product.product_img,
      product_url: product.product_url,
      rating: productRating,
      reviews: {
        reviews: formattedReviews,
        total: totalReviews,
        trend: reviewsTrend,
        growth: growth,
        reviewsRatings: reviewsDistribution,

      }
    };

    successResponse({
      status: 200,
      data: completeProduct,
    })

  } catch(error) {
    next(error);
  }
}