import { supabase } from "../config/supabase.js";

export async function widgetLastReviews( store_id) {

  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved, product_url")
    .eq("tienda_nube_user_id", store_id)
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(9);

  if (error) throw error;

  return data;
}

export async function productRatingReviews(store_id, product_id) {

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("tienda_nube_user_id",store_id)
    .eq("product_id",product_id)
    .eq("approved", true);

  if(error) throw error;

  return data ?? [];
}

export async function productReviewsService(store_id, product_id) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved, product_url")
    .eq("tienda_nube_user_id",store_id)
    .eq("product_id",product_id)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if(error) throw error;

  return data;
}

export async function widgetConfig(store_id) {
  const { data, error } = await supabase
    .from("stores")
    .select("widget_config")
    .eq("tienda_nube_user_id", store_id)
    .single();

  if (error) throw error;

  return data.widget_config;
}