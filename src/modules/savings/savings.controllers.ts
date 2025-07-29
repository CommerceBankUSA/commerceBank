import { FastifyRequest, FastifyReply } from "fastify";

//Services
import {
  createSavings,
  deleteSavings,
  fetchUserSavings,
  getAllSavings,
} from "./savings.service";
import { findAdminById } from "../admin/admin.service";

//Schemas
import { CreateSavingsInput, DeleteSavingsInput } from "./savings.schema";
import { PaginationInput } from "../general/general.schema";

//Utils
import { sendResponse } from "../../utils/response.utils";

//Create a new savings
export const createSavingsHandler = async (
  request: FastifyRequest<{ Body: CreateSavingsInput }>,
  reply: FastifyReply
) => {
  const decodedDetails = request.user;
  const userId = decodedDetails._id;
  const data = request.body;

  const newSavings = await createSavings({ user: userId, ...data });
  return sendResponse(
    reply,
    201,
    true,
    "Your savings was initiated successfully",
    newSavings
  );
};

//Fetch a users savings
export const fetchSavingsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const decodedDetails = request.user;
  const user = decodedDetails._id;

  //Fetch a users savings and return
  const savings = await fetchUserSavings(user);
  return sendResponse(
    reply,
    200,
    true,
    "Your savings was fetched successfully",
    savings
  );
};

//Admin Handlers

//Fetch all savings
export const fetchAllSavingsHandler = async (
  request: FastifyRequest<{ Querystring: PaginationInput }>,
  reply: FastifyReply
) => {
  const { page = "1", limit = "20" } = request.query;

  //Fetch all Savings
  const response = await getAllSavings(parseInt(page), parseInt(limit));
  return sendResponse(
    reply,
    200,
    true,
    "All the savings was fetched successfully",
    response
  );
};

//Delete a Savings
export const deleteSavingsHandler = async (
  request: FastifyRequest<{ Params: DeleteSavingsInput }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;
  const savingsId = request.params.savingsId;

  //Fetch admin and make sure he is a super admin
  const admin = await findAdminById(decodedAdmin?._id);
  if (!admin)
    return sendResponse(
      reply,
      400,
      false,
      "Sorry, but you are not authorized to perform this action"
    );
  if (admin.role !== "super_admin")
    return sendResponse(
      reply,
      403,
      false,
      "Sorry, you are not authorized enough to perform this action"
    );

  const deletedSavings = await deleteSavings(savingsId);
  return sendResponse(
    reply,
    204,
    true,
    "The Savings was deleted successfully."
  );
};
