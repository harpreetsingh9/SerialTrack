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
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div className="flex flex-col items-center text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Search Products</h1>
        <p className="text-gray-500 max-w-lg mb-8">
          Find warranty records by searching for serial numbers, customer names, or product details.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Serial Number, Brand, or Product..."
              className="w-full h-14 pl-12 pr-32 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 h-10 rounded-full px-6"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {results !== null && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold">
            {results.length > 0 ? `Results (${results.length})` : "No products found"}
          </h2>
          {results.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] overflow-hidden">
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
                        <td className="px-6 py-4 font-medium">{item.serialNumber}</td>
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
          )}
        </div>
      )}
    </div>
  );
}
