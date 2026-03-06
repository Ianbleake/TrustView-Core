import Stripe from "stripe";

const envKey = process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_KEY : process.env.DEV_STRIPE_SECRET_KEY

export const stripe = new Stripe(envKey, {
  apiVersion: "2026-02-25.clover",
});