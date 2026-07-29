"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Search as SearchIcon, FileText, Users } from "lucide-react";

export default function MobileBottomNav({ workspaceSlug }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: `/w/${workspaceSlug}/dashboard`, icon: Home },
    { label: "Add", href: `/w/${workspaceSlug}/products/add`, icon: PlusCircle },
    { label: "Search", href: `/w/${workspaceSlug}/products/search`, icon: SearchIcon },
    { label: "Reports", href: `/w/${workspaceSlug}/reports`, icon: FileText },
    { label: "Team", href: `/w/${workspaceSlug}/team`, icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 md:hidden px-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Icon className={`h-5 w-5 mb-0.5 ${isActive ? "scale-110 transition-transform" : ""}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
