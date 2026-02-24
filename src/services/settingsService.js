import { supabase } from "../config/supabase.js";


export const updateNotificationsSettings = async (
  user_id,
  settings
) => {

  const { data, error } = await supabase
    .from("profile")
    .update({
      settings: settings,
    })
    .eq("id", user_id)
    .select(" id, settings")
    .single();

  if (error) {
    throw error;
  }

  return data;
};