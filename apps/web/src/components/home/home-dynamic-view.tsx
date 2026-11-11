"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  Cpu,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Sparkles,
  Layers,
  Radio,
  Atom,
  Clock,
  Calendar,
  Zap,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
  Brain,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";
import { HeroVideoCard } from "@/components/home/hero-video-card";

export function HomeDynamicView() {
  const { content } = useSiteContent();
  const { home } = content;

  const collaborationLogos = [
    { name: "Academic Collaboration 1", path: "/logos/collaboration/coll1.png" },
    { name: "Academic Collaboration 2", path: "/logos/collaboration/coll2.png" },
    { name: "Academic Collaboration 3", path: "/logos/collaboration/coll3.png" },
  ];

  const partnerLogos = [
    { name: "Partner 1", path: "/logos/partners/pt1.png" },
    { name: "Partner 2", path: "/logos/partners/pt2.png" },
    { name: "Partner 3", path: "/logos/partners/pt3.png" },
    { name: "Partner 4", path: "/logos/partners/pt4.png" },
    { name: "Partner 5", path: "/logos/partners/pt5.png" },
  ];

  const clientLogos = [
    { name: "Bharat Electronics Limited", path: "/logos/clients/client-1.png" },
    { name: "Vodafone Idea (Vi)", path: "/logos/clients/client-2.png" },
    { name: "Huawei Enterprise", path: "/logos/clients/client-3.png" },
    { name: "KEC International", path: "/logos/clients/client-4.png" },
    { name: "EC Power Solutions", path: "/logos/clients/client-5.png" },
    { name: "Adventz Group", path: "/logos/clients/client-6.png" },
    { name: "BSNL Telecom", path: "/logos/clients/client-7.png" },
    { name: "Larsen & Toubro (L&T)", path: "/logos/clients/client-8.png" },
    { name: "Indian Oil Corporation", path: "/logos/clients/client-9.png" },
    { name: "TowerVision Infrastructure", path: "/logos/clients/client-10.png" },
    { name: "PP Group", path: "/logos/clients/client-11.png" },
    { name: "ACME Solar Power", path: "/logos/clients/client-12.png" },
    { name: "Industrial Partner 13", path: "/logos/clients/client-13.png" },
    { name: "Industrial Partner 14", path: "/logos/clients/client-14.png" },
    { name: "Industrial Partner 15", path: "/logos/clients/client-15.png" },
    { name: "Industrial Partner 16", path: "/logos/clients/client-16.png" },
    { name: "Industrial Partner 17", path: "/logos/clients/client-17.png" },
    { name: "Industrial Partner 18", path: "/logos/clients/client-18.png" },
    { name: "Industrial Partner 19", path: "/logos/clients/client-19.png" },
  ];

  // Collaboration Timeline Milestones
  const collaborationMilestones = [
    {
      year: "2024",
      quarter: "Q1 - Q2",
      badge: "Institutional Foundation",
      title: "SMPS Engineering Center Commissioning & Institutional MoU",
      desc: "Formal tripartite agreement signed between SMPS Electric Control Pvt Ltd, Visvesvaraya Technological University, and VTU Research & Innovation Foundation to establish the 5,000 sq.ft Power Electronics & CleanTech incubation bay in Bengaluru.",
      metrics: "5,000 sq.ft Lab Bay • High-Voltage Grid Simulator",
    },
    {
      year: "2024 - 2025",
      quarter: "Q3 - Q4",
      badge: "Hardware R&D Commissioning",
      title: "SaralaChip™ CCU Controller & High-Voltage Test Bay",
      desc: "Joint development of the 1500V regenerative battery cycler infrastructure and the inaugural hardware bring-up of the SaralaChip™ real-time DSP verification workbench with sub-2.5µs hardware fault isolation.",
      metrics: "1500V DC Test Bay • 2.5µs Fault Interruption",
    },
    {
      year: "2025",
      quarter: "Q1 - Q3",
      badge: "Academic Accreditation",
      title: "VTU-Certified Curriculum & Student Cohort Launch",
      desc: "Accreditation of 4-week intensive hands-on hardware training programs in Power Electronics, BMS firmware, and IoT telemetry conferring official university credits to engineering undergraduates across 200+ affiliated colleges.",
      metrics: "500+ Engineers Trained • 100% Practical Bench Labs",
    },
    {
      year: "2025 - 2026",
      quarter: "Q4 - Q1",
      badge: "Scientific Patents",
      title: "IEEE Publications & Joint Patent Filings",
      desc: "Publication of high-frequency planar magnetics optimization and adaptive Kalman filter BMS state estimation algorithms co-authored by SMPS researchers and VTU faculty, with 3 provisional national patents submitted.",
      metrics: "2 IEEE Papers • 3 Patents Filed • 18 Citations",
    },
    {
      year: "2026 - Beyond",
      quarter: "Active Phase",
      badge: "Commercial Scale",
      title: "Commercial PURNA BESS™ Rollout & Venture Spin-Offs",
      desc: "Transitioning validated laboratory prototypes into mass-commercial deployment for Karnataka state power utilities, defense telecom power supplies, and incubating 10+ student deep-tech hardware startups.",
      metrics: "100kWh BESS Deployed • 10 Startups Incubated",
    },
  ];

  // Domain-Specific Strategic R&D Pillars (10 Core Verticals from Audit Specifications)
  const domainPillars = [
    {
      id: "power-electronics",
      title: "Power Electronics & Wide-Bandgap Systems",
      desc: "GaN and SiC high-frequency power topologies, ultra-compact planar magnetics, and bidirectional regenerative architectures.",
      icon: Zap,
      badge: "Wide-Bandgap",
      features: ["GaN/SiC Wide Bandgap", "Planar Magnetics", "99%+ Conversion Efficiency"],
      link: "/rnd/power-electronics",
    },
    {
      id: "energy-storage-bess",
      title: "Energy Storage Systems (BESS)",
      desc: "Utility-scale containerized 1500V LFP/Sodium-ion battery banks, active liquid cooling thermal loop, and bidirectional sub-millisecond PCS inverters.",
      icon: BatteryCharging,
      badge: "Clean Energy",
      features: ["1500V Architecture", "Liquid Cooling Loop", "BMS Fire-Suppression Matrix"],
      link: "/rnd/energy-storage-bess",
    },
    {
      id: "telecom-6g",
      title: "Telecom (5G & 6G Infrastructure)",
      desc: "Sub-station DC distribution, ultra-high efficiency rectifier units, and remote power telemetry for next-gen 5G/6G cellular towers.",
      icon: Radio,
      badge: "Telecommunications",
      features: ["98%+ Peak Efficiency", "Telecom Energy Routers", "SNMP & Remote Telemetry"],
      link: "/rnd/telecom-6g",
    },
    {
      id: "embedded-systems",
      title: "Embedded Systems & DSP Firmware",
      desc: "Deterministic sub-microsecond control loops, CAN-FD / Modbus protocols, ISO 26262 functional safety, and real-time DSP microcontrollers.",
      icon: Cpu,
      badge: "Micro-Architectures",
      features: ["Space Vector PWM", "Hardware HIL Testing", "CAN-FD Telemetry"],
      link: "/rnd/embedded-systems",
    },
    {
      id: "vlsi-silicon",
      title: "VLSI & Digital ASIC / FPGA Design",
      desc: "Custom silicon architectures, RTL synthesis, high-speed FPGA gate arrays, and ASIC layout validation for the SaralaChip™ family.",
      icon: Layers,
      badge: "Silicon Engineering",
      features: ["RTL & Verilog Synthesis", "FPGA Hardware Emulators", "Tapeout Pre-Verification"],
      link: "/rnd/vlsi-silicon",
    },
    {
      id: "ai-ml",
      title: "AI / ML & Intelligent Energy",
      desc: "Edge-AI inference engines, automated power-factor correction, predictive battery thermal runaways, and neural-network load forecasting.",
      icon: Brain,
      badge: "Edge AI",
      features: ["Edge Neural Networks", "Predictive SOH/SOC", "Self-Tuning Control Loops"],
      link: "/rnd/ai-ml",
    },
    {
      id: "quantum-technologies",
      title: "Quantum Technologies",
      desc: "Ultra-low noise cryogenic power supplies, precision sub-nanovolt voltage references, and quantum sensor signal-conditioning interfaces.",
      icon: Atom,
      badge: "Next Frontier",
      features: ["Cryogenic Low-Noise Stages", "Sub-ppm Voltage References", "Quantum Telemetry"],
      link: "/rnd/quantum-technologies",
    },
    {
      id: "defence-technology",
      title: "Defence & Strategic Technology",
      desc: "Ruggedized high-altitude power converters, MIL-STD-810G vibration-tolerant packaging, and EMI/EMC shielded subsystems for defense communications.",
      icon: ShieldCheck,
      badge: "Strategic Defence",
      features: ["MIL-STD Compliance", "Wide Ambient Range (-40°C to +75°C)", "Galvanic Isolation"],
      link: "/rnd/defence-technology",
    },
    {
      id: "industry-5-0",
      title: "Industry 5.0 & Smart Manufacturing",
      desc: "Collaborative robot (Cobot) actuator drives, intelligent microgrids, circular battery reuse, and edge predictive maintenance algorithms.",
      icon: Activity,
      badge: "Industry 5.0",
      features: ["Cobot High-Torque Drives", "Second-Life BESS Profiling", "Edge Anomaly Detection"],
      link: "/rnd/industry-5-0",
    },
    {
      id: "deeptech-innovation",
      title: "R&D & DeepTech Innovation",
      desc: "Translational research transforming fundamental physics into commercial-grade power electronics, active thermal cooling systems, and multi-physics simulations.",
      icon: Rocket,
      badge: "Foundation",
      features: ["Thermal CFD Modeling", "Multi-Physics Prototyping", "Zero-Capex Prototyping"],
      link: "/rnd/deeptech-innovation",
    },
  ];

  // Homepage FAQ Items
  const homeFAQs: FAQItem[] = [
    {
      id: "faq-1",
      question: "What is SMPS Electric Control (SMPS Tech Lab™)?",
      answer: "SMPS Electric Control Pvt Ltd (SMPS Tech Lab™) is a premier enterprise power electronics, energy storage, and industrial controller engineering firm. Operating state-of-the-art laboratory bays in Bengaluru, we conduct advanced R&D, offer VTU-accredited engineering internships, and manufacture breakthrough hardware.",
      category: "Organization",
    },
    {
      id: "faq-2",
      question: "Who is eligible for VTU-certified engineering internships?",
      answer: "Internships are open to 3rd and 4th-year B.E. / B.Tech and M.Tech students from Electrical, Electronics, Telecommunication, Mechanical, and Computer Science disciplines across all VTU-affiliated and recognized universities. Training takes place on real hardware inside the Bengaluru facility.",
      category: "Internships",
    },
    {
      id: "faq-3",
      question: "What products are currently in production versus R&D in progress?",
      answer: "Our active production portfolio includes PURNA BESS™ modular storage systems, SWARNALI™ 60kW DC EV Fast Chargers, SaralaChip™ CCU development kits, and laboratory robotics sets. Products in active R&D include Quantum BESS™ containerized megawatt storage and SmartLink™ 5G-ready industrial telemetry gateways.",
      category: "Hardware",
    },
    {
      id: "faq-4",
      question: "Can hardware entrepreneurs apply for venture acceleration and laboratory access?",
      answer: "Yes. Our Deep-Tech Entrepreneurship program provides founders with zero-capex access to multi-channel oscilloscopes, power grid simulators, battery cyclers, Design-for-Manufacturing (DFM) advisory, and institutional pilot testing. Applications are open year-round via our Entrepreneurship portal.",
      category: "Entrepreneurship",
    },
    {
      id: "faq-5",
      question: "How do institutional and corporate customers place hardware orders?",
      answer: "Clients can explore products in our online Hardware Catalog. For enterprise BESS containers, custom telecom SMPS rectifiers, or university lab setup packages, submit an ODM partnership inquiry or contact our sales engineering division directly.",
      category: "Procurement",
    },
  ];

  // Government Recognition Logos for Sliding Hero Banner (Strictly from /logos/GOVT)
  const recognizedLogos = [
    {
      name: "Ministry of Communications - Government of India",
      src: "/logos/GOVT/Govt1.png",
      width: 120,
      height: 40,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
    {
      name: "Department of Telecommunications (DoT) - India Telecom",
      src: "/logos/GOVT/Govt2.png",
      width: 40,
      height: 40,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
    {
      name: "Telecom Center of Excellence (TCOE India)",
      src: "/logos/GOVT/Govt3.png",
      width: 40,
      height: 40,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
    {
      name: "Visvesvaraya Technological University (VTU)",
      src: "/logos/GOVT/Govt4.png",
      width: 80,
      height: 44,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
    {
      name: "VTU Research & Innovation Foundation (VRIF)",
      src: "/logos/GOVT/Govt5.jpg",
      width: 55,
      height: 40,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
    {
      name: "DPIIT - Department for Promotion of Industry and Internal Trade",
      src: "/logos/GOVT/Govt6.png",
      width: 110,
      height: 40,
      className: "h-6 sm:h-7 w-auto object-contain",
    },
  ];

  // Dynamic Data Selectors with Live CMS Precedence
  const activeMilestones = home.milestones !== undefined ? home.milestones : collaborationMilestones;
  const activeDomainPillars = home.domains !== undefined ? home.domains : domainPillars;
  const activeUpcomingProducts = home.upcomingProducts || [];
  const activeHomeFAQs = home.faqs !== undefined ? home.faqs : homeFAQs;

  return (
    <div className="w-full bg-white text-[#1d1d1f] overflow-hidden selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* 1. CINEMATIC APPLE LIGHT HERO SECTION */}
      <section className="relative pt-2 pb-14 sm:pt-3 lg:pt-3 lg:pb-20 overflow-hidden border-b border-black/[0.06]">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              {/* Facility Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm">
                <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="font-mono text-[#6e6e73]">{home.heroEyebrow}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1d1d1f] leading-[1.05]">
                {home.heroTitleLine1} <br />
                <span className="text-gradient-apple-blue font-black">
                  {home.heroTitleLine2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed max-w-2xl font-normal">
                {home.heroSubtitle}
              </p>

              {/* CTA Button Group */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/rnd"
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  Explore R&D Labs
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/internships"
                  className="px-7 py-3.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold text-sm border border-[#e5e5ea] transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#0071e3]" />
                  VTU Internships
                </Link>
                <Link
                  href="/store"
                  className="px-6 py-3.5 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] font-semibold text-sm transition-all"
                >
                  Hardware Catalog →
                </Link>
              </div>

              {/* Dynamic Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-black/[0.06] max-w-2xl">
                {home.stats.map((stat) => (
                  <div key={stat.id} className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
                    <div className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#1d1d1f] font-bold mt-0.5">{stat.label}</div>
                    <div className="text-[10px] text-[#6e6e73] mt-0.5 leading-tight">{stat.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Video Card Column */}
            <div className="lg:col-span-6 relative space-y-2.5">
              {/* SMPS Electric Enterprise Logo - Centered Directly Over Recognized By Banner */}
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/logos/SMPSele.png"
                  alt="SMPS Electric Control Pvt Ltd"
                  width={484}
                  height={135}
                  priority
                  unoptimized
                  className="h-11 sm:h-13 lg:h-14 w-auto max-w-[85%] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Government Recognition & Affiliation Banner - Sliding Box with Running Neon Light */}
              <div className="relative w-full group">
                {/* 1. Ambient Blurred Neon Underglow in Background */}
                <div className="absolute -inset-2 rounded-2xl overflow-hidden blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
                  <div className="absolute inset-[-150%] animate-neon-run bg-[conic-gradient(from_0deg,transparent_0deg_240deg,#0071e3_280deg,#06b6d4_320deg,#10b981_350deg,#ffffff_360deg)]" />
                </div>

                {/* 2. Perimeter Running Neon Light Beam */}
                <div className="relative rounded-2xl p-[2px] overflow-hidden shadow-md">
                  <div className="absolute inset-[-150%] animate-neon-run bg-[conic-gradient(from_0deg,transparent_0deg_240deg,#0071e3_280deg,#06b6d4_320deg,#10b981_350deg,#ffffff_360deg)] pointer-events-none" />

                  {/* 3. Sliding Content Box */}
                  <div className="relative rounded-[14px] bg-white/95 backdrop-blur-xl flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 overflow-hidden">
                    {/* Left Badge: Fixed */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-1.5 pr-2.5 py-0.5 border-r border-[#e5e5ea] z-10 bg-white/95">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1d1d1f] whitespace-nowrap">
                        Recognized By
                      </span>
                    </div>

                    {/* Sliding Track Viewport with Edge Fade Gradients */}
                    <div className="relative flex-1 overflow-hidden min-w-0">
                      {/* Left edge fade */}
                      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 sm:w-5 bg-gradient-to-r from-white to-transparent z-10" />
                      {/* Right edge fade */}
                      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 sm:w-5 bg-gradient-to-l from-white to-transparent z-10" />

                      {/* Infinite Sliding Logostrip (Strictly /logos/GOVT) */}
                      <div className="animate-recognized-marquee flex items-center gap-3.5 sm:gap-5 py-0.5">
                        {[...recognizedLogos, ...recognizedLogos].map((logo, idx) => (
                          <div key={idx} className="flex items-center gap-3.5 sm:gap-5 shrink-0">
                            <div className="h-6 sm:h-7 flex items-center shrink-0">
                              <Image
                                src={logo.src}
                                alt={logo.name}
                                width={logo.width}
                                height={logo.height}
                                unoptimized
                                className={`${logo.className} transition-transform duration-200 hover:scale-110`}
                              />
                            </div>
                            <span className="w-px h-4 sm:h-5 bg-[#e5e5ea] shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Showcase Card & Walkthrough Description */}
              <HeroVideoCard />
              <div className="pt-2 px-1">
                <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-tight">
                  Inside our R&D testing bays
                </h3>
                <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                  This Is Where Tomorrow&apos;s Technology Takes Shape. From precision testing to advanced hardware prototyping, witness our engineers turning complex challenges into breakthrough solutions for India&apos;s digital infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING PRODUCTS & R&D IN PROGRESS PORTFOLIO */}
      {activeUpcomingProducts.length > 0 && (
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                Next-Gen Product Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
                Upcoming Products & R&D in Progress
              </h2>
              <p className="text-base text-[#6e6e73] mt-3 max-w-2xl font-normal leading-relaxed">
                Breakthrough hardware platforms currently undergoing high-voltage endurance trials and silicon verification inside the SMPS Tech Lab Engineering Center.
              </p>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:text-[#0056b3] transition group"
            >
              <span>Explore All Hardware Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeUpcomingProducts.map((prod) => (
              <div
                key={prod.id}
                className="apple-card p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-6 border border-black/[0.06]">
                    <Image
                      src={prod.imageUrl}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#1d1d1f] shadow-sm border border-black/[0.06]">
                      {prod.status}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">
                    {prod.brand}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1d1d1f] mt-1 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#6e6e73] font-medium mt-1">
                    {prod.tagline}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-[#f5f5f7] border border-black/[0.04]">
                    <span className="text-[11px] font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#059669]" />
                      {prod.stage}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {prod.specs.map((spec, idx) => (
                      <li key={idx} className="text-xs text-[#6e6e73] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#86868b]">
                    {prod.availability}
                  </span>
                  <Link
                    href={prod.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0071e3] hover:text-[#0056b3] transition"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 3. STRATEGIC DEEP-TECH DOMAINS INTEGRATION */}
      <section className="py-24 relative bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              Strategic Technology Verticals
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
              Domain-Specific Engineering Capabilities
            </h2>
            <p className="mt-4 text-base text-[#6e6e73] font-normal leading-relaxed">
              Operating at the intersection of deep-tech power conversion, microelectronics, defence grade systems, and telecommunication infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {activeDomainPillars.map((domain) => {
              const domainIconsMap: Record<string, React.ElementType> = {
                "power-electronics": Zap,
                "energy-storage-bess": BatteryCharging,
                "telecom-6g": Radio,
                "embedded-systems": Cpu,
                "vlsi-silicon": Layers,
                "ai-ml": Brain,
                "quantum-technologies": Atom,
                "defence-technology": ShieldCheck,
                "industry-5-0": Activity,
                "deeptech-innovation": Rocket,
                "rnd-deeptech": Rocket,
                "vlsi-asic": Layers,
                "defence-tech": ShieldCheck,
                "telecom-5g-6g": Radio,
                "quantum-tech": Atom,
                "industry-5": Activity,
                "energy-storage": BatteryCharging,
              };
              const Icon = (domain as any).icon || domainIconsMap[domain.id] || Zap;
              return (
                <div
                  key={domain.id}
                  className="apple-card p-6 flex flex-col justify-between group hover:border-[#0071e3]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50/80 px-2 py-0.5 rounded">
                        {domain.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition">
                      {domain.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed font-normal">
                      {domain.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-black/[0.04] space-y-1.5">
                      {domain.features.map((feat, i) => (
                        <div key={i} className="text-[11px] text-[#1d1d1f] font-medium flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#0071e3]" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <Link
                      href={domain.link}
                      className="text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] inline-flex items-center gap-1 transition"
                    >
                      <span>Explore Domain</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PARTNERS, CLIENTS & ACADEMIC COLLABORATION WITH TIMELINE */}
      <section className="py-20 relative bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Industry Partners */}
          <div className="apple-card p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-black/[0.06] mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  Strategic Industry Partners
                </span>
                <h3 className="text-xl font-bold text-[#1d1d1f]">Technology & Hardware Alliances</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md font-normal">
                Co-developing battery supply chains, EV fast charging components, and embedded power silicon.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {partnerLogos.map((p) => (
                <div key={p.name} className="brand-crystal-tile p-4 h-20 w-48">
                  <img src={p.path} alt={p.name} className="max-h-12 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Clients */}
          <div className="apple-card p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-black/[0.06] mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Enterprise Deployments & Clients
                </span>
                <h3 className="text-xl font-bold text-[#1d1d1f]">Industrial Customers & Off-Takers</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md font-normal">
                Supplying defense, telecom, power grids, and industrial fleets across India with certified power electronics.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
              {clientLogos.map((cl) => (
                <div
                  key={cl.name}
                  className="brand-crystal-tile p-3.5 h-20 flex items-center justify-center transition-all duration-200 hover:shadow-md"
                  title={cl.name}
                >
                  <img
                    src={cl.path}
                    alt={cl.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-11 max-w-full object-contain filter contrast-105"
                    onError={(e) => {
                      // Fallback if browser cached an interrupted request
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".client-fallback-badge")) {
                        const badge = document.createElement("span");
                        badge.className = "client-fallback-badge text-[11px] font-bold text-[#1d1d1f] text-center tracking-tight leading-tight line-clamp-2 px-1";
                        badge.textContent = cl.name;
                        parent.appendChild(badge);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Academic Collaborations + TIMELINE SECTION */}
          <div className="apple-card p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-black/[0.06] mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5" />
                  Academic Accreditation & Governance
                </span>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">
                  University Research Collaborations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md font-normal">
                Conferring university academic credits and doctoral test access in technical collaboration with VTU.
              </p>
            </div>

            {/* University Collaboration Logos */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-14">
              {collaborationLogos.map((c) => (
                <div key={c.name} className="brand-crystal-tile p-5 h-24 w-56">
                  <img src={c.path} alt={c.name} className="max-h-16 max-w-full object-contain" />
                </div>
              ))}
            </div>

            {/* TIMELINE UNDER COLLABORATION SECTION */}
            <div className="pt-10 border-t border-black/[0.06]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Institutional Roadmap
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#1d1d1f]">
                  SMPS Technological Milestones & Chronology
                </h4>
                <p className="text-xs sm:text-sm text-[#6e6e73] mt-2">
                  A transparent timeline tracing the evolution from joint MoU establishment to commercial hardware manufacturing.
                </p>
              </div>

              {/* Vertical Timeline with Connecting Line */}
              <div className="relative max-w-4xl mx-auto">
                {/* Center / Left connecting track */}
                <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#0071e3] via-indigo-500 to-emerald-500 -translate-x-1/2 hidden sm:block" />

                <div className="space-y-8 relative">
                  {activeMilestones.map((milestone, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div
                        key={idx}
                        className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 ${
                          isEven ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Milestone Card */}
                        <div className="w-full sm:w-1/2">
                          <div className="p-6 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] hover:border-[#0071e3]/30 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-[10px] font-bold uppercase">
                                {milestone.badge}
                              </span>
                              <span className="font-mono text-xs font-bold text-[#86868b]">
                                {milestone.quarter}
                              </span>
                            </div>

                            <h5 className="text-base font-bold text-[#1d1d1f] leading-snug">
                              {milestone.title}
                            </h5>
                            <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed font-normal">
                              {milestone.desc}
                            </p>

                            <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-mono font-bold text-[#059669]">
                              ✓ {milestone.metrics}
                            </div>
                          </div>
                        </div>

                        {/* Center Timeline Node */}
                        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-4 border-[#0071e3] shadow-md flex items-center justify-center z-10 hidden sm:flex">
                          <span className="text-[10px] font-black text-[#0071e3]">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Year Marker Side */}
                        <div
                          className={`w-full sm:w-1/2 text-left ${
                            isEven ? "sm:text-right" : "sm:text-left"
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl font-black text-gradient-apple-blue font-mono tracking-tight">
                            {milestone.year}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={activeHomeFAQs}
            title="Frequently Asked Questions"
            subtitle="Get clear answers regarding SMPS Tech Lab, VTU engineering internships, hardware certification, and venture access."
            badge="Knowledge Base & FAQs"
            showCategories={true}
          />
        </div>
      </section>

      {/* 6. DYNAMIC CALL-TO-ACTION BANNER */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-[32px] bg-gradient-to-r from-[#0071e3] via-[#0056b3] to-[#1e3a8a] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,113,227,0.25)] relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                SMPS Tech Lab & VTU Internship Opportunity
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 leading-tight tracking-tight">
                {home.ctaTitle}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
                {home.ctaSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto relative z-10">
              <Link
                href={home.ctaPrimaryLink || "/internships"}
                className="px-8 py-3.5 rounded-full bg-white text-[#0071e3] hover:bg-blue-50 font-semibold text-sm shadow-md transition-all duration-200 text-center whitespace-nowrap hover:scale-[1.02]"
              >
                {home.ctaPrimaryText || "Explore VTU Internships"}
              </Link>
              <Link
                href="/partner"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200 text-center whitespace-nowrap"
              >
                Partner with Lab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
