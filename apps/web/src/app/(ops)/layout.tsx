"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isSaving, lastSavedAt, resetToDefaults } = useSiteContent();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
  };

  const isHub = pathname === "/ops";

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col text-[#1d1d1f] antialiased">
      {/* Minimal Top Header: Branding + Back to Hub only. No module list in the navbar. */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e5ea] px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal Branding */}
          <div className="flex items-center gap-3">
            <Link href="/ops" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-[#e5e5ea] shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/logos/SMPS.png"
                  alt="SMPS Tech Lab"
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" /> Operations Portal
                </div>
                <h1 className="text-sm font-extrabold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition">
                  SMPS Tech Lab
                </h1>
              </div>
            </Link>

            {/* Back to Operations Hub Button when inside any editor */}
            {!isHub && (
              <Link
                href="/ops"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition ml-2 sm:ml-4 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>← Back to Operations Hub</span>
              </Link>
            )}
          </div>

          {/* Right Status & Actions */}
          <div className="flex items-center gap-3">
            {/* Live Sync Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fbfbfd] border border-[#e5e5ea] text-xs">
              <span className={`w-2 h-2 rounded-full ${isSaving ? "bg-amber-400 animate-ping" : "bg-[#10b981]"}`} />
              <span className="font-medium text-[#1d1d1f] text-[11px]">
                {isSaving ? "Syncing..." : "Live Sync Active"}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] transition inline-flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3 h-3 text-[#0071e3]" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Live Site</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="p-2 rounded-full text-[#86868b] hover:text-rose-600 hover:bg-rose-50 transition"
              title="Reset to Factory Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {children}
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">Reset to Factory Default Content?</h3>
              <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                This will revert all modified hero headlines, R&D labs, internship tracks, gallery items, and global settings back to default values.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/5 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
              >
                Yes, Reset All Sections
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
