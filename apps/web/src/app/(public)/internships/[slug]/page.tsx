"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Clock,
  Laptop,
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  Download,
  ArrowRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { ApplicationModal } from "@/components/internships/application-modal";
import { Batch } from "@/types";
import { useSiteContent } from "@/context/content-context";

export default function InternshipDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "vtu-power-electronics-smps";
  const { content } = useSiteContent();

  const [activeTab, setActiveTab] = useState<"overview" | "syllabus" | "outcomes" | "eligibility" | "faqs">("overview");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  const matchedTrack = content.internships.find((i) => i.slug === slug || i.id === slug);
  const effectiveApplyUrl = matchedTrack?.applyPortalUrl || "";

  // Available batches for this program
  const defaultBatches: Batch[] = [
    {
      id: "e1000000-0000-0000-0000-000000000001",
      program_id: "d1000000-0000-0000-0000-000000000001",
      batch_code: "VTU-PE-2026-B1",
      start_date: "2026-11-15",
      end_date: "2026-12-15",
      mode: "OFFLINE_BENGALURU_VTU",
      location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
      capacity: 30,
      enrolled_count: 1,
      price_inr: "6500.00",
      is_open: true,
    },
    {
      id: "e1000000-0000-0000-0000-000000000002",
      program_id: "d1000000-0000-0000-0000-000000000001",
      batch_code: "VTU-PE-2026-B2",
      start_date: "2026-12-20",
      end_date: "2027-01-20",
      mode: "OFFLINE_BENGALURU_VTU",
      location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
      capacity: 30,
      enrolled_count: 0,
      price_inr: "6500.00",
      is_open: true,
    },
  ];

  // Normalized display program data
  const programData = {
    title: slug === "vtu-power-electronics-smps" 
      ? "Power Electronics & High-Frequency SMPS Design" 
      : slug === "vtu-ev-bms-embedded" 
      ? "EV Battery Management Systems (BMS) & Firmware" 
      : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    subtitle: matchedTrack?.description || "Accredited hands-on engineering lab internship hosted at VTU-VRIF-TCOE Center, Nagarbhavi.",
    price: matchedTrack?.price || "₹6,500",
    duration: matchedTrack?.duration || "4 Weeks (Hands-on)",
    mode: matchedTrack?.mode || "Bengaluru VTU Facility",
    level: matchedTrack?.level || "3rd / 4th Year B.E. & M.Tech",
    startDate: matchedTrack?.upcomingBatchDate || "15 Nov 2026",
    deadline: "10 Nov 2026",
    certificate: "VTU QR-Verifiable Certificate",
  };

  const keyOutcomes = [
    "Hands-on projects with industrial power & IoT simulation testbenches",
    "Mentorship from industry experts and university researchers",
    "VTU recognized Certificate of Completion with verifiable QR code",
    "Flexible hybrid learning mode with practical offline lab sessions",
    "Direct experience with production tools, Git workflows, and CI/CD pipelines",
  ];

  const syllabusModules = [
    { week: "Module 1", title: "Foundations & Architecture", desc: "Core engineering principles, dev environment setup, and system design." },
    { week: "Module 2", title: "Frontend & Interface Engineering", desc: "React, Next.js, responsive state management, and modern CSS frameworks." },
    { week: "Module 3", title: "Backend API & Database Systems", desc: "RESTful architecture, FastAPI / Node.js, PostgreSQL schema design, and ORM." },
    { week: "Module 4", title: "Industrial Capstone Project", desc: "Building, testing, documenting, and deploying a functional production deliverable." },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* 1. HERO SECTION - Apple Keynote Template */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-black/[0.06] bg-[#fbfbfd]">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="text-xs text-[#6e6e73] font-medium mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0071e3]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/internships" className="hover:text-[#0071e3]">Internships</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">{programData.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
                <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
                <span className="text-[#86868b]">•</span>
                <span className="text-[#0071e3] font-semibold">Bengaluru, India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#1d1d1f] leading-tight">
                {programData.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed">
                {programData.subtitle}
              </p>

              {/* Badges row */}
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#6e6e73]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0071e3]" /> {programData.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-[#0071e3]" /> {programData.mode}
                </span>
                <span>•</span>
                <span className="bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f] px-3 py-1 rounded-full font-medium text-xs">
                  {programData.level}
                </span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 flex-shrink-0">
              <div className="text-3xl sm:text-4xl font-black text-[#1d1d1f] tracking-tight">
                {programData.price}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (effectiveApplyUrl) {
                      window.open(effectiveApplyUrl, "_blank", "noopener,noreferrer");
                    } else {
                      setIsApplyModalOpen(true);
                    }
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
                >
                  Apply for Batch
                </button>
                <button
                  type="button"
                  onClick={() => alert("Brochure download initiated.")}
                  className="px-6 py-3.5 rounded-full bg-white border border-[#e5e5ea] hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-sm transition flex items-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#6e6e73]" /> Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT TABS & SPECIFICATIONS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apple Tabs Bar */}
          <div className="flex items-center gap-8 border-b border-[#e5e5ea] mb-10 overflow-x-auto text-sm font-semibold">
            {(["overview", "syllabus", "outcomes", "eligibility", "faqs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 border-b-2 transition whitespace-nowrap capitalize ${
                  activeTab === tab
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                {tab === "faqs" ? "FAQs" : tab === "outcomes" ? "Key Outcomes" : tab}
              </button>
            ))}
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Details */}
            <div className="lg:col-span-8 space-y-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="apple-card p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-[#fbfbfd]">
                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                      Program Overview
                    </h3>
                    <p className="text-base text-[#6e6e73] leading-relaxed font-normal">
                      Designed in collaboration with VTU faculty and SMPS Electric Control R&D engineers, this program delivers comprehensive, practical engineering experience. Students build production-ready projects under active guidance, gaining mastery over industry tools, documentation standards, and deployment pipelines.
                    </p>
                  </div>

                  <div className="apple-card p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white shadow-sm">
                    <h4 className="text-lg font-bold text-[#1d1d1f] mb-4">
                      What You Will Gain:
                    </h4>
                    <ul className="space-y-3.5">
                      {keyOutcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#1d1d1f]">
                          <CheckCircle2 className="w-5 h-5 text-[#0071e3] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">Course Curriculum</h3>
                  {syllabusModules.map((m, idx) => (
                    <div key={idx} className="p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm hover:border-[#0071e3]/40 transition">
                      <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">{m.week}</span>
                      <h4 className="text-base font-bold text-[#1d1d1f] mt-1">{m.title}</h4>
                      <p className="text-sm text-[#6e6e73] mt-1.5 leading-relaxed font-normal">{m.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "outcomes" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">Graduate Outcomes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {keyOutcomes.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#059669] mb-3" />
                        <p className="text-sm text-[#1d1d1f] font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "eligibility" && (
                <div className="p-8 rounded-[28px] border border-[#e5e5ea] bg-[#fbfbfd] space-y-4">
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Eligibility Criteria</h3>
                  <ul className="space-y-2.5 text-sm text-[#6e6e73] list-disc pl-5 leading-relaxed font-normal">
                    <li>Enrolled in VTU affiliated or recognized Indian Engineering Colleges.</li>
                    <li>Branches: CSE, ISE, ECE, EEE, Mechanical, or allied departments.</li>
                    <li>Semester 4, 5, 6, 7 or 8 students, or recent graduates.</li>
                    <li>Basic knowledge of programming and enthusiasm for hands-on building.</li>
                  </ul>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">Frequently Asked Questions</h3>
                  <div className="p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
                    <h4 className="text-sm font-bold text-[#1d1d1f]">Is this internship accredited by VTU?</h4>
                    <p className="text-xs sm:text-sm text-[#6e6e73] mt-1.5 leading-relaxed font-normal">Yes, SMPS Electric Control is housed in the VTU-VRIF-TCOE center and certificates fulfill mandatory university academic credits.</p>
                  </div>
                  <div className="p-6 rounded-[24px] border border-[#e5e5ea] bg-white shadow-sm">
                    <h4 className="text-sm font-bold text-[#1d1d1f]">Can I attend online?</h4>
                    <p className="text-xs sm:text-sm text-[#6e6e73] mt-1.5 leading-relaxed font-normal">Yes, hybrid options allow remote live lectures and online project reviews with optional weekend lab access in Bengaluru.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Key Information Card */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-[28px] border border-[#e5e5ea] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-6">
                <h3 className="text-base font-bold text-[#1d1d1f] border-b border-[#e5e5ea] pb-3">
                  Key Information
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0071e3]" /> Duration
                    </span>
                    <span className="font-semibold text-[#1d1d1f]">{programData.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73] flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[#0071e3]" /> Mode
                    </span>
                    <span className="font-semibold text-[#1d1d1f]">{programData.mode}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0071e3]" /> Start Date
                    </span>
                    <span className="font-semibold text-[#1d1d1f]">{programData.startDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" /> Application Deadline
                    </span>
                    <span className="font-semibold text-red-600">{programData.deadline}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#059669]" /> Certificate
                    </span>
                    <span className="font-semibold text-[#1d1d1f]">{programData.certificate}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e5e5ea]">
                  <button
                    type="button"
                    onClick={() => {
                      if (effectiveApplyUrl) {
                        window.open(effectiveApplyUrl, "_blank", "noopener,noreferrer");
                      } else {
                        setIsApplyModalOpen(true);
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{effectiveApplyUrl ? "Apply via Application Portal" : "Enroll Now"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive VTU Internship Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        programTitle={programData.title}
        batches={defaultBatches}
      />
    </div>
  );
}
