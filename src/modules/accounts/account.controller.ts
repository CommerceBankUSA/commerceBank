import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { findAdminById } from "../admin/admin.service";

//Schemas
import {
  CreateAccountInput,
  DeleteAccountInput,
  EditAccountInput,
  GetAccountInput,
} from "./account.schema";

//Utils
import { sendResponse } from "../../utils/response.utils";
import {
  createAccount,
  deleteAccount,
  editAccount,
  findAccount,
} from "./account.service";

//Fetch an account by account number
export const fetchAccountHandler = async (
  request: FastifyRequest<{ Params: GetAccountInput }>,
  reply: FastifyReply
) => {
  const accountNumber = request.params.accountNumber;

  //Fetch account details if existing
  const account = await findAccount(accountNumber);

  //Return adequate responses
  if (!account)
    return sendResponse(
      reply,
      404,
      false,
      "Couldn't fetch account details, try again later."
    );
  return sendResponse(
    reply,
    200,
    true,
    "Account details was fetched successfully",
    account
  );
};

//Admin Endpoints
//Create new Account
export const CreateAccountHandler = async (
  request: FastifyRequest<{ Body: CreateAccountInput }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;
  const admin = await findAdminById(decodedAdmin?._id);
  if (!admin)
    return sendResponse(
      reply,
      401,
      false,
      "Sorry, but you are not authorized to perform this action"
    );

  //Make sure account doesn't exist already
  const exists = await findAccount(request.body.accountNumber);
  if (exists)
    return sendResponse(
      reply,
      409,
      false,
      "An account with this account number already exists"
    );

  //Create Account and return
  const newAccount = await createAccount(request.body);
  return sendResponse(
    reply,
    201,
    true,
    "Account was created successfully",
    newAccount
  );
};

//Edit Account
export const editAccountHandler = async (
  request: FastifyRequest<{ Body: EditAccountInput }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;
  const admin = await findAdminById(decodedAdmin?._id);
  if (!admin)
    return sendResponse(
      reply,
      401,
      false,
      "Sorry, but you are not authorized to perform this action"
    );

  //Edit account and return response;
  const editedAccount = await editAccount(request.body);
  if (!editedAccount)
    return sendResponse(reply, 400, false, "Account not found.");

  return sendResponse(
    reply,
    200,
    true,
    "Account was edited successfully",
    editedAccount
  );
};

//Delete Account
export const deleteAccountHandler = async (
  request: FastifyRequest<{ Params: DeleteAccountInput }>,
  reply: FastifyReply
) => {
  const decodedAdmin = request.admin!;
  const admin = await findAdminById(decodedAdmin?._id);
  if (!admin)
    return sendResponse(
      reply,
      401,
      false,
      "Sorry, but you are not authorized to perform this action"
    );

  //Delete Account and return response
  await deleteAccount(request.params.id);
  return sendResponse(reply, 204, true, "Account was deleted successfully.");
};
