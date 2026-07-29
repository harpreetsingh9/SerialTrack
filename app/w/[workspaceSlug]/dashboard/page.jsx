import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import Customer from "@/models/Customer";

export default async function DashboardPage({ params }) {
  const { workspaceSlug } = await params;

  await connect();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Dynamic Statistics
  const totalProducts = await Product.countDocuments({ workspaceId: workspaceSlug });
  const replacedProducts = await Product.countDocuments({ workspaceId: workspaceSlug, status: "Replaced" });
  const todaysEntries = await Product.countDocuments({
    workspaceId: workspaceSlug,
    createdAt: { $gte: startOfToday },
  });

  // Dynamic Recent Entries
  const recentProductsRaw = await Product.find({ workspaceId: workspaceSlug })
    .populate("customerId")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const recentProducts = recentProductsRaw.map((p) => ({
    id: p._id.toString(),
    serialNumber: p.serialNumber,
    productName: p.productName,
    brand: p.brand || "",
    customerName: p.customerId ? p.customerId.name : "N/A",
    createdAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "",
  }));

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      {/* Top Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <Package className="h-4 w-4 text-blue-600" />
            Total Products
          </div>
          <div className="text-3xl font-bold">{totalProducts.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-2">Active workspace inventory</p>
        </div>
        
        {/* Replaced Products */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <RefreshCw className="h-4 w-4 text-orange-500" />
            Replaced Products
          </div>
          <div className="text-3xl font-bold">{replacedProducts.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-2">Lifetime replacements</p>
        </div>

        {/* Expiring Soon (Kept as requested) */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            Expiring Soon
          </div>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-gray-500 mt-2">Warranties expiring this month</p>
        </div>

        {/* Today's Entries */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Today's Entries
          </div>
          <div className="text-3xl font-bold">{todaysEntries.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-2">Products registered today</p>
        </div>
      </div>

      {/* Main Grid: Recent Entries & Recent Replacements */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Dynamic Recent Entries (4 cols) */}
        <div className="col-span-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" /> Recent Entries
            </h2>
            <Link href={`/w/${workspaceSlug}/products/search`} className="text-xs text-blue-600 hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800 flex-1">
            {recentProducts.length === 0 ? (
              <div className="p-8 text-sm text-gray-500 text-center">No products registered yet.</div>
            ) : (
              recentProducts.map((product) => (
                <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{product.brand} {product.productName}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">S/N: {product.serialNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-200">
                      {product.customerName}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {product.createdAt}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Replacements Placeholder (3 cols - kept as requested) */}
        <div className="col-span-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold text-base">Recent Replacements</h2>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <p className="text-sm text-gray-500">Replacement history list will go here.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
