import { supabase } from "../config/supabase.js";

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

