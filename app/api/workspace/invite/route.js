import { connect } from "@/dbConfig/dbConfig";
import Invite from "@/models/Invite";
import crypto from "crypto";

connect();

export async function POST(request) {
  try {
    const { email, role, workspaceSlug } = await request.json();

    if (!email || !workspaceSlug) {
      return Response.json({ error: "Email and workspaceSlug are required" }, { status: 400 });
    }

    // Generate random secure token
    const token = "inv_" + crypto.randomBytes(12).toString("hex");

    const newInvite = await Invite.create({
      token,
      workspaceSlug,
      email,
      role: role || "employee",
      status: "pending",
    });

    return Response.json({
      success: true,
      token: newInvite.token,
      workspaceSlug: newInvite.workspaceSlug,
      role: newInvite.role,
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating workspace invite:", error);
    return Response.json({ error: error.message || "Failed to create invite" }, { status: 500 });
  }
}

export const revalidate = 0;
