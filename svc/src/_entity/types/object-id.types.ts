import mongoose from "mongoose";
import { z } from "zod";

export const ObjectIdType = z.union([
  z.string(),
  z.instanceof(mongoose.Types.ObjectId),
]);
export type ObjectIdType = z.infer<typeof ObjectIdType>;
