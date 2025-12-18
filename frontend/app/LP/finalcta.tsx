import React from "react";

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 border-t border-zinc-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
          Focus on the interview, not the spreadsheet.
        </h2>
        <p className="text-lg text-zinc-500 mb-10 leading-relaxed">
          Applied is currently in private beta. Join our early access program to
          get started with the workspace that moves as fast as you do.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white rounded-md font-bold hover:bg-zinc-800 transition-all shadow-md">
            Join the Beta Waitlist
          </button>
          <a
            href="#"
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Read our privacy manifest →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
