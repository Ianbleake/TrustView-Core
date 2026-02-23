import { supabase } from "../config/supabase.js";

export async function updateWidgetService(store_id, widget_config) {

  const { data, error } = await supabase
    .from("stores")
    .update({ widget_config })
    .eq("id", store_id)
    .select("id, widget_config")
    .single();

  if (error) throw error;

  return data;
}