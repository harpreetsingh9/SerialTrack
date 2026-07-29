"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function AddProductPage() {
  const params = useParams();
  const workspaceSlug = params?.workspaceSlug || "";

  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [products, setProducts] = useState([
    { serialNumber: "", productName: "Compressor", brand: "", category: "Air Conditioner", modelNumber: "", warrantyStart: "", warrantyEnd: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addRow = () => {
    setProducts([...products, { serialNumber: "", productName: "Compressor", brand: "", category: "Air Conditioner", modelNumber: "", warrantyStart: "", warrantyEnd: "" }]);
  };

  const removeRow = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceSlug,
          customerInfo,
          products,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save products");
      }

      setMessage(data.message || "Records saved successfully!");
      setCustomerInfo({ name: "", phone: "", address: "" });
      setProducts([
        { serialNumber: "", productName: "Compressor", brand: "", category: "Air Conditioner", modelNumber: "", warrantyStart: "", warrantyEnd: "" }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <p className="text-gray-500 mt-1">Register new products and generate warranty records.</p>
      </div>

      {message && (
        <div className="p-4 rounded-lg bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-200 dark:border-green-800">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Customer Name</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Address</label>
              <input
                type="text"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Product Information</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-medium">Serial Number</label>
                  <input
                    type="text"
                    value={product.serialNumber}
                    onChange={(e) => handleProductChange(index, "serialNumber", e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-medium">Product / Category</label>
                  <input
                    type="text"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="e.g. Compressor"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Brand</label>
                  <input
                    type="text"
                    value={product.brand}
                    onChange={(e) => handleProductChange(index, "brand", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Warranty</label>
                  <input
                    type="date"
                    value={product.warrantyEnd}
                    onChange={(e) => handleProductChange(index, "warrantyEnd", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="flex items-end pb-1 justify-end">
                  {products.length > 1 && (
                    <button type="button" onClick={() => removeRow(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={addRow} className="mt-4 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add another product
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" size="lg" disabled={loading} className="px-8">
            {loading ? "Saving..." : "Save Records"}
          </Button>
        </div>
      </form>
    </div>
  );
}
