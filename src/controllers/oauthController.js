import { handleOAuthCallback } from "../services/oauthService.js";

export async function oauthCallback(req, res, next) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("No llegó el code");

    const store = await handleOAuthCallback(code);

    const redirectUrl = `${process.env.FRONTEND_URL}/auth/onboarding?store=${store.id}`;

    return res.redirect(302, redirectUrl);
  } catch (error) {
    next(error);
  }
}
