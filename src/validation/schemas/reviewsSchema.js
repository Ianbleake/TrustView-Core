import { z } from "zod";

export const createReviewSchema = z.object({
  store_id: z.string().uuid(),
  product_id: z.string(), 
  product_name: z.string().min(1),
  author_name: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  approved: z.boolean().nullable().optional().default(null),
  content: z.string().optional(),
  image_url: z.string().url().nullable().optional(),
});
