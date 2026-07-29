"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message || "Failed to sign in");
      setLoading(false);
    } else {
      try {
        const { data: orgs } = await authClient.organization.list();
        if (orgs && orgs.length > 0) {
          router.push(`/w/${orgs[0].slug}/dashboard`);
        } else {
          router.push("/onboarding");
        }
      } catch (err) {
        router.push("/onboarding");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500">Enter your email and password to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="name@example.com"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password</label>
            <Link href="#" className="text-sm text-gray-500 hover:text-black dark:hover:text-white">Forgot password?</Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link href="/signup" className="text-black dark:text-white hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
