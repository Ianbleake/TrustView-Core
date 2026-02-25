import { supabase } from "../config/supabase.js";
import { parse } from "csv-parse/sync";
import { validateRow } from "../utils/validateRow.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";

export async function getReviewsService(storeId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved,product_url")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getLastReviewsService({ storeId, limit }) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved,product_url")
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
    .select("id, author_name, rating, content,product_id, product_name, created_at, approved,product_url")
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

export async function deleteReviewService(reviewId) {

  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .select("id")
    .single();

    if (error) throw error;

    return data;
}

export async function importReviewsService({ fileBuffer, store_id }) {

  const content = fileBuffer.toString("utf-8");

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  if (!records.length) {
    return {
      total: 0,
      inserted: { count: 0, reviews: [] },
      failed: { count: 0, reviews: [] },
      errors: [],
    };
  }
  
  const total = records.length;

  const validReviews = [];
  const failedReviews = [];
  const errors = [];

  records.forEach((row, index) => {
    const rowErrors = validateRow(row);

    if (rowErrors.length > 0) {
      failedReviews.push(row);

      errors.push({
        row: index + 2, // +2 porque header es fila 1
        error: rowErrors.join(", "),
      });

      return;
    }

    validReviews.push({
      store_id,
      product_id: row.product_id,
      product_name: row.product_name || null,
      author_name: row.author_name,
      rating: Number(row.rating),
      content: row.content || null,
      image_url: null, // no viene en la plantilla
      approved:
        row.approved === "true" || row.approved === true ? true :
        row.approved === "false" || row.approved === false
          ? false
          : null, // si no es ni true ni false, lo dejamos como null para revisión manual
    });    

  });

  let insertedReviews = [];

  if (validReviews.length > 0) {
    const { data, error } = await supabase
      .from("reviews")
      .insert(validReviews)
      .select(
        "id, author_name, rating, content, product_id, product_name, created_at, approved"
      );

    if (error) throw error;

    insertedReviews = data;
  }

  const formattedInsertedReviews = insertedReviews.map((review) => reviewResponseFormat(review));

  return {
    total,
    inserted: {
      count: insertedReviews.length,
      reviews: formattedInsertedReviews,
    },
    failed: {
      count: failedReviews.length,
      reviews: failedReviews,
    },
    errors,
  };
}


