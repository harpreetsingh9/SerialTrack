"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchProductPage() {
  const params = useParams();
  const workspaceSlug = params?.workspaceSlug || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = `/api/products/search?q=${encodeURIComponent(searchQuery)}&workspaceSlug=${encodeURIComponent(workspaceSlug)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to search products");
      }

      setResults(data.products || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col items-center text-center py-6 sm:py-12 px-2">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-4">Search Products</h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-lg mb-6 sm:mb-8">
          Find warranty records by searching for serial numbers, customer names, or product details.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 relative sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Serial Number, Brand, or Product..."
                className="w-full h-12 sm:h-14 pl-12 pr-4 sm:pr-32 rounded-xl sm:rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-sm sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto sm:absolute sm:right-2 h-11 sm:h-10 rounded-xl sm:rounded-full px-6 text-sm font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 text-sm">
          {error}
        </div>
      )}

      {results !== null && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-lg sm:text-xl font-semibold">
            {results.length > 0 ? `Results (${results.length})` : "No products found"}
          </h2>

          {results.length > 0 && (
            <>
              {/* Desktop Table View */}
              <div className="hidden sm:block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="px-6 py-4">Serial Number</th>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Warranty</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-6 py-4 font-mono font-medium">{item.serialNumber}</td>
                          <td className="px-6 py-4">{item.brand} {item.productName}</td>
                          <td className="px-6 py-4">{item.customerName}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{item.warrantyEnd}</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="outline" size="sm">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card List View */}
              <div className="grid sm:hidden gap-3">
                {results.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-4 flex flex-col gap-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                        {item.serialNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs border-y border-gray-100 dark:border-gray-800 py-2.5">
                      <div>
                        <span className="block font-medium text-gray-400">Product</span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.brand} {item.productName}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-400">Customer</span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.customerName}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-400">Warranty End</span>
                        <span className="text-gray-900 dark:text-white font-medium">{item.warrantyEnd}</span>
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <Button variant="outline" size="sm" className="w-full text-xs h-9">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
