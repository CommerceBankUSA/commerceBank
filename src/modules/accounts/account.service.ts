import AccountModel, { AccountDocument } from "./account.model";
import { FilterQuery } from "mongoose";

//Schemas
import { CreateAccountInput, EditAccountInput } from "./account.schema";

//Create Account
export const createAccount = async (input: CreateAccountInput) => {
  const account = await AccountModel.create(input);
  return account;
};

//Find user by ID
export const findAccountById = async (id: string) => {
  const account = await AccountModel.findById(id).lean();
  return account;
};

//Find account by Account Number
export const findAccount = async (accountNumber: string) => {
  const account = await AccountModel.findOne({ accountNumber });
  return account;
};

//Edit Account
export const editAccount = async (input: EditAccountInput) => {
  const { accountNumber, ...rest } = input;

  // Prepare update object
  const updateFields: Partial<typeof input> = { ...rest };

  const updatedAccount = await AccountModel.findOneAndUpdate(
    { accountNumber },
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  return updatedAccount;
};

//Delete Account
export const deleteAccount = async (id: string) => {
  return await AccountModel.findOneAndDelete({
    _id: id,
  });
};
