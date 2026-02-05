import { supabase } from "../config/supabase.js";

export async function createReviewService({
  store_id,
  product_id,
  author_name,
  rating,
  content,
  image_url,
}) {
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
