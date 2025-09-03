import { SubType, TransactionType } from "../transaction/transaction.model";
import { FastifyRequest, FastifyReply } from "fastify";

//Services
import {
  createDepositRequest,
  deleteDepositRequest,
  editDepositRequest,
  fetchDepositById,
  getAllDepositRequest,
  getDepositRequests,
} from "./depositRequest.service";
import { createNewTransaction } from "../transaction/transaction.service";
import { findAdminById } from "../admin/admin.service";

//Schemas
import {
  CreateDepositRequestInput,
  EditDepositRequestInput,
} from "./depositRequest.schema";
import { PaginationInput } from "../general/general.schema";

//Utils and Configs
import { sendResponse } from "../../utils/response.utils";
import { generateTransactionHash } from "../../utils/generate";
import { emitAndSaveNotification } from "../../utils/socket";

//Create Deposit Request
export const createDepositRequestHandler = async (
  request: FastifyRequest<{ Body: CreateDepositRequestInput }>,
  reply: FastifyReply
) => {
  const decodedDetails = request.user;
  const user = decodedDetails._id;
  const amount = request.body.amount;

  //Create a new request
  const newRequest = await createDepositRequest(amount, user);
  return sendResponse(
    reply,
    201,
    true,
    "Deposit Request Was Created Successful",
    newRequest
  );
};

//Fetch a users deposit request
export const getDepositRequestHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const decodedDetails = request.user;
  const user = decodedDetails._id;

  //Fetch a User Deposit Request and Return
  const requests = await getDepositRequests(user);
  return sendResponse(
    reply,
    200,
    true,
    "Your deposit requests were fetched successfully.",
    requests
  );
};

//Edit Deposit Request
export const editDepositRequestHandler = async (
  request: FastifyRequest<{ Body: EditDepositRequestInput }>,
  reply: FastifyReply
) => {
  const decodedDetails = request.user;
  const user = decodedDetails._id;
  const { id, ...rest } = request.body;

  //Remove Undefined
  const updateData = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v !== undefined && v !== null)
  );

  //Make sure the request exists
  const isExist = await fetchDepositById(id);
  if (!isExist)
    return sendResponse(reply, 404, false, "Deposit Request Not Found");

  //Edit deposit request
  console.log("The Updated Data", updateData);
  const editedRequest = await editDepositRequest(id, updateData);
  if (!editedRequest)
    return sendResponse(reply, 404, false, "Deposit Request Not Found");

  //Return successful response
  return sendResponse(
    reply,
    200,
    true,
    "Your deposit request was updated successfully",
    editedRequest
  );
};

//Admin EndPoints

//Approve Deposit Request
export const approveDepositRequestHandler = async (
  request: FastifyRequest<{ Body: EditDepositRequestInput }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;

  //Fetch admin and make sure he is a super admin
  const admin = await findAdminById(decodedAdmin?._id);
  if (!admin)
    return sendResponse(
      reply,
      400,
      false,
      "Sorry, but you are not authorized to perform this action"
    );
  const { id, ...rest } = request.body;

  //Remove Undefined
  const updateData = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v !== undefined && v !== null)
  );

  //Make sure the request exists
  const isExist = await fetchDepositById(id);
  if (!isExist)
    return sendResponse(reply, 404, false, "Deposit Request Not Found");

  //Edit deposit request
  const editedRequest = await editDepositRequest(id, updateData);

  if (editedRequest && editedRequest.status === "successful") {
    //Create a new transaction
    const transactionId = generateTransactionHash();

    const data = {
      amount: editedRequest.amount,
      transactionType: TransactionType.CREDIT,
      subType: SubType.DEPOSIT,
      status: "successful",
    };
    const newWithdrawal = await createNewTransaction(
      editedRequest.user.toString(),
      data,
      transactionId
    );

    //Send Notification
    await emitAndSaveNotification({
      user: editedRequest.user.toString(),
      type: "transaction",
      subtype: TransactionType.CREDIT,
      title: `Deposit`,
      message: `$${editedRequest.amount.toLocaleString()} was deposited to your account successfully.`,
      data: {
        transactionId: newWithdrawal.transactionId,
        amount: editedRequest.amount,
        date: newWithdrawal.createdAt,
      },
    });
  }

  return sendResponse(
    reply,
    200,
    true,
    "Deposit Request was updated successfully."
  );
};

//Fetch all deposit requests
export const fetchAllDepositRequestHandler = async (
  request: FastifyRequest<{ Querystring: PaginationInput }>,
  reply: FastifyReply
) => {
  const { page = "1", limit = "20" } = request.query;

  //Fetch all deposit request
  const response = await getAllDepositRequest(parseInt(page), parseInt(limit));
  return sendResponse(
    reply,
    200,
    true,
    "All the deposit request was fetched successfully",
    response
  );
};

//Delete a user deposit request
export const deleteDepositRequestHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;
  const id = request.params.id;

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

  await deleteDepositRequest(id);
  return sendResponse(
    reply,
    204,
    true,
    "The Deposit Request was deleted successfully."
  );
};
