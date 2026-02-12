import { supabase } from "../config/supabase.js";

export async function getReviewsService({ store_id }) {


  let query = supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (store_id) {
    query = query.eq("store_id", store_id);
  }

  const { data, error } = await query;

  if (error) throw error;

  return {
    reviews: data,
  };
}

export async function getLastReviewsService({ store_id, limit }) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("store_id", store_id)
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
      approved: false,
    })
    .select("id, approved")
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
    .update({
      approved: false,
      rejected: true,
    })
    .eq("id", review_id)
    .select("id, approved, rejected")
    .single();

  if (error) throw error;

  return data;
}



