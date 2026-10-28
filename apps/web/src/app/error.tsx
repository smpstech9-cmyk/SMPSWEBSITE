"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Ambient Red Glow for error context */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-rose-100/30 via-amber-50/20 to-blue-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-lg w-full text-center space-y-7 animate-in fade-in duration-500">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
            An unexpected error occurred
          </h1>
          <p className="mt-2 text-sm text-[#6e6e73] leading-relaxed max-w-md mx-auto">
            The application encountered a transient runtime exception. Our automated health monitor has logged the error report.
          </p>
          {error.digest && (
            <p className="mt-2 text-[11px] font-mono text-[#86868b] bg-[#fbfbfd] px-3 py-1 rounded-full border border-[#e5e5ea] inline-block">
              Digest ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold shadow-sm transition active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            Reload & Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] text-[#1d1d1f] text-xs sm:text-sm font-semibold transition shadow-xs"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
