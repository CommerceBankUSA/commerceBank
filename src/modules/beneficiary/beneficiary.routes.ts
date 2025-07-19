import { FastifyInstance } from "fastify";

//Handlers
import {
  deleteBeneficiaryHandler,
  getBeneficiariesHandler,
} from "./beneficiary.controllers";

//Schemas
import { beneficiaryRef, DeleteBeneficiaryInput } from "./beneficiary.schema";
import { generalRef } from "../general/general.schema";

export default async function beneficiaryRoutes(app: FastifyInstance) {
  //Fetch beneficiaries
  app.get(
    "/getBeneficiaries",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Beneficiaries", "Users"],
        security: [{ bearerAuth: [] }],
        response: {
          200: beneficiaryRef("generalBeneficiaryResponseSchema"),
        },
      },
    },
    getBeneficiariesHandler
  );

  //Delete beneficiary
  app.delete<{ Params: DeleteBeneficiaryInput }>(
    "/delete",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Beneficiaries", "Users"],
        security: [{ bearerAuth: [] }],
        response: {
          200: generalRef("responseSchema"),
          404: generalRef("unavailableSchema"),
        },
      },
    },
    deleteBeneficiaryHandler
  );
}
