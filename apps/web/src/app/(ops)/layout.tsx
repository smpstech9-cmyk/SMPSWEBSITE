"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  ExternalLink,
  RotateCcw,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

const OPS_AUTH_KEY = "smps_ops_authorized_session_v1";

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isSaving, lastSavedAt, resetToDefaults } = useSiteContent();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check if previously authenticated in this browser
    const stored = typeof window !== "undefined" ? localStorage.getItem(OPS_AUTH_KEY) : null;
    setIsAuthenticated(stored === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Required Credentials:
    // Username: Smpstechlab@gmail.com
    // Password: Smpstechlab
    if (cleanUser === "smpstechlab@gmail.com" && cleanPass === "Smpstechlab") {
      if (typeof window !== "undefined") {
        localStorage.setItem(OPS_AUTH_KEY, "true");
      }
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError("Invalid username or password. Access to Operations Portal denied.");
    }
    setIsVerifying(false);
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(OPS_AUTH_KEY);
    }
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setAuthError(null);
  };

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
  };

  const isHub = pathname === "/ops";

  // Loading state while checking localStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0071e3] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Locked State: Render Professional Authentication Gatekeeper
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 sm:p-6 text-[#1d1d1f] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent pointer-events-none rounded-full blur-[100px]" />

        <div className="w-full max-w-md relative z-10">
          {/* Main Auth Card */}
          <div className="bg-white rounded-[28px] border border-[#e5e5ea] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-6">
            {/* Header Badge & Brand */}
            <div className="text-center space-y-3">
              <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] p-2 flex items-center justify-center shadow-xs">
                <Image
                  src="/logos/SMPS.png"
                  alt="SMPS Tech Lab"
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Restricted Access</span>
              </div>

              <h1 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                Operations Portal
              </h1>
              <p className="text-xs text-[#6e6e73] leading-relaxed max-w-xs mx-auto">
                Sign in with authorized administrative credentials to access live CMS orchestration.
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1d1d1f] tracking-wide block">
                  Username / Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Smpstechlab@gmail.com"
                    autoComplete="username"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium text-[#1d1d1f] placeholder:text-[#86868b] focus:bg-white focus:border-[#0071e3] focus:outline-none transition shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1d1d1f] tracking-wide block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter portal password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium text-[#1d1d1f] placeholder:text-[#86868b] focus:bg-white focus:border-[#0071e3] focus:outline-none transition shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] p-1 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs tracking-wide shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Operations Portal</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#e5e5ea] text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6e6e73] hover:text-[#0071e3] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated State: Full Operations Portal Layout
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col text-[#1d1d1f] antialiased">
      {/* Top Header */}
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
          <div className="flex items-center gap-2.5 sm:gap-3">
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

            {/* Lock / Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold transition"
              title="Lock Operations Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Portal</span>
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
