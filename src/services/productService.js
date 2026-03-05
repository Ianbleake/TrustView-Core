import { supabase } from "../config/supabase.js";

export async function upsertProduct(newProduct) {

  const { data: existing } = await supabase
    .from("products")
    .select("*")
    .eq("product_external_id", newProduct.product_external_id)
    .maybeSingle()

  const payload = {
    ...newProduct,
    product_name: newProduct.product_name ?? existing?.product_name ?? null,
    product_img: newProduct.product_img ?? existing?.product_img ?? null,
    product_url: newProduct.product_url ?? existing?.product_url ?? null,
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

export async function getStoreProducts( store_id, fields ) {

  const fieldsSelected = fields ? fields : "*";

  const { data, error } = await supabase
    .from("prodcts")
    .select(fieldsSelected)
    .eq("store_id",store_id);

  if(error) throw error;

  return data;
}

export async function getProduct( product_id, fields ) {

  const fieldsSelected = fields ? fields : "*";

  const { data, error } = await supabase
    .from("products")
    .select(fieldsSelected)
    .eq("id",product_id)
    .single();

  if(error) throw error;

  return data;

}

export async function getProductReviews( product_id, fields ) {

  const fieldsSelected = fields ? fields : "*";

  const { data, error } = await supabase
    .from("reviews")
    .select(fieldsSelected)
    .eq("product_id",product_id)
    .order("created_at", { ascending: false });

    if (error) throw error;

    return data;

}