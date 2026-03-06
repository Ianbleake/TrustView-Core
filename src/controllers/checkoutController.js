import { stripe } from "../config/stripe.js";
import { createStripeCheckoutSession } from "../services/stripe/createCheckoutSession.js";


export async function createCheckoutSession(req, res, next) {
  try {

    const { priceId, email } = req.body;

    if (!priceId) {
      return res.status(400).json({
        message: "priceId requerido"
      });
    }

    const session = await createStripeCheckoutSession(priceId, email);

    res.json({
      clientSecret: session.client_secret,
    });

  } catch (error) {
    next(error);
  }
}

export async function getCheckoutSessionStatus(req, res, next) {
  try {

    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        message: "session_id requerido"
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    res.json({
      status: session.status,
      customer_email: session.customer_details?.email
    });

  } catch (error) {
    next(error);
  }
}