import React from "react";

const DashboardPreview: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">
          Focused on the interface.
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto">
          We removed the clutter. Applied is optimized for rapid entry and
          high-level visibility.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl rounded-xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
        {/* Mock OS Header */}
        <div className="h-10 bg-zinc-50 border-b border-zinc-200 flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200"></div>
          <div className="ml-4 h-4 w-32 bg-zinc-100 rounded"></div>
        </div>

        {/* Mock App Sidebar */}
        <div className="flex h-[500px]">
          <div className="w-48 border-r border-zinc-100 p-4 space-y-4 hidden md:block">
            <div className="h-4 w-full bg-zinc-100 rounded"></div>
            <div className="h-4 w-3/4 bg-zinc-50 rounded"></div>
            <div className="h-4 w-5/6 bg-zinc-50 rounded"></div>
            <div className="pt-4 mt-4 border-t border-zinc-100 space-y-3">
              <div className="h-3 w-1/2 bg-zinc-50 rounded"></div>
              <div className="h-3 w-2/3 bg-zinc-50 rounded"></div>
            </div>
          </div>

          {/* Mock Board Content */}
          <div className="flex-grow p-6 bg-zinc-50/50">
            <div className="flex gap-4 h-full">
              {/* Column: To Apply */}
              <div className="w-1/3 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    To Apply
                  </span>
                  <span className="text-[10px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">
                    4
                  </span>
                </div>
                <div className="bg-white p-3 rounded border border-zinc-200 shadow-sm space-y-2">
                  <div className="h-3 w-3/4 bg-zinc-900/10 rounded"></div>
                  <div className="h-2 w-1/2 bg-zinc-400/10 rounded"></div>
                </div>
                <div className="bg-white p-3 rounded border border-zinc-200 shadow-sm space-y-2">
                  <div className="h-3 w-2/3 bg-zinc-900/10 rounded"></div>
                  <div className="h-2 w-1/3 bg-zinc-400/10 rounded"></div>
                </div>
              </div>

              {/* Column: Applied */}
              <div className="w-1/3 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Applied
                  </span>
                  <span className="text-[10px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">
                    12
                  </span>
                </div>
                <div className="bg-white p-3 rounded border border-zinc-900/10 shadow-sm space-y-2 border-l-2 border-l-zinc-900">
                  <div className="h-3 w-3/4 bg-zinc-900/10 rounded"></div>
                  <div className="h-2 w-1/2 bg-zinc-400/10 rounded"></div>
                  <div className="flex gap-1">
                    <div className="h-4 w-12 bg-zinc-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Column: Interviewing */}
              <div className="w-1/3 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Interviewing
                  </span>
                  <span className="text-[10px] bg-zinc-900 text-white px-1.5 py-0.5 rounded">
                    2
                  </span>
                </div>
                <div className="bg-white p-3 rounded border border-zinc-200 shadow-sm space-y-2">
                  <div className="h-3 w-3/4 bg-zinc-900/10 rounded"></div>
                  <div className="h-2 w-1/2 bg-zinc-400/10 rounded"></div>
                  <div className="flex gap-1 pt-1">
                    <div className="h-4 w-16 bg-blue-50 border border-blue-100 rounded text-[8px] text-blue-500 flex items-center justify-center font-bold">
                      NEXT MON
                    </div>
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

export default DashboardPreview;
