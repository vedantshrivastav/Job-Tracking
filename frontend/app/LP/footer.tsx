import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-zinc-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-zinc-900">Applied</span>
          <span className="text-xs text-zinc-400 ml-2 mono">© 2024</span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mono"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mono"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mono"
          >
            Security
          </a>
          <a
            href="#"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest mono"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
