"use client";

import { useEffect, useState } from "react";

export function ApiProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    const originalFetch = window.fetch;

    // Intercept global fetch
    window.fetch = async function (...args) {
      setActiveRequests((prev) => prev + 1);
      try {
        const response = await originalFetch.apply(this, args);
        return response;
      } finally {
        setActiveRequests((prev) => Math.max(0, prev - 1));
      }
    };

    return () => {
      window.fetch = originalFetch; // Restore on unmount
    };
  }, []);

  return (
    <>
      {activeRequests > 0 && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-obsidian/20 backdrop-blur-[1px] pointer-events-none animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-obsidian/60 border border-travertine/10 shadow-2xl backdrop-blur-xl">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-[3px] border-travertine/10 rounded-full" />
              <div className="absolute inset-0 border-[3px] border-t-accent rounded-full animate-spin" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent/80 font-light ml-[0.5em]"></span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
