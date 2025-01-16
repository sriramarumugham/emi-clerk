import { z } from "zod";
import { ObjectIdType } from "../types/object-id.types";

export enum E_USER_ROLES {
  SUPER_ADMIN = "SUPER_ADMIN",
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE",
}
export enum E_USER_STATUS {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export const User = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.nativeEnum(E_USER_ROLES),
  companyIds: z.array(ObjectIdType.optional().nullable()),
  createdBy: ObjectIdType,
  permissions: z.array(z.string()),
});
