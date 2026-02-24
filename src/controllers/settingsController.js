import { updateNotificationsSettings } from "../services/settingsService.js";
import { successResponse } from "../utils/response.js";

export const updateSettingsNotifications = async (req, res, next) => {
  try {
    const { user_id, settings } = req.body;


    const updatedProfile = await updateNotificationsSettings(
      user_id,
      settings
    );

    successResponse(res, {
      status: 200,
      data: updatedProfile,
    });

  } catch (error) {
    next(error);
  }
};