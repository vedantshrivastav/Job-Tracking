import React from "react";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold tracking-tight text-zinc-900">
              Applied
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Method
            </a>
            <a
              href=""
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Changelog
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="text-sm font-medium cursor-pointer bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 rounded-md transition-all shadow-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};
