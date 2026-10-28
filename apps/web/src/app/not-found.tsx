import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, GraduationCap, Cpu, ShoppingBag, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Subtle Apple Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-purple-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in duration-500">
        {/* Brand Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          404 • Resource Not Found
        </div>

        {/* 404 Headline */}
        <div>
          <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-[#1d1d1f] leading-none">
            404
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            The page you’re looking for can’t be found.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e6e73] leading-relaxed max-w-md mx-auto">
            The URL may be mistyped, or the laboratory documentation might have relocated within our Bengaluru VTU facility directory.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold shadow-sm transition active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] text-[#1d1d1f] text-xs sm:text-sm font-semibold transition shadow-xs"
          >
            Contact Lab Support
          </Link>
        </div>

        {/* Quick Discovery Directory Cards */}
        <div className="pt-8 border-t border-[#e5e5ea] text-left">
          <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider text-center mb-4">
            Popular Facility Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/internships"
              className="p-4 rounded-2xl bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] hover:border-[#0071e3]/40 transition group"
            >
              <GraduationCap className="w-5 h-5 text-[#0071e3] mb-2 group-hover:scale-110 transition" />
              <p className="text-xs font-bold text-[#1d1d1f]">VTU Internships</p>
              <p className="text-[11px] text-[#6e6e73] mt-0.5">Hands-on lab programs</p>
            </Link>

            <Link
              href="/store"
              className="p-4 rounded-2xl bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] hover:border-[#0071e3]/40 transition group"
            >
              <Cpu className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition" />
              <p className="text-xs font-bold text-[#1d1d1f]">Hardware R&D</p>
              <p className="text-[11px] text-[#6e6e73] mt-0.5">BESS & SaralaChip</p>
            </Link>

            <Link
              href="/verify"
              className="p-4 rounded-2xl bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] hover:border-[#0071e3]/40 transition group"
            >
              <Search className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition" />
              <p className="text-xs font-bold text-[#1d1d1f]">Verify Certificate</p>
              <p className="text-[11px] text-[#6e6e73] mt-0.5">SHA-256 digital attestation</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
