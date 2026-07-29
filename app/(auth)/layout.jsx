import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-xs leading-none">S</span>
            </div>
            <span className="font-bold tracking-tight">SerialTrack</span>
          </Link>
          {children}
        </div>
      </div>
      <div className="hidden md:block bg-gray-50 dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 p-8">
        <div className="h-full rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 flex items-end">
          <div className="space-y-4">
            <p className="text-xl font-medium text-balance">
              "SerialTrack completely changed how we manage our warranty claims. No more messy spreadsheets."
            </p>
            <p className="text-sm text-gray-500">
              — Owner, Guru Nanak Electricals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
