import mongoose from "mongoose";

const replacementHistorySchema = new mongoose.Schema({
  oldProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  newProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  workspaceId: {
    type: String,
    required: true,
    index: true,
  },
  replacedBy: {
    type: String, // better-auth user ID
  },
}, { timestamps: true });

export default mongoose.models.ReplacementHistory || mongoose.model("ReplacementHistory", replacementHistorySchema);
