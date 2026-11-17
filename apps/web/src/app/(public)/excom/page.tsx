"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSiteContent } from "@/context/content-context";
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
  BadgeCheck,
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
  photoUrl?: string;
}

function getInitials(name: string): string {
  const cleaned = (name || "")
    .replace(/^(mr\.|ms\.|dr\.|mrs\.|prof\.)\s+/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return "EC";
}

const PERMANENT_EXCOM_MEMBERS: Member[] = [
  // 1. Management Members (Minds behind Mission)
  {
    id: "excom-ak",
    name: "Mr. AMARESHWAR KARATAGI",
    role: "Co-Founder | Chief Business Development Officer",
    designation: "Managing Director, SMPS Electric Control Pvt Ltd",
    department: "Executive Leadership & Strategy",
    category: "management",
    qualifications: "B.E., Electronics & Communication Engineering, REVA University",
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
    department: "Strategic Growth & Partnerships",
    category: "management",
    qualifications: "B.E., Information Science & Engineering • MBA",
    avatarInitials: "AS",
    bio: "Ms. A. R. Shalini is the Chief Business Development Officer at SMPS Tech Lab, driving strategic growth, operational effectiveness, and ecosystem partnerships across technology initiatives and university programs.",
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
    department: "DeepTech R&D & Power Silicon",
    category: "management",
    qualifications: "PhD (Smart Grid), IIT",
    avatarInitials: "SK",
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
    designation: "Techno-Commercial Architecture & Product Engineering",
    department: "Embedded & Power Electronics Engineering",
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
    designation: "Data Science, AI/ML & Predictive Analytics",
    department: "AI & Data Analytics",
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
    designation: "Full-Stack Systems & AI Operations Lead",
    department: "Digital Operations & Software Platforms",
    category: "employees",
    qualifications: "Electrical & Electronics Engineering",
    avatarInitials: "SB",
    bio: "Mr. Shiva Bhalke is a core member of the Technology & Digital Operations team at SMPS Tech Lab. A full-stack developer and AI enthusiast, he builds scalable digital systems, real-time dashboards, and robust platforms across web and IoT.",
    mandates: ["Digital Infrastructure Operations", "Full-Stack System Engineering", "Laboratory Automation"],
    publications: ["Full-Stack Distributed Telemetry in Modern Microgrids"],
    patentsHandled: ["Automated Grid Monitoring Nodes"],
    contactEmail: "bhalkeshiva9@gmail.com",
    badge: "Team Member",
    colorScheme: "from-emerald-600 to-teal-700",
  },
];

export default function ExComPage() {
  const { content } = useSiteContent();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const allMembers = useMemo(() => {
    const cmsExcom = content.excom || [];
    if (cmsExcom.length === 0) return PERMANENT_EXCOM_MEMBERS;

    const permanentIds = new Set(PERMANENT_EXCOM_MEMBERS.map((p) => p.id));
    const merged = PERMANENT_EXCOM_MEMBERS.map((perm) => {
      const match = cmsExcom.find(
        (c) => c.id === perm.id || c.name.toLowerCase() === perm.name.toLowerCase()
      );
      if (!match) return perm;
      return {
        ...perm,
        name: match.name || perm.name,
        role: match.role || perm.role,
        designation: match.designation || perm.designation,
        department: match.department || perm.department,
        qualifications: match.qualifications || perm.qualifications,
        bio: match.bio || perm.bio,
        contactEmail: match.email || perm.contactEmail,
        photoUrl: match.photoUrl || perm.photoUrl,
      };
    });

    // Also include newly added members from CMS that are not in PERMANENT_EXCOM_MEMBERS
    const newMembers: Member[] = cmsExcom
      .filter(
        (c) =>
          !permanentIds.has(c.id) &&
          !PERMANENT_EXCOM_MEMBERS.some((p) => p.name.toLowerCase() === c.name.toLowerCase())
      )
      .map((c) => ({
        id: c.id,
        name: c.name,
        role: c.role,
        designation: c.designation || c.role,
        department: c.department || "Advisory Council",
        category: (c.category as any) || "management",
        qualifications: c.qualifications || "",
        avatarInitials: getInitials(c.name),
        bio: c.bio,
        mandates: c.mandates || ["Institutional R&D Alignment", "Academic Governance"],
        publications: c.publications || [],
        patentsHandled: c.patentsHandled || [],
        contactEmail: c.email || "info@smpstechlab.com",
        badge: c.category === "employees" ? "Team Member" : "Minds behind Mission",
        colorScheme: "from-blue-600 to-indigo-700",
        photoUrl: c.photoUrl,
      }));

    return [...merged, ...newMembers];
  }, [content.excom]);

  const filteredMembers = allMembers.filter((m) => {
    if (activeCategory === "all") return true;
    return m.category === activeCategory;
  });

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafc] text-[#1d1d1f] py-10 sm:py-16 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.07] via-indigo-500/[0.03] to-transparent rounded-full blur-[130px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
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
            <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
              <span className="text-2xl font-black text-[#1d1d1f] block tracking-tight">{allMembers.length}</span>
              <span className="text-xs text-[#6e6e73] font-medium">Council Directors</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
              <span className="text-2xl font-black text-[#0071e3] block tracking-tight">4</span>
              <span className="text-xs text-[#6e6e73] font-medium">Statutory Boards</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
              <span className="text-2xl font-black text-[#10b981] block tracking-tight">100%</span>
              <span className="text-xs text-[#6e6e73] font-medium">VTU-NEP Aligned</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
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
                  : "bg-white hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-10 sm:p-14 shadow-sm text-center max-w-xl mx-auto my-12 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0071e3]">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1d1d1f]">
                No ExCom Members in this Category
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                Profiles can be added or updated live from the Operations Portal.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
            {filteredMembers.map((member) => {
              const hasPhoto = Boolean(member.photoUrl && !imageErrors[member.id]);

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="apple-card-elevated group relative rounded-[28px] border border-[#e5e5ea] bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,113,227,0.1)] hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Subtle hover gradient illumination */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-indigo-500/0 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Header Profile Frame with Photo Support */}
                    <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                      {hasPhoto ? (
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden ring-4 ring-slate-100 group-hover:ring-blue-100 shadow-md group-hover:scale-105 transition-all duration-300 bg-[#f5f5f7] shrink-0">
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            onError={() => handleImageError(member.id)}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br ${member.colorScheme} flex items-center justify-center text-white font-extrabold text-2xl shadow-md ring-4 ring-slate-100 group-hover:ring-blue-100 group-hover:scale-105 transition-all duration-300 shrink-0`}
                        >
                          {member.avatarInitials}
                        </div>
                      )}

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100/80 shadow-xs">
                          <BadgeCheck className="w-3 h-3 text-[#0071e3]" />
                          <span>{member.badge}</span>
                        </span>
                        <span className="text-[10px] text-[#86868b] font-medium">Verified Council</span>
                      </div>
                    </div>

                    {/* Identity */}
                    <h3 className="text-xl font-extrabold text-[#1d1d1f] group-hover:text-[#0071e3] transition tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#0071e3] mt-1 tracking-wide">
                      {member.role}
                    </p>
                    {member.designation &&
                      member.designation.trim().toLowerCase() !== member.role.trim().toLowerCase() && (
                        <p className="text-[11px] text-[#86868b] mt-0.5 line-clamp-1">
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

                  {/* Action Button Row */}
                  <div className="pt-6 mt-6 border-t border-[#e5e5ea] flex items-center justify-between relative z-10">
                    <a
                      href={`mailto:${member.contactEmail}`}
                      className="p-2 text-[#86868b] hover:text-[#0071e3] hover:bg-blue-50 rounded-full transition"
                      title={`Contact ${member.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f5f5f7] group-hover:bg-[#0071e3] text-[#1d1d1f] group-hover:text-white text-xs font-semibold transition-all duration-200">
                      <span>View Profile & Bio</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Governance Charter CTA Banner */}
        <section className="apple-card-elevated rounded-[32px] bg-gradient-to-br from-white via-[#fbfbfd] to-blue-50/50 border border-[#e5e5ea] p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto">
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

      {/* Member Deep-Dive Modal with Smooth Opening Animation */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#e5e5ea] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 fade-in duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Showcase with Member Photo */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-8 border-b border-[#e5e5ea] pb-6">
              {selectedMember.photoUrl && !imageErrors[selectedMember.id] ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-blue-50 shadow-xl shrink-0 bg-[#f5f5f7]">
                  <img
                    src={selectedMember.photoUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${selectedMember.colorScheme} flex items-center justify-center text-white font-extrabold text-3xl shadow-xl ring-4 ring-blue-50 shrink-0`}
                >
                  {selectedMember.avatarInitials}
                </div>
              )}

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100 mb-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>{selectedMember.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-semibold text-[#0071e3]">
                  {selectedMember.role}
                </p>
                <p className="text-xs text-[#86868b] font-medium">
                  {selectedMember.designation}
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs text-[#6e6e73]">
                  <GraduationCap className="w-4 h-4 text-[#0071e3]" />
                  <span>{selectedMember.qualifications}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
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
                      <li key={i} className="p-3.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#48484a] text-xs">
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
                      <li key={i} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-[#1d1d1f] text-xs font-medium">
                        {pat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-[#e5e5ea] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#86868b]">Official Communication:</span>
                <a
                  href={`mailto:${selectedMember.contactEmail}`}
                  className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-[#0071e3] border border-blue-200 transition inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedMember.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
