import { getAnalitycs } from "../services/analyticsService.js";
import { successResponse } from "../utils/response.js";

export async function storeAnalytics(req, res, next) {
  try {
    const { storeId } = req.params;

    const analytics = await getAnalitycs(storeId);  

    successResponse(res, {
      status: 200,
      data: analytics,
    });

  } catch (error) {
    next(error);
  }
}
