"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function OnboardingPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkExistingWorkspace() {
      try {
        const { data: orgs } = await authClient.organization.list();
        if (orgs && orgs.length > 0 && orgs[0].slug) {
          router.push(`/w/${orgs[0].slug}/dashboard`);
          return;
        }
      } catch (err) {
        // Continue to onboarding if check fails
      } finally {
        setChecking(false);
      }
    }
    checkExistingWorkspace();
  }, [router]);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setLoading(true);
    setError("");

    // Generate slug from workspace name (e.g. "Guru Nanak Electricals" -> "guru-nanak-electricals")
    const slug = workspaceName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    try {
      const { data, error } = await authClient.organization.create({
        name: workspaceName,
        slug: slug,
      });

      if (error) {
        setError(error.message || "Failed to create workspace");
        setLoading(false);
      } else {
        // Redirect user to their newly created workspace dashboard!
        router.push(`/w/${slug}/dashboard`);
      }
    } catch (err) {
      // Fallback if organization plugin isn't active on DB yet
      router.push(`/w/${slug}/dashboard`);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#0a0a0a]">
        <p className="text-sm text-gray-500 animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="w-full max-w-md bg-white dark:bg-black p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create your Workspace</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome to SerialTrack! Enter your business or shop name to get started.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateWorkspace} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Business / Shop Name</label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Guru Nanak Electricals"
              required
              className="flex h-11 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
            {loading ? "Creating..." : "Continue to Dashboard →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
