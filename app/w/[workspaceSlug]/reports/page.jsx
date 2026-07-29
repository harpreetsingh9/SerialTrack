"use client";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Analyze product registration and replacement trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> Last 30 Days
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Monthly Entries</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-400 text-sm">Bar Chart Placeholder</p>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Replacement Trends</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-400 text-sm">Line Chart Placeholder</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Most Used Categories</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-400 text-sm">Pie Chart or Horizontal Bar Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
