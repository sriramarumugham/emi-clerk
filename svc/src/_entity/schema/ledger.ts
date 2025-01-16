import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";
import { E_LOAN_CYCLE } from "./loan";

enum E_LEDGER_ENTRY_STATUS {
  DUE = "DUE",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

enum E_EMI_LEDGER_STATUS {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  NPA = "NPA",
}

export const EMITransaction = z.object({
  date: z.date(),
  amount: z.number().min(0),
  remainingAmount: z.number().min(0),
  penaltyAtPayment: z.number().default(0),
});

export type EMITransaction = z.infer<typeof EMITransaction>;

export const EMILedgerEntry = z.object({
  tenure: z.number().min(1).max(30),
  dueDate: z.date(),
  amountDue: z.number().min(0),
  amountPaid: z.number().default(0),
  payments: z.array(EMITransaction).default([]),
  status: z.nativeEnum(E_LEDGER_ENTRY_STATUS),
  penaltyAccumulated: z.number().default(0),
});

export type EMILedgerEntry = z.infer<typeof EMILedgerEntry>;

export const EMILedger = z.object({
  loanId: ObjectIdType,
  userId: ObjectIdType,
  branchId: ObjectIdType,
  loanCycle: z.nativeEnum(E_LOAN_CYCLE),
  totalLoanAmount: z.number(),
  emiPerCycle: z.number(),
  nextDue: z.date().optional(), // Optional for CLOSED loans
  followUpDate: z.date().optional(), // Optional if no follow-up is needed
  ledger: z.array(EMILedgerEntry),
  outstandingBalance: z.number().default(0),
  outstandingPenality: z.number().default(0),
  outstandingEMIs: z.number().default(0), // remaining dues
  status: z.nativeEnum(E_EMI_LEDGER_STATUS),
  penaltyPerDay: z.number().default(0),
});

export type EMILedger = z.infer<typeof EMILedger>;
