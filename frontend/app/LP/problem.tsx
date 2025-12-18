import React from "react";

export const Problem = () => {
  return (
    <section className="py-24 border-t border-zinc-100 bg-zinc-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">
              Job searching is high-entropy by nature.
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Between LinkedIn Easy Applies, referral links, and direct emails,
              your application history quickly becomes a fragmented mess of
              browser tabs and forgotten dates.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold">
                  !
                </div>
                <p className="text-sm text-zinc-600">
                  <span className="text-zinc-900 font-medium italic">
                    Where did I find that role again?
                  </span>{" "}
                  — Fragmented sources leads to missed details.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold">
                  !
                </div>
                <p className="text-sm text-zinc-600">
                  <span className="text-zinc-900 font-medium italic">
                    Did I ever follow up?
                  </span>{" "}
                  — Lack of reminders costs you opportunities.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-zinc-200 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white border border-zinc-200 p-8 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-zinc-100 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-zinc-100 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-100 rounded animate-pulse"></div>
                <div className="pt-4 border-t border-zinc-100 flex gap-2">
                  <div className="h-6 w-16 bg-red-50 border border-red-100 rounded text-[10px] text-red-500 flex items-center justify-center font-bold">
                    STALE
                  </div>
                  <div className="h-6 w-24 bg-zinc-50 border border-zinc-100 rounded text-[10px] text-zinc-400 flex items-center justify-center font-bold">
                    EXCEL_MESS.XLSX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
