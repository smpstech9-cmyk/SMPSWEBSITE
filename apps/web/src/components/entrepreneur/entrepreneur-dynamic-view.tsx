"use client";

import React, { useState } from "react";
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
  TrendingUp,
  Award,
  DollarSign,
  FileText,
  Phone,
  Mail,
  X,
  Compass,
  Factory,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";

const DEFAULT_ENTREPRENEUR_FAQS: FAQItem[] = [
  {
    id: "ent-faq-1",
    question: "Do you take equity in hardware startups joining the incubator?",
    answer:
      "No. SMPS Tech Lab and VTU-VRIF provide a non-dilutive venture platform for deep-tech hardware entrepreneurs. We provide zero-capex workbench access, testing instruments, and DFM mentorship without mandatory equity warrants or dilution.",
    category: "Equity & Terms",
  },
  {
    id: "ent-faq-2",
    question: "Who retains ownership of the Intellectual Property (IP)?",
    answer:
      "Entrepreneurs retain 100% full commercial ownership of all proprietary IP, schematics, PCB layouts, firmware, and codebases developed in our bays. In cases of collaborative inventions with VTU faculty, clear technology transfer and licensing agreements are structured.",
    category: "IP Rights",
  },
  {
    id: "ent-faq-3",
    question: "What test instruments and laboratory facilities are accessible to founders?",
    answer:
      "Founders have direct access to 4-channel 1GHz mixed-signal oscilloscopes, 1500V regenerative DC load banks, programmable AC grid simulators, thermal environmental stress chambers (-40°C to +85°C), high-precision battery cyclers, and isolated CAN-FD bus analyzers.",
    category: "Facilities",
  },
  {
    id: "ent-faq-4",
    question: "Are external, non-VTU hardware entrepreneurs eligible to apply?",
    answer:
      "Yes. While VTU faculty and alumni receive fast-track admission, any deep-tech hardware entrepreneur working in CleanTech, Electric Mobility, Power Electronics, Semiconductors, or Industrial IoT across India is eligible to apply for cohort slots.",
    category: "Eligibility",
  },
  {
    id: "ent-faq-5",
    question: "Do you assist entrepreneurs with seed grants and venture capital?",
    answer:
      "Yes. We actively facilitate founder applications and documentation for DST NIDHI-PRAYAS grants, Karnataka Startup Seed Funds, MeitY TIDE 2.0 schemes, and institutional angel syndicates specializing in deep-tech hardware.",
    category: "Funding",
  },
];

const DEFAULT_FOUNDER_PERKS = [
  "Dedicated workstation bays inside the prestigious VTU-VRIF-TCOE Center in Bengaluru",
  "Direct 1-on-1 technical mentorship from veteran power electronics and silicon architects",
  "Prototyping component library, GaN/SiC developer boards, and wholesale procurement pricing",
  "Access to pilot manufacturing test runs, surface-mount lines, and PCB assembly facilities",
  "Comprehensive assistance with patent drafting, prior art search, and trademark filings",
  "Direct introductions to institutional grant programs (DST, MeitY) and clean-tech venture syndicates",
];

export function EntrepreneurDynamicView() {
  const { content } = useSiteContent();
  const inc = content.incubation || {
    heroEyebrow: "Deep-Tech Hardware Entrepreneurship & Venture Launchpad",
    heroTitle: "Empowering Deep-Tech Hardware Entrepreneurs",
    heroSubtitle:
      "Bridging the brutal 'hardware valley of death'. Operating from the prestigious VTU-VRIF-TCOE ecosystem, SMPS Tech Lab provides hardware entrepreneurs and startup founders with zero-capex testbenches, DFM engineering, regulatory pre-compliance certification, and venture market access.",
    facilityTitle: "Industrial Test Benches Built for Hardware Entrepreneurs",
    facilityDesc:
      "Don't spend millions of rupees on initial test equipment. Our facility equips hardware entrepreneurs with multi-channel oscilloscopes, 1500V load banks, grid simulators, and thermal chambers from day one.",
    founderPerks: DEFAULT_FOUNDER_PERKS,
    faqs: DEFAULT_ENTREPRENEUR_FAQS,
  };

  const activePerks = inc.founderPerks !== undefined ? inc.founderPerks : DEFAULT_FOUNDER_PERKS;
  const activeFaqs = inc.faqs !== undefined ? inc.faqs : DEFAULT_ENTREPRENEUR_FAQS;

  // Pitch Modal State
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [pitchSubmitted, setPitchSubmitted] = useState(false);
  const [pitchForm, setPitchForm] = useState({
    founderName: "",
    startupName: "",
    email: "",
    phone: "",
    stage: "prototype",
    domain: "Power Electronics & Energy Storage",
    facilityNeeds: "",
  });

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPitchSubmitted(true);
    setTimeout(() => {
      setPitchSubmitted(false);
      setIsPitchModalOpen(false);
      setPitchForm({
        founderName: "",
        startupName: "",
        email: "",
        phone: "",
        stage: "prototype",
        domain: "Power Electronics & Energy Storage",
        facilityNeeds: "",
      });
    }, 2800);
  };

  const entrepreneurPillars = [
    {
      title: "Lab Infrastructure & Prototyping",
      desc: "Zero-capex access to 1GHz oscilloscopes, 1500V load banks, grid simulators, battery cyclers, and environmental chambers inside VTU-VRIF-TCOE.",
      icon: Cpu,
      tag: "Zero CapEx",
    },
    {
      title: "Design for Manufacturing (DFM)",
      desc: "Transforming bench prototypes into commercial multi-layer SMD PCBs with tier-1 component sourcing, thermal modeling, and mass-assembly readiness.",
      icon: Layers,
      tag: "Production Ready",
    },
    {
      title: "Statutory Compliance & Testing",
      desc: "Pre-compliance testing and advisory for BIS, ARAI, CE, and CISPR EMI/EMC standards to de-risk commercial market deployment and regulatory approval.",
      icon: ShieldCheck,
      tag: "Certified",
    },
    {
      title: "Commercial Off-Take & Grants",
      desc: "Accelerating pilot deployments with regional utilities, technology transfer licensing, and non-dilutive government grant facilitation (DST, MeitY).",
      icon: TrendingUp,
      tag: "Market Traction",
    },
  ];

  const ventureStages = [
    {
      step: "01",
      title: "Architecture & Bring-Up",
      focus: "Feasibility, schematics, and simulation models",
      deliverable: "Functional bench prototype with validated control algorithms on SaralaChip or DSP silicon.",
    },
    {
      step: "02",
      title: "Design for Manufacturing",
      focus: "Multi-layer PCB layout & BOM optimization",
      deliverable: "Industrial enclosures, GaN/SiC thermal heat-sinking, and verified tier-1 component sourcing.",
    },
    {
      step: "03",
      title: "Environmental Stress & Safety",
      focus: "-40°C to +85°C thermal & 1500V load cycling",
      deliverable: "Pre-compliance EMI/EMC test report and safety interlock verification for BIS/ARAI readiness.",
    },
    {
      step: "04",
      title: "Commercial Pilots & Scale",
      focus: "Utility off-take, pilot batches & grants",
      deliverable: "Live deployments with regional grids (BESCOM), institutional seed capital, and commercial sales.",
    },
  ];

  const priorityDomains = [
    {
      title: "Clean Energy & Energy Storage",
      desc: "Next-gen battery chemistries, containerized BESS architectures, and second-life battery repurposing.",
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
                <span>{inc.heroEyebrow || "Deep-Tech Hardware Entrepreneurship & Venture Launchpad"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
                {inc.heroTitle || "Empowering Deep-Tech Hardware Entrepreneurs"}
              </h1>

              <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal max-w-2xl">
                {inc.heroSubtitle ||
                  "From proof-of-concept to commercial scale. Operating from the prestigious VTU-VRIF-TCOE ecosystem, SMPS Tech Lab equips hardware entrepreneurs with zero-capex testing bays, industrial DFM engineering, regulatory certification de-risking, and institutional grant pathways."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPitchModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Pitch Your Venture</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold text-sm border border-[#e5e5ea] transition"
                >
                  Explore VTU-VRIF Center
                </Link>
              </div>

              {/* Entrepreneur Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/[0.06] max-w-xl">
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
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.05]">
                  <div className="text-2xl font-black text-[#8b5cf6]">₹50L+</div>
                  <div className="text-[11px] font-bold text-[#6e6e73]">Seed Grant Pathways</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Lab Facility Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden apple-card-elevated aspect-[4/3] group shadow-2xl border border-black/[0.08]">
                <Image
                  src="/images/incubation-facility.jpg"
                  alt="State-of-the-Art VTU-VRIF Hardware Entrepreneurship & Prototyping Laboratory"
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
                      VTU-VRIF Entrepreneurship Center
                    </span>
                    <span className="text-[#059669] font-mono text-[11px] font-bold">Active Prototyping</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-2 font-normal leading-relaxed">
                    Zero-capex workbench bays equipped with digital oscilloscopes, high-frequency analyzers, and environmental stress chambers.
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

      {/* 2. 4 CORE ENTREPRENEUR ACCELERATION PILLARS */}
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">
              The Founder Acceleration Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] mt-2 tracking-tight">
              From Lab Proof-of-Concept to Market Scale
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              We eliminate the brutal bottlenecks that kill hardware startups: multi-million rupee test equipment costs, manufacturing complexity, regulatory failure, and lack of customer traction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {entrepreneurPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="apple-card p-8 flex flex-col justify-between hover:border-[#059669]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                        {pillar.tag}
                      </span>
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

      {/* 3. THE HARDWARE ENTREPRENEUR VENTURE ROADMAP */}
      <section className="py-24 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0071e3]">
              The Founder Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-2 tracking-tight">
              The 4-Stage Hardware Venture Track
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              A structured roadmap built specifically for hardware entrepreneurs to de-risk engineering, pass compliance, and secure customer revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ventureStages.map((stage) => (
              <div
                key={stage.step}
                className="apple-card p-7 flex flex-col justify-between border border-[#e5e5ea] hover:border-[#0071e3]/40 transition"
              >
                <div>
                  <div className="text-3xl font-black text-[#0071e3] tracking-tighter mb-4">
                    {stage.step}
                  </div>
                  <h3 className="text-base font-bold text-[#1d1d1f]">{stage.title}</h3>
                  <div className="text-[11px] font-semibold text-[#059669] mt-1">
                    {stage.focus}
                  </div>
                  <p className="text-xs text-[#6e6e73] mt-3 leading-relaxed font-normal">
                    {stage.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL SHOWCASE: INSIDE THE PROTOTYPING BENCH */}
      <section className="py-24 bg-[#fbfbfd] border-b border-black/[0.06]">
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
                    <span className="text-[#059669] font-mono">Founder Workstation</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Entrepreneurs fine-tuning cell balancing thresholds on real lithium pack prototypes with dedicated multimeters and thermal probes.
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
                {inc.facilityTitle || "Industrial Test Benches Built for Hardware Entrepreneurs"}
              </h2>
              <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed font-normal">
                {inc.facilityDesc ||
                  "Avoid spending millions of rupees on initial test equipment. Our facility provides founders with production-ready validation tools from day one."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-xs">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Mixed-Signal Oscilloscopes</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Multi-channel 1GHz bandwidth oscilloscopes with CAN-FD and LIN protocol decoders.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-xs">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Regenerative Load Banks</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    1500V DC and 415V 3-phase AC bi-directional programmable power sources.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-xs">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Thermal Stress Chambers</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    -40°C to +85°C environmental cycling for automotive component validation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-xs">
                  <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Pre-Compliance EMI/EMC</span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] mt-1">
                    Conducted and radiated emissions spectrum analyzers for CISPR and BIS de-risking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TARGET VERTICALS */}
      <section className="py-24 relative bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">
              Target Verticals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-2 tracking-tight">
              Priority Deep-Tech Domains We Back
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              Our lab is purpose-built to accelerate startups in sectors where physical hardware innovation creates high-barrier, defensible moats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priorityDomains.map((track) => (
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

      {/* 6. FOUNDER PRIVILEGES & ACADEMIC SYNERGY */}
      <section className="py-24 bg-[#fbfbfd] text-[#1d1d1f] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                The Entrepreneur Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] leading-tight tracking-tight">
                What Hardware Founders Receive at SMPS Tech Lab
              </h2>
              <p className="text-base text-[#6e6e73] leading-relaxed font-normal">
                We are hardware engineers and entrepreneurs ourselves. We know what it takes to build defensible physical products that win enterprise purchase orders.
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
                <button
                  type="button"
                  onClick={() => setIsPitchModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Submit Your Startup Pitch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 apple-card-elevated relative bg-white border border-[#e5e5ea]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-semibold mb-4">
                  <Building2 className="w-4 h-4" /> Academic & Industry Synergy
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">
                  University Technology Transfer & Spin-Offs
                </h3>
                <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
                  Are you a university professor, researcher, or M.Tech/Ph.D. scholar with an innovative power electronics patent, silicon controller, or hardware prototype?
                </p>
                <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
                  SMPS Tech Lab provides structured joint commercialization models, licensing frameworks, and corporate venture acceleration to bring your thesis discoveries into industrial deployment.
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

      {/* 7. ENTREPRENEUR FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={activeFaqs}
            title="Entrepreneur & Venture FAQs"
            subtitle="Straightforward answers on IP ownership, non-dilutive terms, laboratory equipment access, and seed grant facilitation."
            badge="Founder Knowledge Base"
            showCategories={false}
          />
        </div>
      </section>

      {/* PITCH MODAL */}
      {isPitchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPitchModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {pitchSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1d1d1f]">
                  Pitch Received!
                </h3>
                <p className="text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                  Thank you for submitting your venture. Our technical committee will review your architecture and contact you within 48 business hours to schedule a facility walkthrough.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                    Hardware Venture Intake
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                  Pitch to SMPS Tech Lab
                </h3>
                <p className="text-xs text-[#6e6e73] mt-1 mb-6">
                  Apply for non-dilutive workbench access, high-voltage test bays, and DFM support.
                </p>

                <form onSubmit={handlePitchSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Founder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pitchForm.founderName}
                        onChange={(e) => setPitchForm({ ...pitchForm, founderName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Startup / Venture Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pitchForm.startupName}
                        onChange={(e) => setPitchForm({ ...pitchForm, startupName: e.target.value })}
                        placeholder="e.g. VoltFlow Systems"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={pitchForm.email}
                        onChange={(e) => setPitchForm({ ...pitchForm, email: e.target.value })}
                        placeholder="founder@venture.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={pitchForm.phone}
                        onChange={(e) => setPitchForm({ ...pitchForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Current Venture Stage
                      </label>
                      <select
                        value={pitchForm.stage}
                        onChange={(e) => setPitchForm({ ...pitchForm, stage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none bg-white"
                      >
                        <option value="ideation">Ideation & Schematic Stage</option>
                        <option value="prototype">Functional Bench Prototype Built</option>
                        <option value="testing">Seeking Compliance & Stress Testing</option>
                        <option value="scaling">Pilot Production & Commercial Scaling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                        Primary Deep-Tech Domain
                      </label>
                      <select
                        value={pitchForm.domain}
                        onChange={(e) => setPitchForm({ ...pitchForm, domain: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] outline-none bg-white"
                      >
                        <option value="Power Electronics & Energy Storage">Power Electronics & BESS</option>
                        <option value="EV Powertrains & Fast Chargers">EV Powertrains & Charging</option>
                        <option value="Semiconductors & DSP Silicon">Semiconductors & DSP Silicon</option>
                        <option value="Industrial IoT & Telemetry">Industrial IoT & Telemetry</option>
                        <option value="Defence & Rugged Electronics">Defence & Rugged Electronics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                      Brief Description & Lab Needs *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={pitchForm.facilityNeeds}
                      onChange={(e) => setPitchForm({ ...pitchForm, facilityNeeds: e.target.value })}
                      placeholder="Tell us what physical hardware you are building, what test instruments you require, and any current blockers."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-normal focus:border-[#0071e3] outline-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-md transition cursor-pointer"
                    >
                      Submit Venture Application
                    </button>
                    <p className="text-[11px] text-[#86868b] text-center mt-2.5">
                      100% Non-Dilutive • Strict Mutual Non-Disclosure Agreement (NDA) Protected
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
