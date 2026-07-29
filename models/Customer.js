import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  workspaceId: {
    type: String, // better-auth organization ID
    required: true,
    index: true,
  },
  createdBy: {
    type: String, // better-auth user ID
  },
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
