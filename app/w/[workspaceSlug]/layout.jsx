import Link from "next/link";
import { Search, Bell, Home, Package, PlusCircle, Search as SearchIcon, FileText, Settings, LogOut, Users } from "lucide-react";

export default async function WorkspaceLayout({ children, params }) {
  const { workspaceSlug } = await params;

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50/50 dark:bg-[#0a0a0a]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0a0a0a]/50 px-4 backdrop-blur sm:px-6">
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search products, serial numbers..."
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <button className="rounded-full border border-gray-300 dark:border-gray-700 h-10 w-10 flex items-center justify-center bg-white dark:bg-black">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
            US
          </div>
        </div>
      </header>
      <div className="flex flex-1">
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
          <nav className="grid items-start px-2 py-4 text-sm font-medium gap-1">
            <Link
              href={`/w/${workspaceSlug}/dashboard`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href={`/w/${workspaceSlug}/products/add`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Link>
            <Link
              href={`/w/${workspaceSlug}/products/search`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <SearchIcon className="h-4 w-4" />
              Search Product
            </Link>
            <Link
              href={`/w/${workspaceSlug}/reports`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href={`/w/${workspaceSlug}/team`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <Users className="h-4 w-4" />
              Team & Members
            </Link>
            <Link
              href={`/w/${workspaceSlug}/settings`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
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
    </div>
  );
}
