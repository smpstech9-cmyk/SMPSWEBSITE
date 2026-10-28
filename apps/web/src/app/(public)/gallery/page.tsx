"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Camera,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  Filter,
  Sparkles,
  Award,
  Cpu,
  Building2,
  Users,
  Eye,
  X,
  Share2,
  ExternalLink,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "labs" | "events" | "ceremonies" | "students";
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  tags: string[];
  attendeesCount?: string;
}

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  status: "upcoming" | "completed";
  description: string;
  speaker: string;
  registrationOpen: boolean;
  registrationHref: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "edge-iot-telemetry-lab",
    title: "Industrial Modbus & LoRaWAN Edge Gateway Trials",
    category: "events",
    date: "June 2026",
    location: "IoT Wireless Lab",
    imageUrl: "/images/products/raspberry-pi.jpg",
    description: "Deployment of multi-channel sensor arrays measuring substation power quality and transmitting telemetry over long-range LoRa packets.",
    tags: ["IoT", "Edge AI", "Power Telemetry"],
    attendeesCount: "Telecom Researchers",
  },
  {
    id: "robotics-uno-workshop",
    title: "Hands-On Robotics & Motor Control Laboratory Session",
    category: "students",
    date: "May 2026",
    location: "Mechatronics Bay 2",
    imageUrl: "/images/products/arduino-kit.jpg",
    description: "Engineering students assembling stepper actuators, optical encoders, and PID control algorithms using SMPS experimental developer kits.",
    tags: ["Robotics", "PID Control", "Lab Kit"],
    attendeesCount: "45 Students",
  },
  {
    id: "swarnali-charger-demo",
    title: "SWARNALI™ 60kW Dual-Gun DC Fast Charger Demonstration",
    category: "labs",
    date: "April 2026",
    location: "Outdoor EV Fleet Proving Ground",
    imageUrl: "/images/products/swarnali-ev-charger.jpg",
    description: "Live commercial vehicle fast-charging session demonstrating dynamic power balancing between dual CCS2 connectors and cloud telemetry streaming.",
    tags: ["EV Fast Charger", "OCPP", "Fleet Power"],
    attendeesCount: "OEM Fleet Partners",
  },
  {
    id: "internship-convocation-cohort4",
    title: "VTU Internship Capstone Attestation Ceremony",
    category: "students",
    date: "April 2026",
    location: "VTU-TCOE Conference Hall",
    imageUrl: "/images/hero-students.jpg",
    description: "Awarding university-accredited VTU certificates and capstone merit badges to students completing their EV Powertrain & BMS laboratory internships.",
    tags: ["Convocation", "Certificates", "VTU Students"],
    attendeesCount: "85 Graduating Interns",
  },
  {
    id: "cleantech-hackathon-2026",
    title: "National CleanTech & EV Hardware Hackathon",
    category: "events",
    date: "March 2026",
    location: "Auditorium & Innovation Labs",
    imageUrl: "/images/products/iot-kit.jpg",
    description: "36-hour non-stop rapid prototyping competition where 40 engineering teams fabricated closed-loop motor drivers and IoT battery telemetry nodes.",
    tags: ["Hackathon", "CleanTech", "Prototyping"],
    attendeesCount: "160 Student Engineers",
  },
  {
    id: "saralachip-silicon-review",
    title: "SaralaChip™ CCU Controller Board Bring-Up",
    category: "labs",
    date: "March 2026",
    location: "Silicon & Embedded Systems Bay",
    imageUrl: "/images/products/saralachip.jpg",
    description: "Oscilloscope capture of nanosecond gate driver PWM pulses and 2.5µs hardware fault isolation during live short-circuit protection trials.",
    tags: ["Semiconductors", "SaralaChip", "Silicon"],
    attendeesCount: "R&D Silicon Team",
  },
  {
    id: "purna-bess-testing",
    title: "PURNA BESS™ 100kWh High-Voltage Load Bank Testing",
    category: "labs",
    date: "February 2026",
    location: "Bay 3: BESS Thermal Chamber",
    imageUrl: "/images/products/purna-bess.jpg",
    description: "Automated continuous charge-discharge cycling of our containerized LFP storage units under ambient stress conditions (+45°C) with liquid thermal cooling active.",
    tags: ["BESS", "High Voltage", "Thermal Validation"],
    attendeesCount: "Testing Team",
  },
  {
    id: "vtu-lab-inauguration",
    title: "Official VTU-VRIF-TCOE R&D Bay Inauguration",
    category: "ceremonies",
    date: "January 2026",
    location: "VTU Campus, Nagarbhavi, Bengaluru",
    imageUrl: "/images/hero-students.jpg",
    description: "Executive dignitaries, VTU Vice Chancellor, and industrial directors formally commissioning the high-voltage test bay and SaralaChip™ verification workbench.",
    tags: ["Inauguration", "VTU-VRIF", "Facility Launch"],
    attendeesCount: "250+ Dignitaries & Faculty",
  },
];

const EVENTS_SCHEDULE: EventItem[] = [
  {
    id: "bess-symposium-2026",
    title: "Karnataka Commercial BESS & Microgrid Symposium 2026",
    category: "Industrial Conference",
    date: "November 14, 2026",
    time: "09:30 AM – 05:00 PM IST",
    venue: "Main Auditorium, VTU-VRIF-TCOE Building, Bengaluru",
    status: "upcoming",
    description: "Deep dive into 1500V LFP energy storage architectures, safety quarantine guidelines, and tariff arbitrage financial models for industrial plant managers.",
    speaker: "Er. Shiv Bhalke & Guest Panelists from BESCOM",
    registrationOpen: true,
    registrationHref: "/contact?subject=Register%20BESS%20Symposium%202026",
  },
  {
    id: "ev-charging-workshop",
    title: "High-Voltage DC Fast Charging Protocols (OCPP 2.0.1)",
    category: "Hands-On Workshop",
    date: "November 28, 2026",
    time: "10:00 AM – 04:00 PM IST",
    venue: "EV Proving Bay, SMPS Tech Lab",
    status: "upcoming",
    description: "Practical engineering session on CAN communication sniffing, ISO 15118 plug-and-charge handshakes, and liquid-cooled cable thermal design.",
    speaker: "Dr. Arvind R. Rao",
    registrationOpen: true,
    registrationHref: "/contact?subject=Register%20EV%20Charging%20Workshop",
  },
  {
    id: "silicon-ccu-masterclass",
    title: "SaralaChip™ DSP Firmware & High-Speed PWM Masterclass",
    category: "Technical Masterclass",
    date: "December 12, 2026",
    time: "02:00 PM – 06:00 PM IST",
    venue: "Digital Simulation Bay, VTU Facility",
    status: "upcoming",
    description: "Code walkthroughs of space vector PWM modulation, discrete anti-windup integrators, and real-time fault isolation on physical test benches.",
    speaker: "SMPS Silicon Research Team",
    registrationOpen: true,
    registrationHref: "/contact?subject=Register%20Silicon%20Masterclass",
  },
];

import { useSiteContent } from "@/context/content-context";

export default function GalleryEventsPage() {
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState<"gallery" | "events">("gallery");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [dbItems, setDbItems] = useState<GalleryItem[]>([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  // Fetch directly from Authoritative Database on mount
  useEffect(() => {
    async function fetchGalleryFromDb() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setDbItems(
              json.data.map((d: any) => ({
                id: d.id,
                title: d.title,
                category: d.category,
                date: d.date,
                location: d.location,
                imageUrl: d.image_url || d.imageUrl,
                description: d.description,
                tags: [d.category?.toUpperCase() || "GALLERY", "SMPS Tech Lab"],
                attendeesCount: "VTU Facility",
              }))
            );
            setDbLoaded(true);
          }
        }
      } catch (e) {
        console.warn("Public gallery database fetch fallback to CMS store:", e);
      }
    }
    fetchGalleryFromDb();
  }, []);

  const contextItems: GalleryItem[] = (content.gallery || []).map((g) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    date: g.date,
    location: g.location,
    imageUrl: g.imageUrl,
    description: g.description,
    tags: [g.category.toUpperCase(), "SMPS Tech Lab"],
    attendeesCount: "Testing Team",
  }));

  // Authoritative database items take highest precedence, followed by CMS store items
  const rawShowcaseItems = dbLoaded ? dbItems : contextItems;

  // Enforce recent uploads first sorting
  const activeShowcaseItems = [...rawShowcaseItems].sort((a, b) => {
    // If item has numeric timestamp in ID (e.g. gal-1793...), sort descending
    const matchA = a.id.match(/\d{10,}/);
    const matchB = b.id.match(/\d{10,}/);
    if (matchA && matchB) {
      return parseInt(matchB[0], 10) - parseInt(matchA[0], 10);
    }
    if (matchA) return -1;
    if (matchB) return 1;

    // Fallback date string comparison
    const timeA = Date.parse(a.date) || 0;
    const timeB = Date.parse(b.date) || 0;
    if (timeA && timeB) return timeB - timeA;
    return 0;
  });

  const filteredGallery = activeShowcaseItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-10 sm:py-16 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-[#0071e3] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f] font-semibold">Gallery & Events Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="border-b border-[#e5e5ea] pb-10 mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#0071e3]" />
            <span className="font-mono text-[#6e6e73]">SMPS Tech Lab Showcase</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">Events & Lab Reel</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight max-w-3xl">
                Experience the Innovation <span className="text-gradient-apple-blue">In Action</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
                Explore photo documentation of high-voltage testing sessions, national hardware hackathons, academic convocations, and upcoming clean-tech conferences inside the VTU facility.
              </p>
            </div>

            {/* Main Mode Toggle Tabs */}
            <div className="inline-flex p-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] self-start md:self-auto shrink-0 shadow-sm">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "gallery"
                    ? "bg-white text-[#0071e3] shadow-sm"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photo Gallery</span>
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "events"
                    ? "bg-white text-[#0071e3] shadow-sm"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events & Seminars</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: PHOTO GALLERY */}
        {activeTab === "gallery" && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#e5e5ea] mb-8">
              {[
                { id: "all", label: "All Highlights" },
                { id: "labs", label: "Lab Prototyping Bays" },
                { id: "events", label: "Hackathons & Symposia" },
                { id: "ceremonies", label: "Inaugurations & MoUs" },
                { id: "students", label: "Student Convocations" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#0071e3] text-white shadow-sm"
                      : "bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Recent Uploads First Indicator */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-semibold text-[#6e6e73] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                Displaying recent uploads first ({filteredGallery.length} showcase photographs)
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#0071e3] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 hidden sm:inline-block">
                Latest First
              </span>
            </div>

            {/* Gallery Grid or Empty State */}
            {filteredGallery.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[28px] border border-[#e5e5ea] p-8 shadow-sm max-w-xl mx-auto my-12 space-y-3">
                <Sparkles className="w-10 h-10 text-[#86868b] mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#1d1d1f]">No Showcase Photographs Available</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Laboratory and convocation photographs are uploaded and published directly through the Operations Portal.
                </p>
                <div className="pt-2">
                  <Link
                    href="/ops/gallery"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition"
                  >
                    Open Operations Studio
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="apple-card-elevated group rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Preview Container */}
                    <div className="relative w-full h-56 bg-[#f5f5f7] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Date Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 text-white text-[11px] font-medium backdrop-blur-md shadow-sm">
                          <Calendar className="w-3 h-3 text-[#2997ff]" />
                          {item.date}
                        </span>
                      </div>

                      {/* Hover Overlay Icon */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-white/90 text-[#0071e3] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Eye className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#86868b] mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#6e6e73] mt-2 line-clamp-2 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-[#e5e5ea]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-5 pt-3 border-t border-[#e5e5ea] flex items-center justify-between text-xs text-[#86868b]">
                    <span>{item.attendeesCount || "VTU R&D"}</span>
                    <span className="font-semibold text-[#0071e3] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* TAB 2: EVENTS & SEMINARS */}
        {activeTab === "events" && (
          <div className="space-y-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#1d1d1f]">Upcoming Technical Conferences & Symposia</h2>
              <p className="text-sm text-[#6e6e73] mt-1 font-normal">
                Register for certified laboratory workshops, invited keynote talks, and live industrial demonstrations.
              </p>
            </div>

            <div className="space-y-6">
              {EVENTS_SCHEDULE.map((event) => (
                <div
                  key={event.id}
                  className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100">
                        {event.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#059669] border border-emerald-100">
                        {event.status === "upcoming" ? "Open for Registration" : "Completed"}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                      {event.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#86868b]">
                      <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                        <Calendar className="w-4 h-4 text-[#0071e3]" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#86868b]" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#86868b]" />
                        {event.venue}
                      </span>
                    </div>

                    <p className="text-xs text-[#0071e3] font-medium">
                      Featured Keynote: <span className="font-semibold text-[#1d1d1f]">{event.speaker}</span>
                    </p>
                  </div>

                  {/* Register CTA */}
                  <div className="shrink-0 flex flex-col gap-2.5 sm:w-56">
                    <Link
                      href={event.registrationHref}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs sm:text-sm font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] transition text-center"
                    >
                      <span>Reserve Seat / Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact?subject=Event%20Partnership%20Query"
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-xs font-semibold transition text-center"
                    >
                      <span>Sponsor / Partner</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Lab Visit or Host Event CTA Banner */}
        <section className="apple-card-elevated rounded-[32px] bg-gradient-to-br from-[#fbfbfd] via-white to-blue-50/40 border border-[#e5e5ea] p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto">
          <Building2 className="w-12 h-12 text-[#0071e3] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Host an Event or Book a Facility Tour
          </h2>
          <p className="text-sm text-[#6e6e73] mt-3 max-w-xl mx-auto leading-relaxed font-normal">
            University departments, corporate clean-tech teams, and research groups can request guided walkthroughs of our 1500V test bays and auditorium facilities.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?subject=Schedule%20Lab%20Visit%20or%20Host%20Event"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-sm font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] transition"
            >
              <span>Schedule Guided Lab Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/excom"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-sm font-semibold transition"
            >
              <span>View Executive Committee</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Lightbox Dialog */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] border border-[#e5e5ea] max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-sm transition"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Image Frame */}
            <div className="relative w-full h-80 sm:h-96 bg-black shrink-0">
              <Image
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Meta Description Body */}
            <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868b]">
                <span className="flex items-center gap-1.5 font-semibold text-[#0071e3]">
                  <Calendar className="w-3.5 h-3.5" />
                  {lightboxItem.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#1d1d1f]">
                  <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                  {lightboxItem.location}
                </span>
                <span>•</span>
                <span className="text-[#6e6e73] font-medium">{lightboxItem.attendeesCount}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f]">
                {lightboxItem.title}
              </h3>

              <p className="text-sm text-[#48484a] leading-relaxed font-normal">
                {lightboxItem.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {lightboxItem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f]"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#e5e5ea] flex justify-between items-center text-xs text-[#86868b]">
                <span>Archive Ref: {lightboxItem.id}</span>
                <Link
                  href="/contact?subject=Photo%20High-Resolution%20Request"
                  className="font-semibold text-[#0071e3] hover:underline"
                >
                  Request Press Assets &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
