"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      // Clear any session artifacts and redirect to login page
      window.location.href = "/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/50 w-full text-sm font-medium cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
