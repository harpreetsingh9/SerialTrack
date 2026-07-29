import Link from "next/link";
import { Search, Bell, LogOut } from "lucide-react";
import SidebarNav from "@/components/workspace/SidebarNav";
import MobileBottomNav from "@/components/workspace/MobileBottomNav";

export default async function WorkspaceLayout({ children, params }) {
  const { workspaceSlug } = await params;

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50/50 dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0a0a0a]/50 px-4 backdrop-blur sm:px-6">
        {/* Brand Logo */}
        <Link href={`/w/${workspaceSlug}/dashboard`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white dark:text-black font-extrabold text-lg leading-none tracking-tighter">S</span>
          </div>
          <span className="font-bold text-lg tracking-tight">SerialTrack</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="flex h-9 w-[180px] lg:w-[260px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-1.5 pl-9 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <button className="rounded-full border border-gray-300 dark:border-gray-700 h-9 w-9 flex items-center justify-center bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <Link
            href={`/w/${workspaceSlug}/profile`}
            className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center text-white font-medium text-xs shadow-sm cursor-pointer"
            title="View Profile"
          >
            US
          </Link>
        </div>
      </header>
      <div className="flex flex-1 pb-16 md:pb-0">
        <aside className="hidden w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] md:flex">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            {/* Workspace Switcher Placeholder */}
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
              <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-xs">{workspaceSlug ? workspaceSlug.charAt(0).toUpperCase() : 'W'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{workspaceSlug}</span>
                <span className="text-xs text-gray-500 mt-1">Free Plan</span>
              </div>
            </div>
          </div>
          <SidebarNav workspaceSlug={workspaceSlug} />
          <div className="mt-auto p-4">
             <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/50 w-full text-sm font-medium">
               <LogOut className="h-4 w-4" />
               Log out
             </button>
          </div>
        </aside>
        <main className="flex flex-1 flex-col p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
      <MobileBottomNav workspaceSlug={workspaceSlug} />
    </div>
  );
}
