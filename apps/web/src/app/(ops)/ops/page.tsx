"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  FlaskConical,
  GraduationCap,
  Image as ImageIcon,
  Users,
  Cpu,
  Settings,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Calendar,
  Briefcase,
  Rocket,
  ExternalLink,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

export default function OperationsOverviewPage() {
  const { content } = useSiteContent();

  const primaryModules = [
    {
      title: "Home Page Editor",
      description: "Hero keynote headline, subhead, university metric counter cards, technology pillars, collaboration milestones timeline, and FAQs.",
      href: "/ops/home",
      publicUrl: "/",
      buttonText: "Edit Home Page",
      icon: Home,
      stats: `${content.home.stats.length} Metrics • ${(content.home.milestones || []).length} Milestones • ${(content.home.upcomingProducts || []).length} Upcoming`,
      badge: "Flagship Keynote",
      color: "bg-blue-500/10 text-[#0071e3] border-blue-200",
      btnClass: "bg-[#0071e3] hover:bg-[#0077ed] text-white",
    },
    {
      title: "Events & Symposia",
      description: "Karnataka BESS Symposia, SaralaChip masterclasses, hands-on hackathons, technical agendas, speakers, and RSVP registrations.",
      href: "/ops/events",
      publicUrl: "/events",
      buttonText: "Manage Events & RSVP",
      icon: Calendar,
      stats: `${(content.events || []).length} Active Symposia & Workshops`,
      badge: "Live RSVPs",
      color: "bg-violet-500/10 text-violet-600 border-violet-200",
      btnClass: "bg-violet-600 hover:bg-violet-700 text-white",
    },
    {
      title: "Careers & Openings",
      description: "Post engineering job roles, Power Electronics design leads, silicon firmware architects, and student fellowships.",
      href: "/ops/careers",
      publicUrl: "/careers",
      buttonText: "Manage Job Openings",
      icon: Briefcase,
      stats: `${(content.careers || []).length} Engineering Roles Open`,
      badge: "Active Hiring",
      color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
      btnClass: "bg-cyan-600 hover:bg-cyan-700 text-white",
    },
    {
      title: "Entrepreneurship & Ventures",
      description: "Manage hardware entrepreneurship accelerator copy, workbench testing instruments, founder perks, zero-equity terms, and founder FAQs.",
      href: "/ops/incubation",
      publicUrl: "/entrepreneur",
      buttonText: "Edit Entrepreneur Center",
      icon: Rocket,
      stats: `${(content.incubation?.founderPerks || []).length} Perks • ${(content.incubation?.faqs || []).length} FAQs`,
      badge: "Founder Hub",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
  ];

  const academicModules = [
    {
      title: "R&D & Testbeds",
      description: "Manage research bays, high-voltage test equipment inventory, peer-reviewed technical papers, and patent tallies.",
      href: "/ops/rnd",
      publicUrl: "/rnd",
      buttonText: "Edit R&D Bays",
      icon: FlaskConical,
      stats: `${content.rnd.bays.length} Research Bays • ${content.rnd.publications.length} Papers`,
      badge: "Scientific Bays",
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      btnClass: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    {
      title: "VTU Internships & Batches",
      description: "Add or retire internship tracks, adjust batch capacities, and route the 'Apply' button to university ERP.",
      href: "/ops/internships",
      publicUrl: "/internships",
      buttonText: "Manage Internship Tracks",
      icon: GraduationCap,
      stats: `${content.internships.length} Curriculum Tracks Configured`,
      badge: content.internships.some((i) => i.isActive) ? "Active Intakes" : "Inactive",
      color: "bg-teal-500/10 text-teal-600 border-teal-200",
      btnClass: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    {
      title: "Gallery Media Studio",
      description: "Upload campus event albums, categorize high-bay lab testing sessions, and showcase student engineering moments.",
      href: "/ops/gallery",
      publicUrl: "/gallery",
      buttonText: "Manage Media & Albums",
      icon: ImageIcon,
      stats: `${content.gallery.length} Media Showcase Items`,
      badge: "Recent-First Sorting",
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      btnClass: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    {
      title: "Executive Committee (ExCom)",
      description: "Manage academic council members, leadership bios, research credentials, and advisory mandates.",
      href: "/ops/excom",
      publicUrl: "/about",
      buttonText: "Manage Council Members",
      icon: Users,
      stats: `${content.excom.length} Executive Council Members`,
      badge: "Academic Council",
      color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
      btnClass: "bg-indigo-600 hover:bg-indigo-700 text-white",
    },
  ];

  const commerceModules = [
    {
      title: "Hardware Store & Toggles",
      description: "Toggle hardware ordering on/off, hide/show catalog prices, update catalog notices, and manage upcoming products & store FAQs.",
      href: "/ops/hardware",
      publicUrl: "/store",
      buttonText: "Configure Store & Toggles",
      icon: Cpu,
      stats: content.hardware.isOrderingEnabled ? "Ordering Open" : "Inquiry Only (Protected)",
      badge: content.hardware.showPricing ? "Prices Visible" : "Prices Hidden",
      color: "bg-rose-500/10 text-rose-600 border-rose-200",
      btnClass: "bg-rose-600 hover:bg-rose-700 text-white",
    },
    {
      title: "Global Coordinates & Banner",
      description: "Top website notification marquee, facility address, contact coordinates, phone numbers, and official university coordinates.",
      href: "/ops/settings",
      publicUrl: "/contact",
      buttonText: "Edit Global Coordinates",
      icon: Settings,
      stats: content.global.announcementBarEnabled ? "Banner Active" : "Banner Off",
      badge: "Site Settings",
      color: "bg-slate-500/10 text-slate-700 border-slate-200",
      btnClass: "bg-slate-700 hover:bg-slate-800 text-white",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Eyebrow & Hero Title */}
      <div className="border-b border-[#e5e5ea] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold tracking-wide shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Operations Command Launchpad</span>
          <span className="text-blue-300">•</span>
          <span className="font-mono text-[11px]">Direct Page Access</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#1d1d1f]">
          Site Operations <span className="text-gradient-apple-blue">Control Hub</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#6e6e73] font-normal max-w-3xl leading-relaxed">
          Select any section below to open its dedicated editor. Every change you publish updates the live public website instantaneously without any deployment lag.
        </p>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
              Active Modules
            </span>
            <span className="text-2xl font-black text-[#1d1d1f]">10 Editors</span>
            <span className="text-xs text-[#059669] font-medium block mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Fully Dynamic
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
              VTU Internships
            </span>
            <span className="text-2xl font-black text-[#0071e3]">
              {content.internships.length} Tracks
            </span>
            <span className="text-xs text-[#6e6e73] font-medium block mt-1">
              {content.internships.filter((i) => i.isActive).length} Open for Intake
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
              Hardware Ordering
            </span>
            <span className={`text-2xl font-black ${content.hardware.isOrderingEnabled ? "text-emerald-600" : "text-amber-600"}`}>
              {content.hardware.isOrderingEnabled ? "Enabled" : "Inquiry Mode"}
            </span>
            <span className="text-xs text-[#6e6e73] font-medium block mt-1">
              {content.hardware.showPricing ? "Prices Shown" : "Prices Masked"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
              Site Notification
            </span>
            <span className={`text-2xl font-black ${content.global.announcementBarEnabled ? "text-[#0071e3]" : "text-[#86868b]"}`}>
              {content.global.announcementBarEnabled ? "Active" : "Off"}
            </span>
            <span className="text-xs text-[#6e6e73] font-medium block mt-1">
              Top Alert Marquee
            </span>
          </div>
        </div>
      </div>

      {/* 1. CORE PAGES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1d1d1f] flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-[#0071e3]" />
            Core Website Content & Public Pages
          </h2>
          <span className="text-xs text-[#6e6e73] font-medium">4 Primary Editors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryModules.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${card.color} border flex items-center justify-center shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold text-[#1d1d1f]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{card.title}</h3>
                  <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed font-normal">
                    {card.description}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-[#fbfbfd] border border-[#e5e5ea] font-mono text-[10px] text-[#86868b]">
                    {card.stats}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#e5e5ea] flex items-center justify-between gap-3">
                  <Link
                    href={card.href}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all flex items-center gap-2 ${card.btnClass}`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={card.publicUrl}
                    target="_blank"
                    className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] inline-flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3 h-3 text-[#0071e3]" />
                    <span>View Live</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. RESEARCH & ACADEMIC MODULES */}
      <section className="space-y-4 pt-6 border-t border-[#e5e5ea]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1d1d1f] flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-600" />
            Research, Internships & Academic Programs
          </h2>
          <span className="text-xs text-[#6e6e73] font-medium">4 Academic Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicModules.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${card.color} border flex items-center justify-center shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold text-[#1d1d1f]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{card.title}</h3>
                  <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed font-normal">
                    {card.description}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-[#fbfbfd] border border-[#e5e5ea] font-mono text-[10px] text-[#86868b]">
                    {card.stats}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#e5e5ea] flex items-center justify-between gap-3">
                  <Link
                    href={card.href}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all flex items-center gap-2 ${card.btnClass}`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={card.publicUrl}
                    target="_blank"
                    className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] inline-flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3 h-3 text-[#0071e3]" />
                    <span>View Live</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMMERCE & GLOBAL SETTINGS */}
      <section className="space-y-4 pt-6 border-t border-[#e5e5ea]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1d1d1f] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-rose-600" />
            Hardware Store Commerce & Global Coordinates
          </h2>
          <span className="text-xs text-[#6e6e73] font-medium">2 Control Panels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commerceModules.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${card.color} border flex items-center justify-center shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold text-[#1d1d1f]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{card.title}</h3>
                  <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed font-normal">
                    {card.description}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-[#fbfbfd] border border-[#e5e5ea] font-mono text-[10px] text-[#86868b]">
                    {card.stats}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#e5e5ea] flex items-center justify-between gap-3">
                  <Link
                    href={card.href}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all flex items-center gap-2 ${card.btnClass}`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={card.publicUrl}
                    target="_blank"
                    className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#1d1d1f] inline-flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3 h-3 text-[#0071e3]" />
                    <span>View Live</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
