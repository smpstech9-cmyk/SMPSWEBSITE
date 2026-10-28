"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Filter,
  Layers,
  Award,
  Cpu,
  X,
  Share2,
  Mail,
  Phone,
  Building2,
  Check,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

interface EventItem {
  id: string;
  title: string;
  category: "symposia" | "workshops" | "hackathons" | "past";
  badge: string;
  date: string;
  time: string;
  venue: string;
  speaker: string;
  speakerRole: string;
  description: string;
  agenda: string[];
  capacity: string;
  seatsLeft?: string;
  registrationOpen: boolean;
  featured?: boolean;
}

const EVENTS_DATA: EventItem[] = [];

export default function EventsPage() {
  const { content } = useSiteContent();
  const allEvents: EventItem[] = (content.events || []) as EventItem[];

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);

  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const featuredEvent = allEvents.find((e) => e.featured) || (allEvents.length > 0 ? allEvents[0] : null);

  const filteredEvents =
    selectedCategory === "all"
      ? allEvents
      : allEvents.filter((e) => e.category === selectedCategory);

  const handleOpenRegistration = (event: EventItem) => {
    setSelectedEventForModal(event);
    setRegistrationSuccess(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    // Simulate instantaneous confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationSuccess(true);
    }, 700);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-[#0071e3] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f] font-semibold">Events & Symposia Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="border-b border-[#e5e5ea] pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#0071e3] tracking-wide mb-4 shadow-sm">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#0071e3]" />
            VTU-VRIF Center Knowledge Sessions
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
                Academic Symposia & <br />
                <span className="text-gradient-apple-blue">Hardware Workshops</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
                Connect directly with power electronics researchers, state utility regulators, and silicon architects inside the VTU Telecom Center of Excellence facility in Bengaluru.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-2"
              >
                <span>View Lab Photo Reel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact?subject=Propose%20Workshop"
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Propose an Institutional Workshop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* FEATURED SPOTLIGHT EVENT CARD */}
        {featuredEvent && (
          <div className="mb-16">
            <div className="apple-card-elevated p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 border border-[#0071e3]/20 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-full bg-[#0071e3] text-white text-xs font-bold tracking-wider uppercase">
                      {featuredEvent.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                      {featuredEvent.seatsLeft}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight leading-tight">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
                    {featuredEvent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-[#1d1d1f]">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-black/[0.04] shadow-sm">
                      <Calendar className="w-4 h-4 text-[#0071e3]" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-black/[0.04] shadow-sm">
                      <Clock className="w-4 h-4 text-[#0071e3]" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-2.5 p-3 rounded-xl bg-white border border-black/[0.04] shadow-sm">
                      <MapPin className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                      <span className="truncate">{featuredEvent.venue}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenRegistration(featuredEvent)}
                      className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.35)] transition inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Reserve Your Delegate Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#86868b]">
                      Complimentary academic pass for faculty & students
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.06] shadow-md space-y-5">
                  <div className="border-b border-black/[0.06] pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      Keynote Speaker & Host
                    </span>
                    <h3 className="text-lg font-bold text-[#1d1d1f] mt-1">
                      {featuredEvent.speaker}
                    </h3>
                    <p className="text-xs text-[#6e6e73]">
                      {featuredEvent.speakerRole}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] mb-3">
                      Selected Technical Agenda
                    </h4>
                    <ul className="space-y-2.5">
                      {featuredEvent.agenda.map((item, idx) => (
                        <li key={idx} className="text-xs text-[#6e6e73] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {allEvents.length === 0 ? (
          <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-10 sm:p-16 shadow-sm text-center max-w-2xl mx-auto my-12 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0071e3]">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                No Public Events Currently Scheduled
              </h3>
              <p className="text-sm text-[#6e6e73] max-w-md mx-auto leading-relaxed">
                Check back soon or propose an institutional workshop, symposium, or student training session directly with our engineering faculty.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact?subject=Propose%20Workshop"
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Propose an Institutional Workshop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition inline-flex items-center gap-2"
              >
                <span>View Lab Photo Reel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* CATEGORY FILTER TABS */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Sessions" },
                  { id: "symposia", label: "Academic Symposia" },
                  { id: "workshops", label: "Hands-on Workshops" },
                  { id: "hackathons", label: "Hackathons & Sprints" },
                  { id: "past", label: "Past Archives" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                      selectedCategory === tab.id
                        ? "bg-[#0071e3] text-white shadow-sm"
                        : "bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-[#86868b]">
                Showing {filteredEvents.length} events
              </span>
            </div>

            {/* ALL EVENTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="apple-card p-6 flex flex-col justify-between group hover:border-[#0071e3]/30 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                        {evt.badge}
                      </span>
                      {evt.seatsLeft && (
                        <span className="text-[11px] font-bold text-[#059669]">
                          {evt.seatsLeft}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition leading-snug">
                      {evt.title}
                    </h3>

                    <p className="mt-3 text-xs text-[#6e6e73] font-normal leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    <div className="mt-5 space-y-2 pt-4 border-t border-black/[0.04] text-xs text-[#6e6e73]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span className="text-[#1d1d1f] font-medium">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-[#86868b] font-medium">
                      {evt.speaker.split("&")[0]}
                    </span>
                    {evt.registrationOpen ? (
                      <button
                        type="button"
                        onClick={() => handleOpenRegistration(evt)}
                        className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                      >
                        <span>RSVP / Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-[#86868b] px-3 py-1 rounded-full bg-gray-100">
                        Completed / Archived
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* REGISTRATION MODAL */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08]">
            <button
              type="button"
              onClick={() => setSelectedEventForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {registrationSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-[#1d1d1f]">
                  Registration Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                  Your seat for <strong className="text-[#1d1d1f]">{selectedEventForModal.title}</strong> has been successfully reserved. We have dispatched your digital gate pass and facility briefing to <strong className="text-[#0071e3]">{email}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] text-xs text-left space-y-1.5 text-[#1d1d1f]">
                  <div><strong>Date:</strong> {selectedEventForModal.date} ({selectedEventForModal.time})</div>
                  <div><strong>Location:</strong> {selectedEventForModal.venue}</div>
                  <div><strong>Attendee:</strong> {fullName} ({organization || "Independent"})</div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedEventForModal(null)}
                    className="w-full py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-md transition"
                  >
                    Done & Return to Events
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {selectedEventForModal.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mt-2 leading-tight">
                    {selectedEventForModal.title}
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1">
                    {selectedEventForModal.date} • {selectedEventForModal.venue}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      College / Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BMS College of Engineering / Tata Power"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Generating Digital Pass..." : "Confirm Free Registration"}
                  </button>
                  <p className="text-[10px] text-center text-[#86868b] mt-2">
                    Entry requires photo identification at the VTU-VRIF-TCOE security reception.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
