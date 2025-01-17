import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

export enum E_BILLING_STATUS {
  PAID = "PAID",
  PENDING = "PENDING",
  OVERDUE = "OVERDUE",
}

export enum E_CLIENT_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEACTIVATED = "DEACTIVATED",
  VERIFICATION_PENDING = "VERIFICATION_PENDING",
}

export enum E_CLIENT_TRANSACTION_STATUS {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export const Client = z.object({
  _id: ObjectIdType.optional(),
  address: z.string().optional(),
  officialInformation: z
    .object({
      pan: z.string().optional(),
      gstNumber: z.string().optional(),
      aadhar: z.string().optional(),
      documentLinks: z.array(z.string().url()).optional(),
    })
    .optional(),
  billingStatus: z
    .nativeEnum(E_BILLING_STATUS)
    .default(E_BILLING_STATUS.PENDING),
  clientStatus: z
    .nativeEnum(E_CLIENT_STATUS)
    .default(E_CLIENT_STATUS.VERIFICATION_PENDING),
  monthlyPrice: z.number(),
  transactions: z.array(
    z.object({
      date: z.date(),
      amount: z.number(),
      status: z.nativeEnum(E_CLIENT_TRANSACTION_STATUS),
      description: z.string().optional(),
    })
  ),
  lastInvoiceDate: z.date().optional(),
  nextBillingDate: z.date().optional(),
  createdBy: ObjectIdType,
  notes: z.string().optional(),
  userId: ObjectIdType,
  onboardedBy: ObjectIdType,
});
