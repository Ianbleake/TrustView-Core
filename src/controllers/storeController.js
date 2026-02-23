import { updateWidgetService } from "../services/storeService.js";
import { successResponse } from "../utils/response.js";

export async function updateWidget(req, res, next) {
  try {
    const { store_id, widget_settings } = req.body;

    const updatedStore = await updateWidgetService(store_id, widget_settings);

    successResponse(res, {
      status: 200,
      data: updatedStore,
    });
  } catch (error) {
    next(error);
  }
}