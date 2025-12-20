import type { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white">
        <div className="p-6 font-bold text-lg text-zinc-900">Job Tracker</div>

        <nav className="px-4 space-y-1 text-sm">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/jobs"
            className="block rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Jobs
          </Link>

          <Link
            href="/dashboard/analytics"
            className="block rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Analytics
          </Link>

          <Link
            href="/dashboard/follow-ups"
            className="block rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Follow Ups
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
