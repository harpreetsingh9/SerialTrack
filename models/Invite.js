import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  workspaceSlug: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "employee", "viewer"],
    default: "employee",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "expired"],
    default: "pending",
  },
  invitedBy: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Invite || mongoose.model("Invite", inviteSchema);
