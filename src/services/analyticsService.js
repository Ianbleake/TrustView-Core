import { supabase } from "../config/supabase.js";

function calculateTrend(current, previous) {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }

  const result = ((current - previous) / previous) * 100;
  return Math.round(result);
}

export async function getAnalitycs(storeId) {
  const now = new Date();
  const last30 = new Date(now);
  last30.setDate(now.getDate() - 30);

  const prev60 = new Date(now);
  prev60.setDate(now.getDate() - 60);

  // =========================
  // 1️⃣ ALL TIME
  // =========================

  const { data: allReviews, error: allError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("store_id", storeId)
    .not("rating", "is", null);

  if (allError) throw allError;

  const totalAll = allReviews.length;

  const sumAll = allReviews.reduce((acc, r) => acc + r.rating, 0);
  const avgAll = totalAll > 0 ? +(sumAll / totalAll).toFixed(1) : 0;

  const positivesAll = allReviews.filter(r => r.rating >= 4).length;
  const positivesPercentageAll =
    totalAll > 0 ? Math.round((positivesAll / totalAll) * 100) : 0;

  const starsRatings = [1, 2, 3, 4, 5].map(star => {
    const count = allReviews.filter(r => r.rating === star).length;
    return {
      stars: star,
      count,
      percentage: totalAll > 0 ? Math.round((count / totalAll) * 100) : 0,
    };
  }).reverse(); // para que salga 5 → 1

  // =========================
  // 2️⃣ LAST 30 DAYS
  // =========================

  const { data: last30Reviews, error: last30Error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("store_id", storeId)
    .gte("created_at", last30.toISOString())
    .not("rating", "is", null);

  if (last30Error) throw last30Error;

  const totalLast30 = last30Reviews.length;

  const avgLast30 =
    totalLast30 > 0
      ? last30Reviews.reduce((a, r) => a + r.rating, 0) / totalLast30
      : 0;

  const positivesLast30 = last30Reviews.filter(r => r.rating >= 4).length;
  const positivesPercentageLast30 =
    totalLast30 > 0
      ? (positivesLast30 / totalLast30) * 100
      : 0;

  // =========================
  // 3️⃣ PREVIOUS 30 DAYS
  // =========================

  const { data: prevReviews, error: prevError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("store_id", storeId)
    .gte("created_at", prev60.toISOString())
    .lt("created_at", last30.toISOString())
    .not("rating", "is", null);

  if (prevError) throw prevError;

  const totalPrev = prevReviews.length;

  const avgPrev =
    totalPrev > 0
      ? prevReviews.reduce((a, r) => a + r.rating, 0) / totalPrev
      : 0;

  const positivesPrev = prevReviews.filter(r => r.rating >= 4).length;
  const positivesPercentagePrev =
    totalPrev > 0
      ? (positivesPrev / totalPrev) * 100
      : 0;

  // =========================
  // TRENDS
  // =========================

  const ratingTrend = calculateTrend(avgLast30, avgPrev);
  const totalReviewsTrend = calculateTrend(totalLast30, totalPrev);
  const positivesTrend = calculateTrend(
    positivesPercentageLast30,
    positivesPercentagePrev
  );

  return {
    rating: {
      average: avgAll,
      trend: ratingTrend,
    },
    totalReviews: {
      count: totalAll,
      trend: totalReviewsTrend,
    },
    monthlyReviews: {
      count: totalLast30,
      trend: totalReviewsTrend,
    },
    positives: {
      count: positivesAll,
      percentage: positivesPercentageAll,
      trend: positivesTrend,
    },
    starsRatings,
  };
}
