import { stripe } from "../../config/stripe.js";

export async function createStripeCheckoutSession(priceId, email, userId) {

  const envURL = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.DEV_FRONTEND_URL

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "subscription",

    billing_address_collection: "auto",

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    customer_email: email,

    metadata: {
      userId
    },

    return_url: `${envURL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session;
}