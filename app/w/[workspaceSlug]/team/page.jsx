"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UserPlus, Copy, Check, Shield, UserCheck, Mail } from "lucide-react";

export default function TeamPage() {
  const params = useParams();
  const workspaceSlug = params?.workspaceSlug || "";

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee"); // admin, manager, employee, viewer
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "Owner User", email: "owner@example.com", role: "owner" }
  ]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setInviteUrl("");

    try {
      const res = await fetch("/api/workspace/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          role: role,
          workspaceSlug: workspaceSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create invite");
      }

      const url = `${window.location.origin}/accept-invite?token=${data.token}&slug=${workspaceSlug}&role=${role}`;
      setInviteUrl(url);
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to create invite");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team & Members</h1>
        <p className="text-gray-500 mt-1">Manage team members, roles, and invite employees to your workspace.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Invite Form */}
        <div className="md:col-span-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Invite Member
          </div>
          <p className="text-xs text-gray-500">
            Invite employees or managers to join <strong>{workspaceSlug}</strong>.
          </p>

          {error && (
            <div className="p-3 rounded bg-red-50 text-red-600 text-xs border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleInvite} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                required
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              >
                <option value="admin">Admin (Full Access)</option>
                <option value="manager">Manager (Manage Products & Reports)</option>
                <option value="employee">Employee (Add & Search Products)</option>
                <option value="viewer">Viewer (Read Only)</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Generating Link..." : "Create Invite Link"}
            </Button>
          </form>

          {inviteUrl && (
            <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex flex-col gap-2">
              <span className="text-xs font-medium text-blue-900 dark:text-blue-200">
                Shareable Invite Link:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={inviteUrl}
                  className="flex-1 text-xs bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded px-2 py-1 select-all"
                />
                <Button size="sm" onClick={copyToClipboard} variant="outline" className="h-7 px-2">
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Members List */}
        <div className="md:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Active Workspace Members</h2>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full text-gray-500 font-medium">
              {members.length} Member{members.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {members.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{member.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="capitalize text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
