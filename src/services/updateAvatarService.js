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

export async function updateBannerService(user_id, banner, banner_accent_color) {
  
    const { data, error } = await supabase
      .from("profile")
      .update({ banner, banner_accent_color })
      .eq("id", user_id)
      .select("id, banner, banner_accent_color")
      .single();
  
    if (error) throw error;
  
    return data;
}

export async function updateProfileInfoService(
  user_id,
  first_name,
  last_name,
  email
) {

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw userError;

  if (email !== user.email) {
    const { error: authError } = await supabase.auth.updateUser({
      email,
    });

    if (authError) throw authError;
  }

  const { data, error } = await supabase
    .from("profile")
    .update({ first_name, last_name, email })
    .eq("id", user_id)
    .select("id, first_name, last_name, email")
    .single();

  if (error) throw error;

  return data;
}
