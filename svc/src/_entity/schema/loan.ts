import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

export enum E_LOAN_CYCLE {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum E_LOAN_TYPE {
  AUTO = "AUTO",
  GOLD = "GOLD",
  HOME = "HOME",
  PERSONAL = "PERSONAL",
}

export const Guarantor = z.object({
  borrowerId: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  relationshipToBorrower: z.string().optional(),
  occupation: z.string().optional(),
  incomeDetails: z
    .object({
      annualIncome: z.number().min(0).optional(),
      incomeSource: z.string().optional(),
    })
    .optional(),
});

const BaseLoan = z.object({
  loanId: ObjectIdType,
  borrowerId: ObjectIdType,
  loanCycle: z.nativeEnum(E_LOAN_CYCLE),
  branchId: ObjectIdType, // Branch issuing the loan
  loanAmount: z.number().min(0), // Principal loan amount
  interestRate: z.number().min(0).max(100), // Annual interest rate in percentage
  penalityPerDay: z.number().default(0),
  startDate: z.date(), // Loan start date
  endDate: z.date(), // Loan end date or maturity date
  guarantor: Guarantor, // Guarantor details (optional)
  documents: z.array(z.string()).default([]), // List of document identifiers
});

const AutoLoan = BaseLoan.extend({
  loanType: z.literal(E_LOAN_TYPE.AUTO), // Use enum for discrimination
  vehicleDetails: z.object({
    registrationNumber: z.string(),
    make: z.string(), // Vehicle make (e.g., Toyota)
    model: z.string(), // Vehicle model (e.g., Corolla)
    year: z.number(), // Manufacturing year
    lastInsuranceDate: z.date(), // Date of last insurance
  }),
});

const GoldLoan = BaseLoan.extend({
  loanType: z.literal(E_LOAN_TYPE.GOLD),
  goldDetails: z.object({
    weight: z.number().min(0), // Weight of gold in grams
    purity: z.number().min(0).max(100), // Gold purity in percentage
    valuation: z.number().min(0), // Assessed valuation of the gold
  }),
});

const HomeLoan = BaseLoan.extend({
  loanType: z.literal(E_LOAN_TYPE.HOME),
  propertyDetails: z.object({
    address: z.string(),
    sizeInSquareFeet: z.number().min(0), // Size of the property
    valuation: z.number().min(0), // Assessed valuation of the property
  }),
});

const PersonalLoan = BaseLoan.extend({
  loanType: z.literal(E_LOAN_TYPE.PERSONAL),
  purpose: z.string().optional(),
});

export const Loan = z.discriminatedUnion("loanType", [
  AutoLoan,
  GoldLoan,
  HomeLoan,
  PersonalLoan,
]);

export type Loan = z.infer<typeof Loan>;
