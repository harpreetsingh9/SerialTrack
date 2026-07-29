import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g. "Air Conditioner", "Refrigerator"
    // required: true,
  },
  brand: {
    type: String,
    // required: true,
  },
  modelNumber: {
    type: String,
  },
  serialNumber: {
    type: String,
    required: true,
    index: true,
  },
  installationDate: {
    type: Date,
    // required: true,
  },
  warrantyStart: {
    type: Date,
  },
  warrantyEnd: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Active", "Replaced", "Expired"],
    default: "Active",
  },
  notes: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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

export default mongoose.models.Product || mongoose.model("Product", productSchema);
