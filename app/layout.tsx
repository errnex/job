import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Builder ATS & Modern Resume Generator",
  description: "Buat CV ATS-friendly dan modern, lalu download PDF atau DOCX."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/builder", label: "Builder" },
  { href: "/preview", label: "Preview" },
  { href: "/my-resumes", label: "My Resumes" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur no-print dark:border-slate-800 dark:bg-slate-950/95">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="font-semibold tracking-tight text-slate-950 dark:text-white">
              CV Builder
            </Link>
            <div className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/builder"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Create My CV
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
