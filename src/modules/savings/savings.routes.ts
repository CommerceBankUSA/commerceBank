import { FastifyInstance } from "fastify/types/instance";

//Handlers
import {
  createSavingsHandler,
  deleteSavingsHandler,
  fetchAllSavingsHandler,
  fetchSavingsHandler,
  topUpSavingsHandler,
  withdrawSavingsHandler,
} from "./savings.controllers";

//Schemas
import {
  CreateSavingsInput,
  DeleteSavingsInput,
  savingsRef,
  WithdrawSavingsInput,
} from "./savings.schema";
import { generalRef, PaginationInput } from "../general/general.schema";

export default async function savingsRoutes(app: FastifyInstance) {
  //Create new Savings
  app.post<{ Body: CreateSavingsInput }>(
    "/new",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
        body: savingsRef("createSavingsSchema"),
        response: {
          201: savingsRef("generalSavingsResponseSchema"),
        },
      },
    },
    createSavingsHandler
  );

  //Edit Savings (Top up amount)
  app.post<{ Body: WithdrawSavingsInput }>(
    "/topUp",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
        body: savingsRef("withdrawSavingsSchema"),
        response: {
          200: savingsRef("generalSavingsResponseSchema"),
        },
      },
    },
    topUpSavingsHandler
  );

  //Withdraw Savings
  app.post<{ Body: WithdrawSavingsInput }>(
    "/withdraw",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
        body: savingsRef("withdrawSavingsSchema"),
        response: {
          200: savingsRef("generalSavingsResponseSchema"),
        },
      },
    },
    withdrawSavingsHandler
  );

  //Fetch a users savings
  app.get(
    "/get",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
      },
    },
    fetchSavingsHandler
  );

  //Admin Routes

  //Get all Savings
  app.get<{ Querystring: PaginationInput }>(
    "/getSavings",
    {
      preHandler: app.authenticateAdmin,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
        querystring: generalRef("paginationSchema"),
      },
    },
    fetchAllSavingsHandler
  );

  //Delete a Savings
  app.delete<{ Params: DeleteSavingsInput }>(
    "delete/:savingsId",
    {
      preHandler: app.authenticateAdmin,
      schema: {
        tags: ["Savings", "Users"],
        security: [{ bearerAuth: [] }],
        params: savingsRef("deleteSavingsSchema"),
      },
    },
    deleteSavingsHandler
  );
}
