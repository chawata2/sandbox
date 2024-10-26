import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
