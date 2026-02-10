import { supabase } from "../config/supabase.js";

export async function completeOnboarding(payload) {
  const {
    storeId,
    email,
    password,
    firstName,
    lastName,
    storeName,
  } = payload;

  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) throw authError;

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .insert({
      auth_id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
    })
    .select()
    .single();

  if (profileError) throw profileError;

  const { error: storeError } = await supabase
    .from("stores")
    .update({
      profile_id: profile.id,
      store_name: storeName,
      status: "active",
    })
    .eq("id", storeId)
    .eq("status", "pending");

  if (storeError) throw storeError;
}
