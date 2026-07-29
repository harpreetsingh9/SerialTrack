"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Search as SearchIcon, FileText, Users, Settings } from "lucide-react";

export default function SidebarNav({ workspaceSlug }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: `/w/${workspaceSlug}/dashboard`, icon: Home },
    { label: "Add Product", href: `/w/${workspaceSlug}/products/add`, icon: PlusCircle },
    { label: "Search Product", href: `/w/${workspaceSlug}/products/search`, icon: SearchIcon },
    { label: "Reports", href: `/w/${workspaceSlug}/reports`, icon: FileText },
    { label: "Team & Members", href: `/w/${workspaceSlug}/team`, icon: Users },
    { label: "Settings", href: `/w/${workspaceSlug}/settings`, icon: Settings },
  ];

  return (
    <nav className="grid items-start px-2 py-4 text-sm font-medium gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive
                ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
