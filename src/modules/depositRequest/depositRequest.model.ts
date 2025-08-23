import mongoose, { Document, model, Schema } from "mongoose";

export enum acceptedType {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  PENDING = "pending",
}

export enum statusType {
  SUCCESSFUL = "successful",
  FAILED = "failed",
  PENDING = "pending",
}

export type DepositRequestDocument = Document & {
  user: mongoose.Types.ObjectId;
  isAccepted: acceptedType;
  amount: number;
  hash: string;
  status: statusType;
  createdAt: Date;
};

const depositRequestSchema: Schema = new Schema<DepositRequestDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isAccepted: {
      type: String,
      enum: Object.values(acceptedType),
      default: acceptedType.PENDING,
    },
    amount: { type: Number, required: true },
    hash: { type: String },
    status: {
      type: String,
      enum: Object.values(statusType),
      default: statusType.PENDING,
    },
  },
  { timestamps: true }
);

const DepositRequestModel = model<DepositRequestDocument>(
  "DepositRequest",
  depositRequestSchema
);
export default DepositRequestModel;
