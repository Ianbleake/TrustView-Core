import { supabase } from "../config/supabase.js";

export async function upsertProduct(newProduct) {

  const { data: existing } = await supabase
    .from("products")
    .select("*")
    .eq("product_external_id", newProduct.product_external_id)
    .maybeSingle()

  const payload = {
    ...newProduct,
    product_img:
      newProduct.product_img ?? existing?.product_img ?? null
  }

  const { data, error } = await supabase
    .from("products")
    .upsert(payload, {
      onConflict: "product_external_id"
    })
    .select("id")
    .single()

  if (error) throw error

  return data.id
}