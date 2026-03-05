import { z } from "zod";

export const createReviewSchema = z.object({
  approved: z.boolean().nullable().optional().default(null),
  author_name: z.string().min(1),
  content: z.string().optional(),
  image_url: z.string().url().nullable().optional(),
  product_external_id: z.string(), 
  product_name: z.string().min(1),
  product_url: z.string().min(10),
  rating: z.number().int().min(1).max(5),
  store_id: z.string().uuid(),
  tienda_nube_user_id: z.string().min(1),
});
