import { FastifyInstance } from "fastify";

//Handlers
import {
  approveDepositRequestHandler,
  createDepositRequestHandler,
  deleteDepositRequestHandler,
  editDepositRequestHandler,
  fetchAllDepositRequestHandler,
  getDepositRequestHandler,
} from "./depositRequest.controller";

//Schemas
import { generalRef, PaginationInput } from "../general/general.schema";
import {
  CreateDepositRequestInput,
  depositRequestRef,
  EditDepositRequestInput,
} from "./depositRequest.schema";

export default async function depositRequestRoutes(app: FastifyInstance) {
  //Create Deposit Request
  app.post<{ Body: CreateDepositRequestInput }>(
    "/new",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
        body: depositRequestRef("createDepositRequestSchema"),
        response: {
          201: depositRequestRef("generalDepositRequestResponse"),
        },
      },
    },
    createDepositRequestHandler
  );

  //Edit Deposit Request
  app.patch<{ Body: EditDepositRequestInput }>(
    "/update",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
        body: depositRequestRef("editDepositRequestSchema"),
        response: {
          200: depositRequestRef("generalDepositRequestResponse"),
          404: generalRef("unavailableSchema"),
        },
      },
    },
    editDepositRequestHandler
  );

  //Fetch a users Deposit Request
  app.get(
    "/get",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
      },
    },
    getDepositRequestHandler
  );

  //Admin Routes

  //Approve Deposit Request
  app.patch<{ Body: EditDepositRequestInput }>(
    "/approve",
    {
      preHandler: app.authenticateAdmin,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
        body: depositRequestRef("editDepositRequestSchema"),
        response: {
          200: depositRequestRef("generalDepositRequestResponse"),
          404: generalRef("unavailableSchema"),
        },
      },
    },
    approveDepositRequestHandler
  );

  //Fetch all Deposit Requests
  app.get<{ Querystring: PaginationInput }>(
    "/getAll",
    {
      preHandler: app.authenticateAdmin,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
        querystring: generalRef("paginationSchema"),
      },
    },
    fetchAllDepositRequestHandler
  );

  //Delete a Deposit Request
  app.delete<{ Params: { id: string } }>(
    "/delete/:id",
    {
      preHandler: app.authenticateAdmin,
      schema: {
        tags: ["Deposits", "Users"],
        security: [{ bearerAuth: [] }],
        response: {
          204: generalRef("responseSchema"),
        },
      },
    },
    deleteDepositRequestHandler
  );
}
