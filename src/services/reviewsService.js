import { supabase } from "../config/supabase.js";

export async function createReviewService(payload) {
  const {
    store_id,
    product_id,
    author_name,
    rating,
    content,
    image_url,
  } = payload;

  if (!store_id || !product_id || !author_name || !rating) {
    throw new Error("Faltan datos");
  }

  const { error } = await supabase.from("reviews").insert({
    store_id,
    product_id,
    author_name,
    rating,
    content,
    image_url,
    approved: false,
  });

  if (error) throw error;
}
