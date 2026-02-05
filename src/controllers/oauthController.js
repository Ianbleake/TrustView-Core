import { handleOAuthCallback } from "../services/oauthService.js";

export async function oauthCallback(req, res, next) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("No llegó el code");

    await handleOAuthCallback(code);

    res.send("App instalada correctamente 🚀");
  } catch (error) {
    next(error);
  }
}
