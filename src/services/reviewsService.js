import { supabase } from "../config/supabase.js";
import { parse } from "csv-parse/sync";
import { validateRow } from "../utils/validateRow.js";
import { reviewResponseFormat } from "../utils/reviewResponseFormat.js";
import { upsertProduct } from "./productService.js";

export async function getReviewsService(storeId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_external_id, product_name, created_at, approved,product_url")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getLastReviewsService({ storeId, limit }) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content,product_external_id, product_name, created_at, approved,product_url")
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
    .select("id, author_name, rating, content,product_external_id, product_name, created_at, approved,product_url")
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

//TODO: Optimizar esta madre
export async function importReviewsService({ fileBuffer, store_id, tn_store_id }) {

  const MAX_IMPORT_REVIEWS = 100;

  const content = fileBuffer.toString("utf-8");

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  if (records.length > MAX_IMPORT_REVIEWS) {
    return {
      total: records.length,
      inserted: { count: 0, reviews: [] },
      failed: { count: 0, reviews: [] },
      errors: [
        {
          row: null,
          error: `El archivo excede el máximo permitido de ${MAX_IMPORT_REVIEWS} reviews`,
        },
      ],
    };
  }

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
      product_external_id: row.product_external_id,
      product_name: row.product_name || null,
      product_url: row.product_url,
      author_name: row.author_name,
      rating: Number(row.rating),
      content: row.content || null,
      image_url: null,
      approved:
        row.approved === "true" || row.approved === true ? true :
        row.approved === "false" || row.approved === false
          ? false
          : null,
      tienda_nube_user_id: tn_store_id,
    });    

  });

  let insertedReviews = [];

  for (const review of validReviews) {
  
    try {
  
      const productId = await upsertProduct({
        store_id: review.store_id,
        store_external_id: review.tienda_nube_user_id,
        product_name: review.product_name,
        product_external_id: review.product_external_id,
        product_img: review.image_url,
        product_url: review.product_url,
      });
  
      const reviewPayload = {
        ...review,
        product_id: productId,
      };
  
      const { data, error } = await supabase
        .from("reviews")
        .insert(reviewPayload)
        .select(
          "id, author_name, rating, content, product_external_id, product_name, created_at, approved, product_url"
        )
        .single();
  
      if (error) throw error;
  
      insertedReviews.push(data);
  
    } catch (error) {
  
      failedReviews.push(review);
  
      errors.push({
        row: null,
        error: error.message,
      });
  
    }
  
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


