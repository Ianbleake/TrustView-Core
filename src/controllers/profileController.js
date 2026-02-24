import { updateAvatarService } from "../services/updateAvatarService.js";
import { successResponse } from "../utils/response.js";

export async function updateAvatar(req, res, next) {
  try {
    const { user_id, color, accent_color } = req.body;

    const updatedAvatar = await updateAvatarService(user_id, color, accent_color);

    successResponse(res, {
      status: 200,
      data: updatedAvatar,
    });

  } catch (error) {
    next(error);
  }
}