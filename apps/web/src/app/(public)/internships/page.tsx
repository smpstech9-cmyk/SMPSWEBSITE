"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Database,
  Cpu,
  ShieldCheck,
  Radio,
  Smartphone,
  Cloud,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { InternshipTrackItem } from "@/lib/cms-store";

export default function InternshipsPage() {
  const { content } = useSiteContent();
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("All Durations");
  const [selectedMode, setSelectedMode] = useState("All Modes");

  const domains = [
    { label: "All Domains", icon: Filter },
    { label: "Power Electronics", icon: Cpu },
    { label: "Embedded Systems", icon: Radio },
    { label: "Clean Mobility", icon: Smartphone },
    { label: "Web Development", icon: Code2 },
    { label: "Data Science", icon: Database },
    { label: "Cloud Computing", icon: Cloud },
  ];

  const dynamicPrograms = (content.internships || []).map((track: InternshipTrackItem) => ({
    slug: track.slug,
    title: track.title,
    domain: track.domain,
    duration: track.duration,
    mode: track.mode,
    price: track.price || "₹6,500",
    gradient: "from-blue-600 to-indigo-700",
    description: track.description,
    targetBranches: ["ECE", "EEE", "TE"],
    icon: Cpu,
    isActive: track.isActive,
  }));

  const allPrograms = dynamicPrograms;

  const filteredPrograms = allPrograms.filter((p) => {
    const matchesDomain = selectedDomain === "All Domains" || p.domain === selectedDomain;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="w-full bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* 1. HERO SECTION - Apple Keynote Template */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-black/[0.06] bg-[#fbfbfd]">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-6">
              <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-mono text-[#6e6e73]">VTU-VRIF Facility</span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0071e3] font-semibold">Bengaluru, India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08]">
              VTU Accredited <br />
              <span className="text-gradient-apple-blue">
                Engineering Research Internships
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#6e6e73] font-normal leading-relaxed">
              Immersive, laboratory-grade hardware engineering programs hosted inside the VTU-VRIF Telecom Center of Excellence at Bengaluru. Work directly on actual battery cyclers, SiC gate drivers, and embedded systems.
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-black/[0.06] max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#1d1d1f] tracking-tight">100%</div>
                <div className="text-xs text-[#6e6e73] font-medium mt-0.5">Hands-On Lab Bays</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#059669] tracking-tight">QR Verified</div>
                <div className="text-xs text-[#6e6e73] font-medium mt-0.5">VTU Certificate</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#0071e3] tracking-tight">Industry R&D</div>
                <div className="text-xs text-[#6e6e73] font-medium mt-0.5">Direct Mentorship</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CATALOG WORKSPACE */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Filters & Apple Search Bar */}
          <div className="apple-card p-4 sm:p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] mb-10 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search internship tracks, skills (e.g. React, Python, BMS, IoT)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#e5e5ea] text-sm focus:outline-none focus:border-[#0071e3] text-[#1d1d1f] placeholder-[#86868b] shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-3.5 py-2.5 rounded-full bg-white border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] shadow-sm"
              >
                <option>All Durations</option>
                <option>3 Months</option>
                <option>6 Months</option>
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-3.5 py-2.5 rounded-full bg-white border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] shadow-sm"
              >
                <option>All Modes</option>
                <option>Online / Offline</option>
                <option>Bengaluru VTU Lab</option>
              </select>
            </div>
          </div>

          {/* Main Grid: Left Category Sidebar + Right Program Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Domain Filter Sidebar */}
            <div className="lg:col-span-1 space-y-1.5 apple-card p-4 rounded-[24px] border border-[#e5e5ea] bg-white h-fit shadow-sm">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                Filter by Domain
              </div>
              {domains.map((dom) => {
                const Icon = dom.icon;
                const isSelected = selectedDomain === dom.label;
                return (
                  <button
                    key={dom.label}
                    type="button"
                    onClick={() => setSelectedDomain(dom.label)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                      isSelected
                        ? "bg-[#0071e3] text-white shadow-sm"
                        : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{dom.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Cards List */}
            <div className="lg:col-span-3">
              {filteredPrograms.length === 0 ? (
                <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-10 sm:p-14 shadow-sm text-center max-w-xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0071e3]">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#1d1d1f]">
                      No Internship Tracks Currently Open
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                      Upcoming batches and R&amp;D training cohorts will be announced here once scheduled by the VTU-VRIF Center.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact?subject=Internship%20Inquiry"
                      className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
                    >
                      <span>Inquire About Next Cohort</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {filteredPrograms.map((prog) => {
                    const Icon = prog.icon;
                    return (
                      <div
                        key={prog.slug}
                        className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col group"
                      >
                        {/* Visual Banner */}
                        <div className={`h-36 bg-gradient-to-br ${prog.gradient} p-5 flex flex-col justify-between text-white relative overflow-hidden`}>
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                              {prog.domain}
                            </span>
                            <Icon className="w-4 h-4 text-white/90" />
                          </div>
                          <h3 className="text-base font-bold leading-snug line-clamp-2 relative z-10 text-white">
                            {prog.title}
                          </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-xs text-[#6e6e73] flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
                              <span>{prog.duration} • {prog.mode}</span>
                            </div>
                            <p className="mt-3 text-xs sm:text-sm text-[#6e6e73] leading-relaxed line-clamp-3 font-normal">
                              {prog.description}
                            </p>
                            <div className="mt-4 text-xl font-black text-[#1d1d1f] tracking-tight">
                              {prog.price}
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-[#e5e5ea] flex items-center justify-between">
                            <Link
                              href={`/internships/${prog.slug}`}
                              className="text-xs font-semibold text-[#0071e3] hover:text-[#0077ed] transition inline-flex items-center gap-1.5 group-hover:translate-x-0.5"
                            >
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <span className="text-[11px] text-[#059669] font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                              Admissions Open
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
