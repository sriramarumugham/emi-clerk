import { z } from "zod";

export const createAtUpdateAt = z.object({
  updatedAt: z.date(),
  createdAt: z.date().optional(),
});
