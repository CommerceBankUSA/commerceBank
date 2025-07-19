import { FastifyReply, FastifyRequest } from "fastify";

//Services
import {
  deleteBeneficiary,
  getUserBeneficiaries,
} from "./beneficiary.services";

//Schemas
import { DeleteBeneficiaryInput } from "./beneficiary.schema";

//Utils
import { sendResponse } from "../../utils/response.utils";

//Get Beneficiaries Handler
export const getBeneficiariesHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user._id;
  const beneficiaries = await getUserBeneficiaries(userId);

  return sendResponse(reply, 200, true, "User beneficiaries", beneficiaries);
};

export const deleteBeneficiaryHandler = async (
  request: FastifyRequest<{ Params: DeleteBeneficiaryInput }>,
  reply: FastifyReply
) => {
  const userId = request.user._id;
  const id = request.params.id;

  const deleted = await deleteBeneficiary(id, userId);
  if (!deleted) {
    return sendResponse(reply, 404, false, "Beneficiary not found");
  }

  return sendResponse(reply, 200, true, "Beneficiary removed successfully");
};
