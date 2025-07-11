import { Schema, model, Types } from "mongoose";

export type ActivityDocument = Document & {
  admin: Types.ObjectId;
  action: string;
  target?: Types.ObjectId;
  targetModel?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
};

const activitySchema = new Schema<ActivityDocument>({
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  action: { type: String, required: true },
  target: { type: Schema.Types.ObjectId },
  targetModel: { type: String },
  metadata: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

export const ActivityModel = model<ActivityDocument>(
  "Activity",
  activitySchema
);
