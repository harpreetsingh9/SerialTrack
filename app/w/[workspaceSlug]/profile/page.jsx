"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Building2, Shield, Mail, Calendar, Key, Copy, Check } from "lucide-react";
import LogoutButton from "@/components/workspace/LogoutButton";

export default function ProfilePage() {
  const params = useParams();
  const workspaceSlug = params?.workspaceSlug || "default";

  const [user, setUser] = useState({
    name: "User Account",
    email: "user@example.com",
    id: "usr_9823748923",
    role: "Owner",
    createdAt: "July 2026",
  });

  const [workspace, setWorkspace] = useState({
    name: workspaceSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: workspaceSlug,
    plan: "Free Plan",
    totalProducts: 1248,
  });

  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    // Fetch live user session from better-auth if available
    async function loadUserData() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser((prev) => ({
            ...prev,
            name: session.data.user.name || prev.name,
            email: session.data.user.email || prev.email,
            id: session.data.user.id || prev.id,
          }));
        }
      } catch (err) {
        // Fallback to default user state
      }
    }
    loadUserData();
  }, []);

  const copyUserId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 sm:gap-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Account Profile</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">View your profile details and active workspace environment.</p>
      </div>

      {/* Main Grid: User Profile & Workspace Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Overview Card */}
        <div className="md:col-span-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              {user.role}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 capitalize">
              {workspace.name}
            </span>
          </div>
          <div className="w-full pt-2">
            <LogoutButton />
          </div>
        </div>

        {/* Right Column: Read-Only Form Sections */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Section 1: User Information (Read Only) */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-base border-b border-gray-100 dark:border-gray-800 pb-3">
              <User className="h-5 w-5 text-blue-600" />
              Personal Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.name}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed select-all focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed select-all focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">User ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={user.id}
                    className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-xs font-mono text-gray-900 dark:text-gray-100 cursor-not-allowed select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={copyUserId}
                    className="h-10 px-3 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {copiedId ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Account Joined</label>
                <input
                  type="text"
                  readOnly
                  value={user.createdAt}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Active Workspace Information (Read Only) */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-base border-b border-gray-100 dark:border-gray-800 pb-3">
              <Building2 className="h-5 w-5 text-blue-600" />
              Active Workspace Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Workspace Name</label>
                <input
                  type="text"
                  readOnly
                  value={workspace.name}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Workspace Slug</label>
                <input
                  type="text"
                  readOnly
                  value={workspace.slug}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm font-mono text-gray-900 dark:text-gray-100 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Current Role</label>
                <input
                  type="text"
                  readOnly
                  value={user.role}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500">Subscription Plan</label>
                <input
                  type="text"
                  readOnly
                  value={workspace.plan}
                  className="flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
