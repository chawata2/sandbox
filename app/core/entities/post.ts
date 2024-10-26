import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  content: z.string(),
  published: z.boolean(),
  authorId: z.number(),
});
