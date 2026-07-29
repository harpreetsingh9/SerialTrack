import { connect } from "@/dbConfig/dbConfig";
import Invite from "@/models/Invite";

connect();

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return Response.json({ error: "Invitation token required" }, { status: 400 });
    }

    const invite = await Invite.findOne({ token, status: "pending" });

    if (!invite) {
      return Response.json({ error: "Invalid or expired invitation link" }, { status: 404 });
    }

    // Mark invitation as accepted
    invite.status = "accepted";
    await invite.save();

    return Response.json({
      success: true,
      workspaceSlug: invite.workspaceSlug,
      role: invite.role,
      email: invite.email,
    }, { status: 200 });

  } catch (error) {
    console.error("Error accepting invite:", error);
    return Response.json({ error: error.message || "Failed to accept invite" }, { status: 500 });
  }
}

export const revalidate = 0;
