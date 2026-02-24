import { supabase } from "../config/supabase.js";

export async function updateAvatarService(user_id, color, accent_color) {

  const { data, error } = await supabase
    .from("profile")
    .update({ color, accent_color })
    .eq("id", user_id)
    .select("id, color, accent_color")
    .single();

  if (error) throw error;

  return data;
}
