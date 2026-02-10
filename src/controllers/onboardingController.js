import { completeOnboarding as completeOnboardingService } from "../services/onboardingService.js";

export async function completeOnboarding(req, res, next) {
  try {
    const {
      storeId,
      email,
      password,
      firstName,
      lastName,
      storeName,
    } = req.body;

    if (!storeId || !email || !password || !storeName) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    await completeOnboardingService({
      storeId,
      email,
      password,
      firstName,
      lastName,
      storeName,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}
