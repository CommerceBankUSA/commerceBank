import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//Enums
import { acceptedType, statusType } from "./depositRequest.model";

//General Schema
import { responseCore } from "../general/general.schema";

//Deposit Request Core
const createDepositRequestSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
  }),
});

//Response Core
const depositRequestCore = z.object({
  user: z.string(),
  _id: z.string(),
  amount: z.number(),
  isAccepted: z.nativeEnum(acceptedType),
  hash: z.string(),
  status: z.nativeEnum(statusType),
  createdAt: z.string().datetime(),
});

//Edit request
const editDepositRequestSchema = z.object({
  id: z.string(),
  isAccepted: z.nativeEnum(acceptedType).optional(),
  status: z.nativeEnum(statusType).optional(),
  hash: z.string().optional(),
});

//General Response Core
const generalDepositRequestResponse = z.object({
  ...responseCore,
  data: depositRequestCore,
});

export type CreateDepositRequestInput = z.infer<
  typeof createDepositRequestSchema
>;
export type EditDepositRequestInput = z.infer<typeof editDepositRequestSchema>;

export const { schemas: depositRequestSchemas, $ref: depositRequestRef } =
  buildJsonSchemas(
    {
      createDepositRequestSchema,
      editDepositRequestSchema,
      generalDepositRequestResponse,
    },
    { $id: "DepositRequestSchema" }
  );
