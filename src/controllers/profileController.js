import { updateAvatarService, updateBannerService, updateProfileInfoService } from "../services/updateAvatarService.js";
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

export async function updateBanner(req, res, next) {

  try{

    const { user_id, banner, banner_accent_color } = req.body;

    const updatedBanner = await updateBannerService(user_id, banner, banner_accent_color);

    successResponse(res, {
      status: 200,
      data: updatedBanner,
    });

  } catch( error ) {
    next(error);
  }
}

export async function updateInfo(req, res, next) {
  
    try{
  
      const { user_id, first_name, last_name, email   } = req.body;
  
      const updatedInfo = await updateProfileInfoService(user_id, first_name, last_name, email);
  
      successResponse(res, {
        status: 200,
        data: updatedInfo,
      });
  
    } catch( error ) {
      next(error);
    }
  }