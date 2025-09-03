import DepositRequestModel from "./depositRequest.model";

//Schemas
import { EditDepositRequestInput } from "./depositRequest.schema";

//Create New Deposit Request
export const createDepositRequest = async (amount: number, user: string) => {
  const newDepositRequest = await DepositRequestModel.create({ amount, user });
  return newDepositRequest;
};

//Fetch Deposit by Id
export const fetchDepositById = async (id: string) => {
  const depositRequest = await DepositRequestModel.findById(id);
  return depositRequest;
};

//Edit Deposit Request
export const editDepositRequest = async (
  id: string,
  data: Partial<EditDepositRequestInput>
) => {
  return await DepositRequestModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
};

//Get a User Deposit Requests
export const getDepositRequests = async (user: string) => {
  return DepositRequestModel.find({ user }).sort({ createdAt: -1 });
};

//Get all Deposit Requests
export const getAllDepositRequest = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await DepositRequestModel.countDocuments();
  const requests = await DepositRequestModel.find()
    .populate("user", "userName email accountId profilePicture")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    data: requests,
  };
};

//Delete Deposit Request
export const deleteDepositRequest = async (id: string) => {
  return await DepositRequestModel.findByIdAndDelete(id);
};
