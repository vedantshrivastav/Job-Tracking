import React from "react";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-zinc-400"></span>
          <span className="text-xs font-medium text-zinc-600 mono uppercase tracking-wider">
            Now in private beta
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
          The professional way to manage your job search.
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 mb-10 leading-relaxed max-w-2xl">
          Move away from messy spreadsheets and inconsistent notes. Applied is a
          streamlined workspace designed for developers to track opportunities,
          interview feedback, and follow-ups.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3 bg-zinc-900 text-white rounded-md font-medium hover:bg-zinc-800 transition-all shadow-sm">
            Get Started for Free
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-white text-zinc-600 border border-zinc-200 rounded-md font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-all">
            View Sample Board
          </button>
        </div>
        <div className="mt-12 flex items-center gap-6 text-zinc-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-xs font-medium uppercase tracking-widest mono">
              No Ads
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-xs font-medium uppercase tracking-widest mono">
              No Tracking
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-xs font-medium uppercase tracking-widest mono">
              GDPR Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
