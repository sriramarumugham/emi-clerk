import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

const Borrower = z.object({
  borrowerId: ObjectIdType,
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  dateOfBirth: z.date().optional(),
  loanIds: z.array(z.string()),
  guarantorIds: z.array(
    z.object({ name: z.string(), guarantorId: ObjectIdType })
  ),
});

export type Borrower = z.infer<typeof Borrower>;
