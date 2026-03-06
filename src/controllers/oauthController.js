import { handleOAuthCallback } from "../services/oauthService.js";

export async function oauthCallback(req, res, next) {

  const envURL = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.DEV_FRONTEND_URL
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("No llegó el code");

    const store = await handleOAuthCallback(code);

    const redirectUrl = `${envURL}/auth/onboarding?store=${store.id}`;

    return res.redirect(302, redirectUrl);
  } catch (error) {
    next(error);
  }
}
