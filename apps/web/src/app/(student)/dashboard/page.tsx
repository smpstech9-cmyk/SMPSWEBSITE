"use client";

import React from "react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/hooks/use-auth";
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  QrCode,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Cpu,
  Activity,
  Zap,
  ShoppingBag,
} from "lucide-react";

function StudentDashboardContent() {
  const { user } = useAuth();

  return (
    <div className="w-full p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Eyebrow & Keynote Title */}
      <div className="border-b border-[#e5e5ea] pb-6">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium shadow-sm">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">Scholar Workspace</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          Welcome back, <span className="text-gradient-apple-blue">{user?.full_name?.split(" ")[0] || "Scholar"}</span>
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-[#6e6e73] font-normal">
          Manage your VTU engineering cohort progress, lab assignments, attendance records, and verifiable credentials.
        </p>
      </div>

      {/* 4 Apple Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="apple-card-elevated p-5 sm:p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
          <div className="flex items-center justify-between text-[#6e6e73] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Cohort</span>
            <GraduationCap className="w-4 h-4 text-[#0071e3]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">0 Tracks</div>
          <span className="text-[11px] text-[#6e6e73] block mt-1">No enrolled batch</span>
        </div>

        <div className="apple-card-elevated p-5 sm:p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
          <div className="flex items-center justify-between text-[#6e6e73] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lab Attendance</span>
            <Activity className="w-4 h-4 text-[#86868b]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">0%</div>
          <span className="text-[11px] text-[#6e6e73] block mt-1">Minimum 85% required</span>
        </div>

        <div className="apple-card-elevated p-5 sm:p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
          <div className="flex items-center justify-between text-[#6e6e73] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Lab Practicals</span>
            <CheckCircle2 className="w-4 h-4 text-[#86868b]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">0 / 0</div>
          <span className="text-[11px] text-[#6e6e73] block mt-1">No active practicals</span>
        </div>

        <div className="apple-card-elevated p-5 sm:p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
          <div className="flex items-center justify-between text-[#6e6e73] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">VTU Certificate</span>
            <Award className="w-4 h-4 text-[#86868b]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#86868b]">None</div>
          <span className="text-[11px] text-[#6e6e73] block mt-1">Issued post-evaluation</span>
        </div>
      </div>

      {/* Empty State Onboarding Banner */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              VTU Accredited Engineering Programs
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] tracking-tight">
              Ready to begin your hands-on research internship?
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Explore available hardware cohort tracks inside the VTU-VRIF-TCOE Bengaluru facility. Gain direct access to SiC switching bays, battery cyclers, and embedded DSP testbenches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/internships"
              className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2 hover:scale-[1.01]"
            >
              <span>Explore Internship Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Assignments & Certificate Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Practical Assignments */}
        <div className="lg:col-span-7 space-y-4">
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e5ea]">
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f]">Lab Practicals & Submissions</h3>
                <span className="text-xs text-[#6e6e73]">Mandatory laboratory engineering reports</span>
              </div>
            </div>

            <div className="py-12 text-center text-xs text-[#86868b] space-y-2">
              <FileText className="w-8 h-8 text-[#86868b]/40 mx-auto" />
              <p className="font-semibold text-[#1d1d1f]">No active lab assignments</p>
              <p className="text-[#6e6e73] max-w-sm mx-auto">
                Laboratory workbooks and rubric submissions will appear here once your batch commences.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Credential Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e5ea]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#86868b]" />
                <h3 className="text-base font-bold text-[#1d1d1f]">VTU Accredited Credential</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-[#e5e5ea] font-bold">
                NOT ISSUED
              </span>
            </div>

            {/* Certificate Preview Box */}
            <div className="p-6 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center text-[#86868b] mx-auto shadow-sm">
                <Award className="w-6 h-6 text-[#86868b]" />
              </div>
              <h4 className="text-xs font-bold text-[#1d1d1f]">No Certificate Issued Yet</h4>
              <p className="text-[11px] text-[#6e6e73] max-w-xs mx-auto leading-relaxed">
                Complete your 4-week research track and maintain &ge;85% practical attendance to receive your verifiable cryptographic credential.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/verify"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition"
              >
                <QrCode className="w-4 h-4 text-[#6e6e73]" />
                <span>Search Public Credential Ledger</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <AuthGuard allowedRoles={["student", "admin", "super_admin"]}>
      <StudentDashboardContent />
    </AuthGuard>
  );
}
