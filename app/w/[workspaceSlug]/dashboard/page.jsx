import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";

export default async function DashboardPage({ params }) {
  const { workspaceSlug } = await params;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your product warranty records.</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/w/${workspaceSlug}/products/search`}>
            <Button variant="outline">Find Product</Button>
          </Link>
          <Link href={`/w/${workspaceSlug}/products/add`}>
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <Package className="h-4 w-4" />
            Total Products
          </div>
          <div className="text-3xl font-bold">1,248</div>
          <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +12% from last month
          </p>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <RefreshCw className="h-4 w-4" />
            Replaced Products
          </div>
          <div className="text-3xl font-bold">84</div>
          <p className="text-xs text-gray-500 mt-2">Lifetime replacements</p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <AlertCircle className="h-4 w-4" />
            Expiring Soon
          </div>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-gray-500 mt-2">Warranties expiring this month</p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Today's Entries
          </div>
          <div className="text-3xl font-bold">5</div>
          <p className="text-xs text-gray-500 mt-2">Products added today</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">Activity chart will go here.</p>
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold">Recent Replacements</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">Replacement history list will go here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
