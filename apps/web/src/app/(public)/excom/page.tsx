"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Building2,
  Cpu,
  Mail,
  FileText,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  X,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  qualifications: string;
  avatarInitials: string;
  bio: string;
  mandates: string[];
  publications: string[];
  patentsHandled: string[];
  contactEmail: string;
  badge: string;
  colorScheme: string;
}

const EXCOM_MEMBERS: Member[] = [];

const STATUTORY_COUNCILS = [
  {
    name: "Academic & Curriculum Council",
    cadence: "Quarterly Review",
    chair: "Dr. K. S. Narayanaswamy",
    description: "Evaluates syllabus relevance against modern power semiconductors (GaN, SiC), embeds VTU NEP-aligned guidelines, and audits laboratory workstation rubrics.",
    icon: GraduationCap,
  },
  {
    name: "Safety & High-Voltage Compliance Board",
    cadence: "Bi-Weekly Audits",
    chair: "Er. Shiv Bhalke",
    description: "Enforces strict industrial protocol across 1500V DC testing bays, automated fire suppression, arc flash personal protective equipment, and battery quarantine safety.",
    icon: ShieldCheck,
  },
  {
    name: "Intellectual Property & Silicon Committee",
    cadence: "Monthly Session",
    chair: "Dr. Arvind R. Rao",
    description: "Reviews indigenous patent filings, prior art disclosures, open-source firmware licensing, and university-industry co-ownership rights under VTU statutes.",
    icon: Cpu,
  },
  {
    name: "Hardware Incubation Screening Panel",
    cadence: "Monthly Intake",
    chair: "Suresh Shenoy",
    description: "Interviews hardware founders, assesses technical feasibility, awards laboratory bench access, and authorizes subsidized fabrication resources.",
    icon: Briefcase,
  },
];

import { useSiteContent } from "@/context/content-context";

export default function ExComPage() {
  const { content } = useSiteContent();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string>("all");

  const dynamicMembers: Member[] = content.excom.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    designation: m.designation,
    department: m.department,
    qualifications: m.qualifications,
    avatarInitials: m.name.split(" ").filter(w => !w.includes(".")).map(w => w[0]).join("").slice(0, 2) || "SB",
    bio: m.bio,
    mandates: ["Strategic R&D Direction", "University Accreditation"],
    publications: ["Industrial Power Electronics Architecture"],
    patentsHandled: ["High-Voltage Safety Architecture"],
    contactEmail: m.email,
    badge: "Executive Leadership",
    colorScheme: "from-blue-600 to-indigo-700",
  }));

  const allMembers = dynamicMembers;

  const filteredMembers = allMembers.filter((m) => {
    if (activeDepartment === "all") return true;
    if (activeDepartment === "leadership") return m.badge === "Executive Leadership";
    if (activeDepartment === "academic") return m.badge === "Academic Board" || m.badge === "Talent Development";
    if (activeDepartment === "scientific") return m.badge === "Scientific Review" || m.badge === "Industrial Operations";
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-10 sm:py-16 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-[#0071e3] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <Link href="/about" className="hover:text-[#0071e3] transition">
            About
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f] font-semibold">Executive Committee (ExCom)</span>
        </nav>

        {/* Hero Eyebrow & Keynote Typography */}
        <div className="border-b border-[#e5e5ea] pb-10 mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#0071e3]" />
            <span className="font-mono text-[#6e6e73]">VTU-VRIF-TCOE Joint Governance</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">ExCom Council</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight max-w-4xl">
            Executive Committee & <span className="text-gradient-apple-blue">Governance Council</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#6e6e73] max-w-3xl font-normal leading-relaxed">
            The Executive Committee (ExCom) governs the scientific direction, high-voltage laboratory compliance, patent commercialization, and university-certified academic curricula of SMPS Electric Control Pvt Ltd in collaboration with Visvesvaraya Technological University.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
              <span className="text-2xl font-black text-[#1d1d1f] block tracking-tight">{allMembers.length}</span>
              <span className="text-xs text-[#6e6e73] font-medium">Council Directors</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
              <span className="text-2xl font-black text-[#0071e3] block tracking-tight">4</span>
              <span className="text-xs text-[#6e6e73] font-medium">Statutory Boards</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
              <span className="text-2xl font-black text-[#10b981] block tracking-tight">100%</span>
              <span className="text-xs text-[#6e6e73] font-medium">VTU-NEP Aligned</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
              <span className="text-2xl font-black text-[#1d1d1f] block tracking-tight">12+</span>
              <span className="text-xs text-[#6e6e73] font-medium">Patents & IPs Directed</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#e5e5ea] mb-10">
          {[
            { id: "all", label: "All Committee Members" },
            { id: "leadership", label: "Executive Leadership" },
            { id: "academic", label: "Academic & University Board" },
            { id: "scientific", label: "Scientific & Operations" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDepartment(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeDepartment === tab.id
                  ? "bg-[#0071e3] text-white shadow-sm"
                  : "bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        {allMembers.length === 0 ? (
          <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-10 sm:p-14 shadow-sm text-center max-w-xl mx-auto my-12 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0071e3]">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1d1d1f]">
                No ExCom Members Registered
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                Council profiles and institutional representatives can be configured directly from the Operations Portal.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/about"
                className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Read About the Facility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="apple-card-elevated group rounded-[28px] border border-[#e5e5ea] bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header Profile Frame */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.colorScheme} flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-white/30 shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {member.avatarInitials}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100/80">
                      {member.badge}
                    </span>
                  </div>

                  {/* Identity */}
                  <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0071e3] mt-1">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-mono text-[#86868b] mt-0.5">
                    {member.designation}
                  </p>

                  <p className="text-xs text-[#6e6e73] mt-4 line-clamp-3 leading-relaxed font-normal">
                    {member.bio}
                  </p>

                  {/* Qualifications pill */}
                  <div className="mt-4 pt-4 border-t border-[#e5e5ea] flex items-center gap-2 text-[11px] text-[#6e6e73]">
                    <GraduationCap className="w-4 h-4 text-[#0071e3] shrink-0" />
                    <span className="truncate">{member.qualifications}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6 mt-6 border-t border-[#e5e5ea] flex items-center justify-between">
                  <a
                    href={`mailto:${member.contactEmail}`}
                    className="p-2 text-[#86868b] hover:text-[#0071e3] hover:bg-blue-50 rounded-full transition"
                    title={`Contact ${member.name}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white text-xs font-semibold transition group/btn"
                  >
                    <span>View Mandate & Bio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statutory Governance Councils Section */}
        <section className="mb-20">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#059669] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Governance Bodies
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              Oversight & Compliance Councils
            </h2>
            <p className="text-sm text-[#6e6e73] mt-2 font-normal leading-relaxed">
              Standing institutional councils meeting on fixed bi-weekly and quarterly schedules to uphold lab safety, intellectual property integrity, and university academic standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTORY_COUNCILS.map((council, idx) => {
              const Icon = council.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-[#fbfbfd] hover:bg-white transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-[#e5e5ea] flex items-center justify-center text-[#0071e3] shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#6e6e73]">
                        {council.cadence}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1d1d1f]">
                      {council.name}
                    </h3>
                    <p className="text-xs text-[#0071e3] font-semibold mt-0.5">
                      Chaired by {council.chair}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6e6e73] mt-3 leading-relaxed font-normal">
                      {council.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Governance Charter CTA Banner */}
        <section className="apple-card-elevated rounded-[32px] bg-gradient-to-br from-[#fbfbfd] via-white to-blue-50/40 border border-[#e5e5ea] p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto">
          <Building2 className="w-12 h-12 text-[#0071e3] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Institutional Inquiries & Advisory Board Access
          </h2>
          <p className="text-sm text-[#6e6e73] mt-3 max-w-xl mx-auto leading-relaxed font-normal">
            For academic faculty appointments, state university research MoUs, or corporate advisory consultation with the ExCom directors:
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?subject=Executive%20Committee%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-sm font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] transition"
            >
              <span>Contact ExCom Secretariat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-sm font-semibold transition"
            >
              <span>Explore VTU-VRIF Facility</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Member Deep-Dive Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] border border-[#e5e5ea] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedMember.colorScheme} flex items-center justify-center text-white font-extrabold text-xl shadow-md shrink-0`}
              >
                {selectedMember.avatarInitials}
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100 mb-1">
                  {selectedMember.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f]">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-semibold text-[#0071e3]">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[11px] mb-2 text-[#86868b]">
                  Executive Biography
                </h4>
                <p className="text-[#48484a] leading-relaxed font-normal">
                  {selectedMember.bio}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[11px] mb-2 text-[#86868b]">
                  Institutional Mandates & Responsibilities
                </h4>
                <ul className="space-y-2">
                  {selectedMember.mandates.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#48484a]">
                      <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedMember.publications.length > 0 && (
                <div>
                  <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[11px] mb-2 text-[#86868b]">
                    Selected Technical Publications & Proceedings
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.publications.map((pub, i) => (
                      <li key={i} className="p-3 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#48484a] text-xs">
                        {pub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMember.patentsHandled.length > 0 && (
                <div>
                  <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[11px] mb-2 text-[#86868b]">
                    Patents & Architectural Claims
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.patentsHandled.map((pat, i) => (
                      <li key={i} className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-[#1d1d1f] text-xs font-medium">
                        {pat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-[#e5e5ea] flex items-center justify-between">
                <span className="text-xs text-[#86868b]">Official Communication:</span>
                <a
                  href={`mailto:${selectedMember.contactEmail}`}
                  className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {selectedMember.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
