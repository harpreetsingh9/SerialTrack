import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "SerialTrack | Modern Product Warranty Management",
  description: "Manage product warranty records without Excel sheets. The clean, elegant SaaS platform for serial-number-based products.",
};

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 h-20 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-xl leading-none tracking-tighter">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight">SerialTrack</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="#features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-black dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            Log in
          </Link>
          <Link href="/signup">
            <Button className="rounded-full px-6">Start Free Trial</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 md:py-32 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-sm mb-8 bg-gray-50 dark:bg-gray-900/50">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            SerialTrack 2.0 is now available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight mb-8">
            Manage Product Warranty Records <br className="hidden md:block"/> Without Excel Sheets.
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl text-balance">
            The elegant, premium SaaS platform for managing serial-number-based products. Built for speed, designed for clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                Start for free
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-12 px-8">
                Book a demo
              </Button>
            </Link>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 p-2 md:p-4 aspect-video shadow-2xl relative overflow-hidden flex items-center justify-center">
            {/* Placeholder for dashboard preview image or video */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10"></div>
            <p className="text-gray-400 dark:text-gray-600 font-medium">Dashboard Preview</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-xs leading-none">S</span>
            </div>
            <span className="font-bold tracking-tight">SerialTrack</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} SerialTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
