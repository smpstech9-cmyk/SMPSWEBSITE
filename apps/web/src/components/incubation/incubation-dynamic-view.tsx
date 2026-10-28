"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Rocket,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Briefcase,
  Sparkles,
  Zap,
  Activity,
  Check,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";

const DEFAULT_INCUBATION_FAQS: FAQItem[] = [
  {
    id: "inc-faq-1",
    question: "Do you take equity in incubated hardware startups?",
    answer:
      "No. SMPS Tech Lab and VTU-VRIF offer non-dilutive incubation support for early-stage student and academic founders. We provide zero-capex workbench access, testing instruments, and DFM mentorship without mandatory equity warrants.",
    category: "Equity & Terms",
  },
  {
    id: "inc-faq-2",
    question: "Who retains ownership of Intellectual Property (IP)?",
    answer:
      "Startups and founders retain 100% full commercial ownership of proprietary IP, schematics, and codebases developed in the incubation bay. In cases of co-developed joint patents with VTU faculty, structured technology transfer licensing agreements are established.",
    category: "IP Rights",
  },
  {
    id: "inc-faq-3",
    question: "What test instruments and laboratory facilities are accessible?",
    answer:
      "Incubated teams have direct access to 4-channel mixed-signal oscilloscopes, 1500V regenerative DC load banks, programmable AC grid simulators, thermal environmental stress chambers (-40°C to +85°C), high-precision battery cyclers, and isolated CAN-bus analyzers.",
    category: "Facilities",
  },
  {
    id: "inc-faq-4",
    question: "Are external non-VTU engineering founders eligible to apply?",
    answer:
      "Yes. While VTU faculty and alumni receive fast-track admission, any deep-tech hardware startup working in CleanTech, Electric Mobility, Power Electronics, Semiconductors, or Industrial IoT across India is eligible to apply for cohort slots.",
    category: "Eligibility",
  },
  {
    id: "inc-faq-5",
    question: "Do you assist with institutional grants and seed capital?",
    answer:
      "Yes. We facilitate founder introductions and documentation assistance for DST NIDHI-PRAYAS grants, Karnataka Startup Seed Funds, MeitY TIDE 2.0 schemes, and institutional angel syndicates specializing in deep-tech hardware.",
    category: "Funding",
  },
];

const DEFAULT_FOUNDER_PERKS = [
  "Workstation bays located inside the prestigious VTU-VRIF-TCOE Center",
  "Direct technical mentorship from veteran power electronics design engineers",
  "Prototyping component library & discount hardware procurement",
  "Access to pilot manufacturing test runs and PCB assembly lines",
  "Assistance with patent drafting, provisional filings, and trademarking",
  "Introduction to institutional grant programs and clean-tech angel syndicates",
];

export function IncubationDynamicView() {
  const { content } = useSiteContent();
  const inc = content.incubation || {
    heroEyebrow: "Deep-Tech Hardware Incubation & Venture Launchpad",
    heroTitle: "Empowering Hardware Entrepreneurs & Innovators",
    heroSubtitle:
      "We bridge the brutal 'hardware valley of death'. Operating from the VTU-VRIF-TCOE ecosystem, SMPS Tech Lab provides founders with laboratory test equipment, DFM engineering, regulatory certification guidance, and market access.",
    facilityTitle: "Industrial Test Instruments at Your Fingertips",
    facilityDesc:
      "Avoid spending millions of rupees on initial test equipment. Our facility provides founders with production-ready validation tools from day one.",
    founderPerks: DEFAULT_FOUNDER_PERKS,
    faqs: DEFAULT_INCUBATION_FAQS,
  };

  const activePerks =
    inc.founderPerks !== undefined ? inc.founderPerks : DEFAULT_FOUNDER_PERKS;

  const activeFaqs =
    inc.faqs !== undefined ? inc.faqs : DEFAULT_INCUBATION_FAQS;

  const incubationPillars = [
    {
      title: "Lab Infrastructure & Rapid Prototyping",
      desc: "Zero-capex access to multi-channel high-frequency oscilloscopes, grid simulators, battery cyclers, and environmental chambers inside VTU-VRIF-TCOE.",
      icon: Cpu,
    },
    {
      title: "Design for Manufacturing (DFM)",
      desc: "Transforming lab proof-of-concepts into industrial multi-layer PCBs with optimized component sourcing, thermal modeling, and mass-assembly readiness.",
      icon: Layers,
    },
    {
      title: "Statutory Compliance & Certification",
      desc: "Pre-compliance testing and advisory for BIS, ARAI, CE, and CISPR EMI/EMC standards to de-risk commercial market deployment.",
      icon: ShieldCheck,
    },
    {
      title: "Technology Transfer & Commercialization",
      desc: "Bridging the gap between academic research breakthroughs and industry off-takers through joint patents, licensing, and venture spin-offs.",
      icon: Briefcase,
    },
  ];

  const focusTracks = [
    {
      title: "Clean Energy & Energy Storage",
      desc: "Next-gen battery chemistries, second-life EV battery repurposing, and commercial BESS architectures.",
      badge: "High Impact",
    },
    {
      title: "EV Powertrains & Fast Charging",
      desc: "High-voltage DC fast charging systems, smart BMS algorithms, and bidirectional vehicle-to-grid (V2G) interfaces.",
      badge: "Mobility",
    },
    {
      title: "Semiconductors & Embedded Silicon",
      desc: "Digital signal controllers, GaN/SiC power stages, motor controllers, and edge-computing IoT hardware.",
      badge: "Deep Tech",
    },
    {
      title: "Smart Grid & Industrial Automation",
      desc: "Industrial telemetry, predictive equipment maintenance, microgrid energy routers, and high-efficiency telecom SMPS.",
      badge: "Enterprise",
    },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f]">
      {/* 1. HERO SECTION WITH LAB FACILITY PHOTOGRAPHY */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-black/[0.06]">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/[0.07] via-teal-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#059669] text-xs font-semibold tracking-wide uppercase shadow-sm">
                <Rocket className="w-3.5 h-3.5" />
                {inc.heroEyebrow || "Deep-Tech Hardware Incubation & Venture Launchpad"}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
                {inc.heroTitle || "Empowering Hardware Entrepreneurs & Innovators"}
              </h1>

              <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal max-w-2xl">
                {inc.heroSubtitle ||
                  "We bridge the brutal 'hardware valley of death'. Operating from the VTU-VRIF-TCOE ecosystem, SMPS Tech Lab provides founders with laboratory test equipment, DFM engineering, regulatory certification guidance, and market access."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact?inquiry=incubation"
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2"
                >
                  Apply for Incubation Cohort
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold text-sm border border-[#e5e5ea] transition"
                >
                  Explore VTU-VRIF Center
                </Link>
              </div>

              {/* Incubation Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] max-w-lg">
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-2xl font-black text-[#1d1d1f]">₹0</div>
                  <div className="text-[11px] font-bold text-[#6e6e73]">Capex for Lab Gear</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-2xl font-black text-[#059669]">1500V</div>
                  <div className="text-[11px] font-bold text-[#6e6e73]">High-Voltage Test Bay</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-2xl font-black text-[#0071e3]">100%</div>
                  <div className="text-[11px] font-bold text-[#6e6e73]">Founder IP Retained</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Lab Facility Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden apple-card-elevated aspect-[4/3] group shadow-2xl border border-black/[0.08]">
                <Image
                  src="/images/incubation-facility.jpg"
                  alt="State-of-the-Art VTU-VRIF Hardware Incubation & Prototyping Laboratory"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Facility Telemetry Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/40 shadow-xl">
                  <div className="flex items-center justify-between text-xs pb-1.5 border-b border-gray-100">
                    <span className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                      VTU-VRIF Incubation Wing
                    </span>
                    <span className="text-[#059669] font-mono text-[11px] font-bold">Active Lab Bays</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-2 font-normal leading-relaxed">
                    Zero-capex workbench bays equipped with digital oscilloscopes, robotic test jigs, and environmental stress chambers.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3.5 -right-3.5 px-4 py-1.5 rounded-full bg-[#059669] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(5,150,105,0.35)] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep-Tech Accelerator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 CORE INCUBATION PILLARS */}
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">
              Venture Acceleration Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] mt-2 tracking-tight">
              From Lab Prototype to Market-Ready Product
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              We remove the four biggest bottlenecks that kill hardware startups: expensive test equipment, manufacturing complexity, regulatory failure, and lack of customer traction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {incubationPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="apple-card p-8 flex flex-col justify-between hover:border-[#059669]/30 transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1d1d1f] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VISUAL SHOWCASE: INSIDE THE PROTOTYPING BENCH */}
      <section className="py-24 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Real Prototype Testing Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] overflow-hidden apple-card-elevated aspect-[16/10] group shadow-xl border border-black/[0.06]">
                <Image
                  src="/images/incubation-prototyping.jpg"
                  alt="Hardware Founders Collaborating on High-Voltage Battery Prototype"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1d1d1f]">
                    <span>Hardware Bring-Up & BMS Calibration</span>
                    <span className="text-[#059669] font-mono">Precision Testing</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Founders fine-tuning cell balancing thresholds on real lithium pack prototypes with dedicated multimeters and thermal probes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Technical Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                Hardware Workbench Specifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] leading-tight tracking-tight">
                {inc.facilityTitle || "Industrial Test Instruments at Your Fingertips"}
              </h2>
              <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed font-normal">
                {inc.facilityDesc ||
                  "Avoid spending millions of rupees on initial test equipment. Our facility provides founders with production-ready validation tools from day one."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Mixed-Signal Oscilloscopes</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Multi-channel 1GHz bandwidth oscilloscopes with CAN/LIN protocol decoders.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Regenerative Load Banks</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    1500V DC and 415V 3-phase AC bi-directional programmable power sources.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Thermal Stress Chambers</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    -40°C to +85°C environmental cycling for automotive component validation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Pre-Compliance EMI/EMC</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Conducted and radiated emissions spectrum analyzers for CISPR de-risking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOCUS DOMAINS */}
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">
              Target Verticals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-2 tracking-tight">
              Priority Deep-Tech Domains We Back
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              Our lab is purpose-built to accelerate startups in sectors where physical hardware innovation drives massive economic value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusTracks.map((track) => (
              <div key={track.title} className="apple-card p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
                    {track.badge}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">{track.title}</h4>
                <p className="mt-2 text-sm text-[#6e6e73] leading-relaxed font-normal">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOUNDER PRIVILEGES & ACADEMIC SYNERGY */}
      <section className="py-24 bg-white text-[#1d1d1f] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                Founder Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] leading-tight tracking-tight">
                What Incubated Startups Receive at SMPS Tech Lab
              </h2>
              <p className="text-base text-[#6e6e73] leading-relaxed font-normal">
                We are founders and engineers ourselves. We know what hardware entrepreneurs need to build defensible businesses that win institutional orders.
              </p>

              <div className="space-y-3 pt-2">
                {activePerks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#1d1d1f] font-medium">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/contact?inquiry=incubation"
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2"
                >
                  Submit Your Startup Pitch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 apple-card-elevated relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-semibold mb-4">
                  <Building2 className="w-4 h-4" /> Academic & Industry Synergy
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">
                  University Technology Transfer
                </h3>
                <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
                  Are you a university professor, researcher, or M.Tech/Ph.D. scholar with an innovative power electronics patent or hardware prototype?
                </p>
                <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
                  SMPS Tech Lab provides joint commercialization models, licensing frameworks, and corporate venture acceleration to bring your thesis discoveries into industrial deployment.
                </p>
                <div className="mt-6 pt-6 border-t border-black/[0.06]">
                  <Link
                    href="/contact?inquiry=tech-transfer"
                    className="text-sm font-semibold text-[#0071e3] hover:text-[#0056b3] flex items-center gap-1.5 transition"
                  >
                    Discuss Technology Licensing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INCUBATION FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={activeFaqs}
            title="Incubation & Prototyping FAQs"
            subtitle="Clear answers on IP retention, zero-equity terms, laboratory equipment access, and grant facilitation."
            badge="Founder Knowledge Base"
            showCategories={false}
          />
        </div>
      </section>
    </div>
  );
}
