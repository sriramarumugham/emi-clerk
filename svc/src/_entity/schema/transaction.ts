import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

export enum E_TRANSACTION_CATEGORY {
  EMI = "EMI",
  WALLET = "WALLET",
  EXPENSE = "EXPENSE",
}

// Enum for credit or debit
export enum E_TRANSACTION_DIRECTION {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

// Enum for wallet operations
export enum E_WALLET_OPERATION {
  ADD = "ADD",
  WITHDRAW = "WITHDRAW",
}

const BaseTransaction = z.object({
  transactionId: ObjectIdType,
  branchId: ObjectIdType,
  userId: ObjectIdType,
  date: z.date(),
  amount: z.number().min(0),
  direction: z.nativeEnum(E_TRANSACTION_DIRECTION),
  description: z.string().optional(),
});

const EMITransaction = BaseTransaction.extend({
  category: z.literal(E_TRANSACTION_CATEGORY.EMI), // EMI transaction category
  loanId: ObjectIdType,
  cycleNumber: z.number().min(1),
  penaltyPaid: z.number().default(0),
  remainingEMIAmount: z.number().min(0).default(0),
  remainingPenalty: z.number().default(0),
});

const WalletTransaction = BaseTransaction.extend({
  category: z.literal(E_TRANSACTION_CATEGORY.WALLET),
  operation: z.nativeEnum(E_WALLET_OPERATION),
  purpose: z.string().optional(),
});

export const ExpenseList = z.object({
  branchId: ObjectIdType,
  userId: ObjectIdType,
  categories: z.array(z.string()),
});

export type ExpenseList = z.infer<typeof ExpenseList>;

const ExpenseTransaction = BaseTransaction.extend({
  category: z.literal(E_TRANSACTION_CATEGORY.EXPENSE),
  ExpenseType: z.string(),
});

export const Transaction = z.discriminatedUnion("category", [
  EMITransaction,
  WalletTransaction,
  ExpenseTransaction,
]);

export type Transaction = z.infer<typeof Transaction>;
