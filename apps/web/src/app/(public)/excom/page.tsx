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
  category: "management" | "employees" | "advisory";
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

const PERMANENT_EXCOM_MEMBERS: Member[] = [
  // 1. Management Members (Minds behind Mission)
  {
    id: "excom-ak",
    name: "Mr. AMARESHWAR KARATAGI",
    role: "Co-Founder | Chief Business Development Officer",
    designation: "Managing Director, SMPS Electric Control Pvt Ltd",
    department: "Management",
    category: "management",
    qualifications: "B.E., Electronics & Communication Engineering, REVA U...",
    avatarInitials: "AK",
    bio: "Mr. Amareshwar Karatagi is a Co-Founder and the Chief Strategic Officer of SMPS Tech Lab, and the architect of its growth strategy. He also serves as Special Industrial Advisor to the VTU Research and Innovation Foundation (VRIF) and has held key advisory roles at Reva University and TCOE India.",
    mandates: ["Strategic R&D Direction", "University Accreditation", "Joint Venture Partnerships"],
    publications: ["Industrial Power Electronics Architecture"],
    patentsHandled: ["High-Voltage Safety Architecture"],
    contactEmail: "info@smpstechlab.com",
    badge: "Minds behind Mission",
    colorScheme: "from-blue-600 to-indigo-700",
  },
  {
    id: "excom-ars",
    name: "Ms. A. R. Shalini",
    role: "Chief Business Development Officer",
    designation: "Director of Research, VTU-VRIF Center",
    department: "Management",
    category: "management",
    qualifications: "B.E., Information Science & Engineering • MBA",
    avatarInitials: "S",
    bio: "Ms. A. R. Shalini is the Chief Business Development Officer at SMPS Tech Lab, driving strategic growth, operational effectiveness, and ecosystem partnerships across technology initiatives.",
    mandates: ["Academic Program Accreditations", "Curriculum Strategy", "Industry-University MoUs"],
    publications: ["VTU DeepTech Curriculum Framework"],
    patentsHandled: ["Academic Patent Pipeline"],
    contactEmail: "info@smpstechlab.com",
    badge: "Minds behind Mission",
    colorScheme: "from-blue-600 to-indigo-700",
  },
  {
    id: "excom-sk",
    name: "Dr. S. Khatua",
    role: "Chief Technology Officer",
    designation: "Principal Architect, Digital Control Systems",
    department: "Management",
    category: "management",
    qualifications: "PhD (Smart Grid), IIT",
    avatarInitials: "K",
    bio: "Dr. S. Khatua is the Chief Technology Officer and principal architect of technological innovation at SMPS Tech Lab. He leads breakthrough research, advanced engineering, and the technological vision of the organization.",
    mandates: ["Hardware Silicon Architecture", "Power Inverter Topologies", "IEEE Research Leadership"],
    publications: ["High-Frequency Planar Magnetics Optimization for 1500V Central Inverters (IEEE 2025)"],
    patentsHandled: ["Fast-Transient Fault Interrupt System"],
    contactEmail: "info@smpstechlab.com",
    badge: "Minds behind Mission",
    colorScheme: "from-blue-600 to-indigo-700",
  },

  // 2. Employees (Team Members)
  {
    id: "excom-rj",
    name: "Mr. Rushit Jani",
    role: "Techno-Commercial Architect Intern",
    designation: "Techno-Commercial Architect Intern",
    department: "Core Engineering Team",
    category: "employees",
    qualifications: "B.Tech, Power & Embedded Electronics",
    avatarInitials: "RJ",
    bio: "Techno-Commercial Architect Intern contributing to deep-tech systems research, hardware-software integration, and market architecture.",
    mandates: ["Hardware-Software Integration", "Techno-Commercial Evaluation", "Product Architecture"],
    publications: ["Deep-Tech Hardware Acceleration Paradigms"],
    patentsHandled: ["Modular Power Controller Architecture"],
    contactEmail: "info@smpstechlab.com",
    badge: "Team Member",
    colorScheme: "from-emerald-600 to-teal-700",
  },
  {
    id: "excom-sp",
    name: "Mr. Stavan Pandya",
    role: "Techno-Commercial Architect Intern",
    designation: "Techno-Commercial Architect Intern",
    department: "Core Engineering Team",
    category: "employees",
    qualifications: "B.Tech, Electrical & Electronics",
    avatarInitials: "SP",
    bio: "Techno-Commercial Architect Intern contributing to hardware architectures, technology analytics, and advanced project engineering.",
    mandates: ["Telemetry Analytics", "Hardware Characterization", "Technology Operations"],
    publications: ["Predictive Maintenance Paradigms in Energy Storage"],
    patentsHandled: ["Energy Telemetry Sensor Nodes"],
    contactEmail: "info@smpstechlab.com",
    badge: "Team Member",
    colorScheme: "from-emerald-600 to-teal-700",
  },
  {
    id: "excom-sb",
    name: "Mr. Shiva Bhalke",
    role: "Technology & Digital Operations",
    designation: "Techno-Commercial Architect Intern",
    department: "Digital Operations",
    category: "employees",
    qualifications: "B.Tech, Computer & Systems Engineering",
    avatarInitials: "SB",
    bio: "Techno-Commercial Architect Intern contributing to digital platforms, technology operations, and innovation workflows.",
    mandates: ["Digital Infrastructure Operations", "Full-Stack System Engineering", "Laboratory Automation"],
    publications: ["Full-Stack Distributed Telemetry in Modern Microgrids"],
    patentsHandled: ["Automated Grid Monitoring Nodes"],
    contactEmail: "info@smpstechlab.com",
    badge: "Team Member",
    colorScheme: "from-emerald-600 to-teal-700",
  },
];

export default function ExComPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allMembers = PERMANENT_EXCOM_MEMBERS;

  const filteredMembers = allMembers.filter((m) => {
    if (activeCategory === "all") return true;
    return m.category === activeCategory;
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
            <span className="font-mono text-[#6e6e73]">SMPS Tech Lab Governance</span>
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
            { id: "management", label: "Management Members (Minds behind Mission)" },
            { id: "employees", label: "Employees (Team Members)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === tab.id
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
                  {member.designation &&
                    member.designation.trim().toLowerCase() !== member.role.trim().toLowerCase() && (
                      <p className="text-[11px] font-mono text-[#86868b] mt-0.5">
                        {member.designation}
                      </p>
                    )}

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
              <span>Explore SMPS Tech Lab Facility</span>
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
