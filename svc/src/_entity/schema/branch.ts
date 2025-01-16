import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

export const Branch = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  owner: ObjectIdType,
  postalCode: z.string().optional(),
  createdBy: ObjectIdType.optional().nullable(),
  location: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),
  loanAnalytics: z.object({
    activeLoans: z.number(),
    closedLoans: z.number(),
    seizedLoans: z.number(),
    npaLoans: z.number(),
  }),
  financialAnalytics: z.object({
    totalBalance: z.number(),
    loanAmount: z.number(),
    settledAmount: z.number(),
    interestIncome: z.number(),
    profitAndLoss: z.number(),
  }),
});

export type Branch = z.infer<typeof Branch>;
