import { supabase } from "../config/supabase.js";

export async function getReviewsService(storeId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getLastReviewsService({ storeId, limit }) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}

export async function createReviewService(payload) {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      ...payload,
    })
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved")
    .single();

  if (error) throw error;

  return data;
}

export async function approveReviewService(review_id) {

  const { data, error } = await supabase
    .from("reviews")
    .update({ approved: true })
    .eq("id", review_id)
    .select("id, approved")
    .single();

  if (error) throw error;

  return data;
}

export async function rejectReviewService(review_id) {

  const { data, error } = await supabase
    .from("reviews")
    .update({ approved: false })
    .eq("id", review_id)
    .select("id, approved")
    .single();

  if (error) throw error;

  return data;
}



