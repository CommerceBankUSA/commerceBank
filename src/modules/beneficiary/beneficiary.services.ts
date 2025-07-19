import BeneficiaryModel from "./beneficiary.model";

//Schemas
import { CreateBeneficiaryInput } from "./beneficiary.schema";

//Create New Beneficiary
export const createBeneficiary = async (data: CreateBeneficiaryInput) => {
  const newBeneficiary = await BeneficiaryModel.create(data);
  return newBeneficiary;
};

//Get a User Beneficiaries
export const getUserBeneficiaries = async (userId: string) => {
  return await BeneficiaryModel.find({ user: userId });
};

//Check if a beneficiary belongs to a user
export const ownBeneficiary = async (
  fullName: string,
  accountNumber: string,
  userId: string
) => {
  const beneficiary = await BeneficiaryModel.findOne({
    fullName,
    accountNumber,
    user: userId,
  });
  return beneficiary;
};

//Delete Beneficiary
export const deleteBeneficiary = async (
  beneficiaryId: string,
  userId: string
) => {
  return await BeneficiaryModel.findOneAndDelete({
    _id: beneficiaryId,
    user: userId,
  });
};
