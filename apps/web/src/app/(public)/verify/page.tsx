"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Award,
  QrCode,
  Building2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function CertificateSearchPage() {
  const router = useRouter();
  const [certInput, setCertInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = certInput.trim();
    if (!clean) {
      setError("Please enter a valid VTU certificate identifier or USN.");
      return;
    }
    setError(null);
    router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-16 sm:py-24 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.02] to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow Telemetry Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium shadow-sm mb-4">
          <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
          <span className="text-[#86868b]">•</span>
          <span className="text-[#0071e3] font-semibold">Official Credential Ledger</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          Verify VTU Internship <br className="hidden sm:inline" />
          <span className="text-gradient-apple-blue">Academic Certificate</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#6e6e73] max-w-2xl mx-auto leading-relaxed font-normal">
          Direct verification portal for employers, universities, and academic registrars to confirm the authenticity of SMPS Tech Lab credentials issued under Visvesvaraya Technological University.
        </p>

        {/* Verification Search Box */}
        <div className="mt-10 max-w-xl mx-auto">
          <form
            onSubmit={handleVerify}
            className="apple-card-elevated p-2 sm:p-2.5 rounded-full border border-[#e5e5ea] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center gap-2"
          >
            <div className="pl-4 text-[#86868b]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              placeholder="e.g. VTU-CERT-XXXX-SMPS-XXXX"
              className="flex-1 px-2 py-3 bg-transparent text-sm sm:text-base font-mono text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] transition active:scale-[0.98] shrink-0"
            >
              Verify Now
            </button>
          </form>

          {error && (
            <p className="mt-2 text-xs text-rose-600 font-medium">{error}</p>
          )}
        </div>

        {/* Trust & Security Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-[24px] bg-[#fbfbfd] border border-[#e5e5ea]">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071e3] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Cryptographic Hash</h3>
            <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed font-normal">
              Every certificate carries an immutable SHA-256 digital signature hash computed against the scholar’s USN and completion grade.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-[#fbfbfd] border border-[#e5e5ea]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">VTU-VRIF Center Issued</h3>
            <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed font-normal">
              Conferred by Visvesvaraya Technological University Research & Innovation Foundation campus in Bengaluru.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-[#fbfbfd] border border-[#e5e5ea]">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#d97706] flex items-center justify-center mb-3">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Instant QR Verification</h3>
            <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed font-normal">
              Physical and digital certificates include a dynamic QR code that routes directly to this authenticated university ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
