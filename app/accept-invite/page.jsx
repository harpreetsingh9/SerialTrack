"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const slug = searchParams.get("slug") || "workspace";
  const role = searchParams.get("role") || "employee";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/workspace/accept-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to accept invitation");
      }

      setAccepted(true);
      setTimeout(() => {
        router.push(`/w/${data.workspaceSlug || slug}/dashboard`);
      }, 1500);
    } catch (err) {
      setError(err.message || "Invalid or expired invitation token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="w-full max-w-md bg-white dark:bg-black p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col items-center text-center gap-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center text-blue-600">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workspace Invitation</h1>
          <p className="text-sm text-gray-500 mt-2">
            You have been invited to join <strong className="text-black dark:text-white capitalize">{slug}</strong> as a <span className="capitalize font-semibold text-blue-600">{role}</span>.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-xs border border-red-200 w-full">
            {error}
          </div>
        )}

        {accepted ? (
          <div className="flex flex-col items-center gap-2 text-green-600 py-4">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
            <p className="font-semibold text-sm">Invitation Accepted! Redirecting to Dashboard...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <Button size="lg" onClick={handleAccept} disabled={loading} className="w-full flex items-center justify-center gap-2">
              {loading ? "Joining Workspace..." : "Accept & Join Workspace"} <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Log in with another account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading invitation...</div>}>
      <AcceptInviteContent />
    </Suspense>
  );
}
