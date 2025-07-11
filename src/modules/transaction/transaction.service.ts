import mongoose from "mongoose";
import TransactionModel, {
  TransactionDocument,
  TransactionStatus,
  TransactionType,
} from "./transaction.model";
import loanModel, { LoanStatus } from "../loan/loan.model";

//Schemas
import { CreateTransactionInput } from "./transaction.schema";

//New Transaction
export const createNewTransaction = async (
  user: string,
  input: CreateTransactionInput,
  transactionId: string
) => {
  const newTransaction = await TransactionModel.create({
    ...input,
    user,
    transactionId,
  });
  return newTransaction;
};

//Fetch all Transactions
export const fetchAllTransactions = async (
  user: string,
  page: number = 1,
  limit: number = 20
) => {
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    TransactionModel.find({ user })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    TransactionModel.countDocuments({ user }),
  ]);

  return {
    data: transactions,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};

//Fetch Transactions by Type
export const fetchTransactions = async (user: string, type: string) => {
  const transactions = await TransactionModel.find({ user, type }).sort({
    createdAt: -1,
  });
  return transactions;
};

//Fetch a Particular Transaction
export const getTransactionById = async (id: string) => {
  return await TransactionModel.findById(id);
};

//Get a users last five transactions
export const getLastFiveTransactions = async (user: string) => {
  const transactions = await TransactionModel.find({ user })
    .sort({ createdAt: -1 })
    .limit(5);
  return transactions;
};

//Admin Services
//Fetch all transactions with pagination
export const getTransactions = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    TransactionModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "userName email accountId profilePicture"),
    TransactionModel.countDocuments(),
  ]);

  return {
    data: transactions,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};

//Fetch a specific user transactions
export const getUserTransactions = async (
  user: string,
  page = 1,
  limit = 20,
  transactionType?: TransactionType
) => {
  const skip = (page - 1) * limit;

  const filter: any = { user };
  if (transactionType) {
    filter.transactionType = transactionType;
  }

  const [transactions, total] = await Promise.all([
    TransactionModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    TransactionModel.countDocuments(filter),
  ]);

  return {
    data: transactions,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};

//Update a transaction
export const updateTransaction = async (
  id: string,
  data: Partial<TransactionDocument>
) => {
  return await TransactionModel.findByIdAndUpdate(id, data, { new: true });
};

//Delete a transaction
export const deleteTransaction = async (id: string) => {
  return await TransactionModel.findByIdAndDelete(id);
};

//Get a users balance
export const getUserBalance = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  // Get all successful transactions for this user
  const transactions = await TransactionModel.find({
    status: TransactionStatus.SUCCESSFUL,
    user: objectId,
  });

  let balance = 0;

  for (const txn of transactions) {
    if (txn.transactionType === TransactionType.CREDIT) {
      balance += txn.amount;
    } else if (txn.transactionType === TransactionType.DEBIT) {
      balance -= txn.amount;
    }
  }

  return balance;
};
