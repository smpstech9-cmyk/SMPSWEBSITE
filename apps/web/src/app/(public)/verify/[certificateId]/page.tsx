"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  QrCode,
  Download,
  Share2,
  Printer,
  Building2,
  Calendar,
  Clock,
  ArrowLeft,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface CertificateRecord {
  certificate_id: string;
  status: string;
  student_name: string;
  usn: string;
  college_name: string;
  program_title: string;
  domain: string;
  batch_code: string;
  duration_weeks: number;
  attendance_percent: string | number;
  issue_date: string;
  issuer: string;
  digital_signature_hash: string;
}

export default function CertificateResultPage() {
  const params = useParams();
  const certId = (params.certificateId as string) || "";

  const [certData, setCertData] = useState<CertificateRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function fetchVerification() {
      if (!certId) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/v1/internships/verify/${encodeURIComponent(certId)}`);
        if (res.ok) {
          const data = await res.json();
          setCertData(data);
        } else {
          setCertData(null);
          setError(`Certificate identifier "${certId}" was not found on the official VTU-VRIF ledger.`);
        }
      } catch {
        setCertData(null);
        setError(`Unable to connect to VTU verification ledger. Please check certificate ID "${certId}".`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVerification();
  }, [certId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    if (!certData) return;
    const originalTitle = document.title;
    document.title = `VTU-Certificate-${certData.certificate_id}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-[#1d1d1f] py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
          Querying VTU Cryptographic Certificate Ledger...
        </p>
      </div>
    );
  }

  if (error || !certData) {
    return (
      <div className="min-h-screen bg-white text-[#1d1d1f] py-16 px-4 flex items-center justify-center">
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-8 sm:p-12 max-w-lg w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-[#1d1d1f]">Certificate Not Found</h1>
          <p className="text-xs text-[#6e6e73] leading-relaxed">
            {error || "The requested certificate identifier could not be verified against the official university registry."}
          </p>
          <div className="pt-4">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold hover:bg-[#0077ed] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Search</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-12 sm:py-20 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden print:py-0">
      {/* Soft Ambient Radial Backlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.02] to-transparent rounded-full blur-[130px] pointer-events-none print:hidden" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 print:max-w-none print:p-0">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <Link
            href="/verify"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6e6e73] hover:text-[#0071e3] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Search Another Credential</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied" : "Share Verification"}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Certificate (PDF)</span>
            </button>
          </div>
        </div>

        {/* Verification Verified Status Banner */}
        <div className="apple-card-elevated rounded-[24px] border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-wider text-[#059669] uppercase">
                  Verified Authentic Credential
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              </div>
              <p className="text-xs text-[#065f46] mt-0.5">
                Officially validated on the Visvesvaraya Technological University (VTU) - VRIF institutional ledger.
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-[#065f46] block text-[10px] uppercase">Certificate ID</span>
            <span className="font-bold text-[#1d1d1f]">{certData.certificate_id}</span>
          </div>
        </div>

        {/* Official Certificate Visual Presentation */}
        <div className="apple-card-elevated rounded-[32px] border-2 border-[#e5e5ea] bg-gradient-to-br from-white via-[#fbfbfd] to-[#f5f5f7] p-8 sm:p-14 shadow-2xl relative overflow-hidden space-y-8 text-center print:border-2 print:border-amber-600/40 print:rounded-none print:shadow-none print:p-8 print:bg-white">
          {/* Top Crest & University Seal */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#eab308] via-[#fef08a] to-[#ca8a04] flex items-center justify-center text-white shadow-lg border-2 border-white">
              <Award className="w-10 h-10 text-amber-950" />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#0071e3] pt-1">
              Visvesvaraya Technological University • VRIF Center
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
              Certificate of Completion
            </h2>
            <p className="text-xs font-mono text-[#6e6e73]">
              VTU Research & Innovation Foundation Center, Bengaluru
            </p>
          </div>

          {/* Student & Course Details */}
          <div className="space-y-4 max-w-2xl mx-auto py-4">
            <p className="text-xs uppercase tracking-widest text-[#86868b] font-medium">
              This is to certify that
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              {certData.student_name}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-mono font-semibold text-[#1d1d1f]">
              <span>USN: {certData.usn}</span>
              <span>•</span>
              <span className="truncate max-w-[280px]">{certData.college_name}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pt-2">
              has successfully completed the intensive <strong className="text-[#1d1d1f]">{certData.duration_weeks}-Week Hands-On Practical Internship</strong> in
            </p>
            <p className="text-base sm:text-xl font-bold text-[#0071e3]">
              {certData.program_title}
            </p>
            <p className="text-xs text-[#6e6e73]">
              conducted at the <span className="font-semibold text-[#1d1d1f]">VTU-VRIF-TCOE Campus Facility</span>, Bengaluru with a verified attendance of <span className="font-bold text-[#059669]">{certData.attendance_percent}%</span> and final academic grade of <span className="font-bold text-[#059669]">Outstanding (O)</span>.
            </p>
          </div>

          {/* Signatures & Security Validation */}
          <div className="pt-10 border-t border-[#e5e5ea] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-center items-center">
            <div>
              <div className="font-serif italic text-base sm:text-lg text-[#1d1d1f]">Dr. K. S. Narayanaswamy</div>
              <span className="text-[11px] text-[#6e6e73] block mt-0.5">Director of Research, VTU-VRIF</span>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
                <QrCode className="w-14 h-14 text-[#1d1d1f]" />
              </div>
              <span className="text-[10px] font-mono text-[#6e6e73] block">
                {certData.certificate_id}
              </span>
            </div>
            <div>
              <div className="font-serif italic text-base sm:text-lg text-[#1d1d1f]">Er. Shiv Bhalke</div>
              <span className="text-[11px] text-[#6e6e73] block mt-0.5">Managing Director, SMPS Electric Control</span>
            </div>
          </div>

          {/* Cryptographic Hash Ribbon */}
          <div className="pt-4 border-t border-[#e5e5ea] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6e6e73] gap-2">
            <span>Issue Date: <strong className="text-[#1d1d1f]">{certData.issue_date}</strong></span>
            <span className="font-mono text-[10px] text-[#86868b]">{certData.digital_signature_hash}</span>
          </div>
        </div>

        {/* Institutional Verification Footer */}
        <div className="p-6 rounded-[24px] bg-[#fbfbfd] border border-[#e5e5ea] text-xs text-[#6e6e73] flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#0071e3] shrink-0" />
            <span>
              Issued under Visvesvaraya Technological University - Research & Innovation Foundation (VTU-VRIF-TCOE), Nagarbhavi, Bengaluru.
            </span>
          </div>
          <Link href="/about" className="text-[#0071e3] font-semibold hover:underline shrink-0">
            About Facility &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
