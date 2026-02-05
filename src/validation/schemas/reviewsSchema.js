import { z } from "zod";

export const createReviewSchema = z.object({
  store_id: z.string().uuid(),
  product_id: z.number().int(),
  author_name: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  content: z.string().optional(),
  image_url: z.string().url().optional(),
});
