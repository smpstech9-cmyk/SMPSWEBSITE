"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Check,
  TrendingUp,
  Coins,
  Scale,
  Users,
  Target,
  GraduationCap,
  MousePointer2,
  X,
  ChevronRight,
  Factory,
  Compass,
} from "lucide-react";
import { TubesBackground } from "@/components/ui/tubes-background";
import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";

const ENTREPRENEUR_FAQS: FAQItem[] = [
  {
    id: "ent-faq-1",
    question: "Do you take equity in hardware startups participating in the Entrepreneurship Hub?",
    answer:
      "No. SMPS Tech Lab and VTU-VRIF operate a strictly non-dilutive venture acceleration model. We take 0% equity and 0% warrants. Founders retain 100% full cap table ownership.",
    category: "Equity & Ownership",
  },
  {
    id: "ent-faq-2",
    question: "Who retains ownership of the Intellectual Property (IP) and patents?",
    answer:
      "Founders retain 100% commercial ownership of all proprietary IP, schematics, PCB designs, firmware, and codebases developed during their incubation. In cases involving joint academic patents with VTU faculty, structured, founder-friendly technology transfer and licensing agreements are established.",
    category: "IP & Legal",
  },
  {
    id: "ent-faq-3",
    question: "How do you help early-stage entrepreneurs secure government seed grants?",
    answer:
      "We provide end-to-end grant advisory: refining technical milestone roadmaps, drafting compliance-grade proposals, budgeting, and pitch preparation for DST NIDHI-PRAYAS (up to ₹10 Lakhs), MeitY TIDE 2.0 (up to ₹30 Lakhs), Karnataka Startup ELEVATE (up to ₹50 Lakhs), and the Startup India Seed Fund Scheme (SISFS).",
    category: "Funding & Grants",
  },
  {
    id: "ent-faq-4",
    question: "Can college students or final-year engineering project teams apply?",
    answer:
      "Yes. Our Student Founder Fellowship is designed specifically to help aspiring student engineers transition academic capstone projects into legally incorporated, investable deep-tech enterprises.",
    category: "Eligibility",
  },
  {
    id: "ent-faq-5",
    question: "Are external, non-VTU founders and startups eligible to apply?",
    answer:
      "Yes. While VTU faculty and alumni receive fast-track admission, any deep-tech hardware entrepreneur or startup team working in Power Electronics, EV Infrastructure, Energy Storage, Semiconductors, or Industrial IoT across India is eligible to apply.",
    category: "Eligibility",
  },
  {
    id: "ent-faq-6",
    question: "How are founders connected to angel investors and venture capital firms?",
    answer:
      "Startups reaching the validation stage participate in curated Investor Demo Days and closed-door pitch sessions with institutional hardware angel syndicates, climate-tech VCs, and family offices actively seeking high-barrier physical technology investments.",
    category: "Investor Relations",
  },
];

const VENTURE_TRACKS = [
  {
    id: "track-students",
    title: "Student Founder Fellowship",
    tagline: "Campus Capstone to Registered Startup",
    badge: "Students & Alumni",
    icon: GraduationCap,
    desc: "A dedicated 6-month pre-incubation program for engineering students and recent graduates. We help student innovators convert capstone research into market-viable products with seed grants, co-founder matchmaking, and company incorporation.",
    benefits: [
      "Zero-capex prototyping bench inside VTU-VRIF Center",
      "Assistance with Private Limited registration & DPIIT recognition",
      "Seed grant application support (NIDHI-PRAYAS up to ₹10L)",
      "Technical mentorship from practicing hardware architects",
    ],
    cta: "Apply as Student Founder",
  },
  {
    id: "track-accelerator",
    title: "Deep-Tech Hardware Accelerator",
    tagline: "16-Week Intensive Scale Track",
    badge: "Early-Stage Startups",
    icon: Rocket,
    desc: "A rigorous acceleration track for incorporated hardware ventures with a working proof-of-concept. Designed to bridge the brutal hardware valley of death through DFM engineering, regulatory de-risking, and commercial customer off-take.",
    benefits: [
      "BOM optimization & tier-1 semiconductor procurement",
      "Pre-compliance EMI/EMC & environmental stress testing",
      "Commercial pilot deployments with regional utilities & fleets",
      "Demo Day presentations to institutional deep-tech angel syndicates",
    ],
    cta: "Apply for Accelerator",
  },
  {
    id: "track-academic",
    title: "Faculty Research & Technology Spin-Offs",
    tagline: "Commercializing Institutional R&D",
    badge: "Academic Spin-Offs",
    icon: Building2,
    desc: "Empowering university professors, research scholars, and Ph.D. candidates to commercialize patent-backed discoveries in power conversion, silicon controllers, and battery architectures into independent corporate ventures.",
    benefits: [
      "Structured technology transfer & licensing frameworks",
      "Joint university patent prosecution & IP protection",
      "Corporate venture studio matching & executive leadership",
      "Access to MeitY TIDE 2.0 & DST non-dilutive translational funds",
    ],
    cta: "Explore Tech Transfer",
  },
  {
    id: "track-women",
    title: "Women in Deep-Tech & Hardware",
    tagline: "Empowering Female Engineering Founders",
    badge: "Diversity Initiative",
    icon: Sparkles,
    desc: "A targeted initiative providing female hardware inventors and technical founders with focused mentorship, dedicated non-dilutive grant pathways, executive coaching, and peer support networks.",
    benefits: [
      "Dedicated women entrepreneurship grant facilitation",
      "1-on-1 executive mentorship with female tech CXOs",
      "Priority allocation of prototyping bays and equipment",
      "Spotlight features at national technology conferences",
    ],
    cta: "Join Women in Tech Track",
  },
];

const VENTURE_ROADMAP = [
  {
    step: "01",
    phase: "Phase 1: Discovery & Validation",
    duration: "Weeks 1 - 4",
    title: "Problem-Solution & Market Fit",
    focus: "Customer discovery, TAM/SAM/SOM sizing & patent landscape",
    deliverables: [
      "Customer discovery interviews with enterprise off-takers",
      "Initial Business Model Canvas & unit economics analysis",
      "Patent prior-art search & defensible moat strategy",
      "Architecture design review with senior power electronics engineers",
    ],
  },
  {
    step: "02",
    phase: "Phase 2: Prototyping & Incorporation",
    duration: "Weeks 5 - 12",
    title: "Alpha Build & Non-Dilutive Capital",
    focus: "Functional prototype, company setup & grant filings",
    deliverables: [
      "Working alpha hardware bench prototype verified on real loads",
      "Private Limited company incorporation & DPIIT startup certification",
      "Filing provisional patent applications to protect founder IP",
      "Submission of DST NIDHI-PRAYAS or MeitY TIDE 2.0 grant proposals",
    ],
  },
  {
    step: "03",
    phase: "Phase 3: DFM & Pre-Compliance",
    duration: "Weeks 13 - 20",
    title: "Industrial Engineering & B2B Pilots",
    focus: "Production PCB layout, stress testing & commercial LOIs",
    deliverables: [
      "Design for Manufacturing (DFM) multi-layer SMD board layout",
      "Thermal stress cycling (-40°C to +85°C) & EMI/EMC pre-testing",
      "Securing commercial Letters of Intent (LOIs) from enterprise buyers",
      "Pilot batch manufacturing assembly & supplier vendor onboarding",
    ],
  },
  {
    step: "04",
    phase: "Phase 4: Scale & Investment",
    duration: "Weeks 21+",
    title: "Investor Demo Day & Market Growth",
    focus: "Institutional rounds, utility off-take & revenue expansion",
    deliverables: [
      "Curated pitch presentation at institutional Investor Demo Day",
      "Facilitated angel / seed funding syndicate term sheet evaluation",
      "Onboarding on Government e-Marketplace (GeM) & enterprise vendor lists",
      "Volume manufacturing scale-up with trusted EMS assembly partners",
    ],
  },
];

const GRANT_SCHEMES = [
  {
    name: "DST NIDHI-PRAYAS",
    authority: "Department of Science & Technology (DST), Govt. of India",
    amount: "Up to ₹10,00,000",
    type: "100% Non-Dilutive Grant-in-Aid",
    purpose:
      "Supports physical hardware innovators in translating technical ideas into functional proof-of-concept prototypes within 18 months.",
    highlight: "Zero equity dilution • Direct prototype development expenses covered",
  },
  {
    name: "MeitY TIDE 2.0 (EIR & Grant)",
    authority: "Ministry of Electronics & Information Technology (MeitY)",
    amount: "₹7,00,000 to ₹30,00,000",
    type: "Fellowship Stipend & Prototyping Grant",
    purpose:
      "Promotes tech entrepreneurship through financial support for ideation (EIR stipend) and validation grants for IoT, power electronics, and electronics ventures.",
    highlight: "Monthly founder stipend + comprehensive prototype validation grant",
  },
  {
    name: "Karnataka Startup ELEVATE",
    authority: "Dept. of Electronics, IT, Bt and S&T, Govt. of Karnataka",
    amount: "Up to ₹50,00,000",
    type: "Non-Dilutive Seed Funding Grant",
    purpose:
      "Identifies top innovative startups in Karnataka and provides non-dilutive seed capital, incubation, legal advisory, and subsidized lab access.",
    highlight: "Prestigious state government backing • Substantial seed capital",
  },
  {
    name: "Startup India Seed Fund (SISFS)",
    authority: "DPIIT, Ministry of Commerce and Industry",
    amount: "₹20,00,000 to ₹50,00,000",
    type: "Grant & Convertible Debt",
    purpose:
      "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    highlight: "Up to ₹20L grant for prototype + ₹50L convertible debentures for market launch",
  },
];

const ENTREPRENEUR_PILLARS = [
  {
    title: "Non-Dilutive Grants & Seed Capital",
    desc: "Unlock up to ₹50 Lakhs in non-dilutive government funding (DST, MeitY, ELEVATE, SISFS) without sacrificing founder equity.",
    icon: Coins,
    tag: "Capital Access",
  },
  {
    title: "Design for Manufacturing (DFM)",
    desc: "Bridge the prototype-to-production gap with industrial PCB layout, BOM optimization, tier-1 component sourcing, and mass-assembly readiness.",
    icon: Factory,
    tag: "Production Scale",
  },
  {
    title: "Pre-Compliance Certification Shield",
    desc: "Pre-test against stringent CISPR, BIS, and ARAI standards inside our labs before spending capital on official government test houses.",
    icon: ShieldCheck,
    tag: "De-Risked Testing",
  },
  {
    title: "Enterprise Off-Take & Commercial Pilots",
    desc: "Direct access to enterprise buyers, regional electricity utilities (BESCOM/KPTCL), renewable microgrid operators, and industrial OEM procurement.",
    icon: TrendingUp,
    tag: "Customer Revenue",
  },
  {
    title: "Full Intellectual Property (IP) Retained",
    desc: "Entrepreneurs retain 100% full commercial ownership of all schematics, codebases, and patents. We assist with provisional drafting and filings.",
    icon: Scale,
    tag: "100% Founder IP",
  },
  {
    title: "CXO Mentorship & Investor Demo Days",
    desc: "Weekly 1-on-1 strategy sessions with veteran hardware founders, serial entrepreneurs, and direct closed-door presentations to deep-tech angel syndicates.",
    icon: Users,
    tag: "Venture Network",
  },
];

const TARGET_VERTICALS = [
  {
    title: "Clean Energy Storage & BESS",
    desc: "Grid-scale battery storage, containerized BESS, second-life battery pack repurposing, and active balancing BMS.",
    badge: "CleanTech",
    icon: Zap,
  },
  {
    title: "EV Powertrains & Fast Charging",
    desc: "Bidirectional vehicle-to-grid (V2G) DC fast chargers, traction motor drives, and onboard EV chargers (OBC).",
    badge: "E-Mobility",
    icon: Activity,
  },
  {
    title: "Indigenous Silicon & Controller DSPs",
    desc: "Real-time digital signal controllers, GaN/SiC power stages, motor controllers, and FPGA hardware accelerators.",
    badge: "Semiconductors",
    icon: Cpu,
  },
  {
    title: "Smart Microgrids & Industrial IoT",
    desc: "Distributed microgrid energy routers, industrial Modbus/CAN telemetry, predictive maintenance, and telecom SMPS.",
    badge: "Industrial Automation",
    icon: Layers,
  },
  {
    title: "Aerospace & Defence Power Electronics",
    desc: "Ruggedized high-altitude power modules, MIL-STD-810G compliant enclosures, and shock-tolerant military conversion.",
    badge: "Defence Tech",
    icon: ShieldCheck,
  },
  {
    title: "Robotics & Precision Motor Control",
    desc: "Brushless DC (BLDC) motor drivers, field-oriented control (FOC) algorithms, and warehouse automation controllers.",
    badge: "Robotics",
    icon: Target,
  },
];

export function EntrepreneurDynamicView() {
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [pitchSubmitted, setPitchSubmitted] = useState(false);
  const [pitchForm, setPitchForm] = useState({
    founderName: "",
    startupName: "",
    email: "",
    phone: "",
    stage: "prototype",
    domain: "Power Electronics & Energy Storage",
    fundingStatus: "bootstrapped",
    track: "Deep-Tech Hardware Accelerator",
    pitchDeckUrl: "",
    ventureDescription: "",
  });

  const handleOpenModal = (trackName?: string) => {
    if (trackName) {
      setPitchForm((prev) => ({ ...prev, track: trackName }));
    }
    setIsPitchModalOpen(true);
  };

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
        fundingStatus: "bootstrapped",
        track: "Deep-Tech Hardware Accelerator",
        pitchDeckUrl: "",
        ventureDescription: "",
      });
    }, 2800);
  };

  return (
    <div className="w-full bg-[#07070a] text-white selection:bg-[#0071e3] selection:text-white">
      {/* 1. INTERACTIVE 3D TUBES BACKGROUND HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/[0.08]">
        <TubesBackground className="min-h-screen py-20 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-[#38bdf8] text-xs font-bold tracking-wider uppercase pointer-events-auto cursor-default shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-8 transition">
              <Rocket className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>VTU-VRIF Innovation Hub • Venture Acceleration</span>
            </div>

            {/* Huge 3D Styled Title Overlay matching reference */}
            <div className="space-y-3 pointer-events-auto cursor-default max-w-5xl">
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_35px_rgba(0,0,0,0.9)] select-none leading-none">
                HARDWARE
              </h1>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] select-none">
                ENTREPRENEURSHIP
              </h2>
            </div>

            {/* Subtitle & Mission Statement */}
            <p className="mt-8 text-base sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] pointer-events-auto">
              Accelerating India&apos;s next deep-tech hardware startups and academic spin-offs with <span className="font-bold text-white">₹50L+ non-dilutive grants</span>, zero-capex lab bays, and institutional enterprise off-take inside the <span className="text-[#38bdf8] font-semibold">VTU-VRIF Center</span>.
            </p>

            {/* Interactive CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm shadow-[0_0_30px_rgba(0,113,227,0.5)] transition duration-300 inline-flex items-center gap-2.5 cursor-pointer active:scale-95 group"
              >
                <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Pitch Your Venture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#venture-tracks"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white font-semibold text-sm transition duration-300 inline-flex items-center gap-2 shadow-lg"
              >
                <span>Explore Founder Tracks</span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </a>
            </div>

            {/* High-Contrast Interactive Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 w-full max-w-4xl pointer-events-auto">
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#38bdf8]">₹50L+</div>
                <div className="text-xs font-semibold text-white/70 mt-0.5">Non-Dilutive Grants</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#34d399]">0%</div>
                <div className="text-xs font-semibold text-white/70 mt-0.5">Founder Equity Taken</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#a855f7]">100%</div>
                <div className="text-xs font-semibold text-white/70 mt-0.5">Founder IP Retained</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">50+</div>
                <div className="text-xs font-semibold text-white/70 mt-0.5">Startups Mentored</div>
              </div>
            </div>

            {/* 3D Tubes Interactive Hint (matching the reference UI) */}
            <div className="mt-10 flex flex-col items-center gap-2 text-white/60 animate-pulse pointer-events-none">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                <MousePointer2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Move cursor to trace 3D tubes • Click anywhere to randomize colors</span>
              </div>
            </div>

          </div>
        </TubesBackground>
      </section>

      {/* 2. THE HARDWARE FOUNDER DILEMMA & OUR ACCELERATION ENGINE */}
      <section className="py-24 relative bg-[#0c0c12] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              The Hardware Founder Dilemma
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Bridging the Hardware Valley of Death
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed font-normal">
              Software startups build code in days; hardware startups face brutal capital barriers: multi-million rupee test equipment, manufacturing minimums, tough regulatory approvals, and protracted enterprise sales cycles. We systematically eliminate every bottleneck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENTREPRENEUR_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#0071e3]/60 transition-all duration-300 flex flex-col justify-between group hover:bg-white/[0.05]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#38bdf8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FOUR SPECIALIZED VENTURE TRACKS */}
      <section id="venture-tracks" className="py-24 bg-[#07070a] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#34d399]">
              Cohort Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Tailored Entrepreneurship Pathways
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed font-normal">
              Whether you are an engineering student with a capstone prototype or an incorporated startup ready for utility pilot off-take, we have a specialized venture track designed for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VENTURE_TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#34d399] border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                        {track.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-[#0071e3] transition">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">{track.title}</h3>
                    <div className="text-xs font-semibold text-[#34d399] mt-1">{track.tagline}</div>

                    <p className="mt-4 text-sm text-gray-400 leading-relaxed font-normal">
                      {track.desc}
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Key Founder Benefits
                      </div>
                      {track.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(track.title)}
                      className="w-full py-3.5 rounded-full bg-white/10 hover:bg-[#0071e3] text-white font-semibold text-xs border border-white/15 hover:border-transparent transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>{track.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE 4-STAGE VENTURE ROADMAP */}
      <section className="py-24 bg-[#0c0c12] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7]">
              Structured Growth Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              The 4-Stage Hardware Venture Lifecycle
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed font-normal">
              A milestone-driven journey that transforms academic and lab prototypes into commercially viable, grant-funded, and venture-scalable companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTURE_ROADMAP.map((stage) => (
              <div
                key={stage.step}
                className="p-7 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-black text-[#a855f7] tracking-tighter">
                      {stage.step}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{stage.title}</h3>
                  <div className="text-[11px] font-medium text-[#34d399] mt-0.5">{stage.phase}</div>
                  <div className="text-xs font-medium text-gray-300 mt-2 italic">{stage.focus}</div>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    {stage.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[11px] text-gray-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] flex-shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAPITAL & GRANT ECOSYSTEM */}
      <section className="py-24 bg-[#07070a] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#34d399]">
              Non-Dilutive Capital Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Fueling Hardware Innovation with Government Grants
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed font-normal">
              We help founders secure non-dilutive grants from central and state government programs to build prototypes and scale without premature equity dilution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GRANT_SCHEMES.map((scheme) => (
              <div
                key={scheme.name}
                className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#34d399]">{scheme.amount}</span>
                  <span className="text-[11px] font-bold text-[#38bdf8] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    {scheme.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{scheme.name}</h3>
                  <div className="text-xs font-medium text-gray-400 mt-0.5">{scheme.authority}</div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {scheme.purpose}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs font-medium text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                  <span>{scheme.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Angel Syndicate Box */}
          <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/30 to-blue-950/30 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-[#a855f7] border border-purple-500/20 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" /> Investor Demo Day
              </div>
              <h3 className="text-xl font-bold text-white">
                Institutional Deep-Tech Angel Syndicate & VC Pitch Days
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Startups that validate commercial prototypes present directly to active deep-tech venture capitalists, institutional clean-tech angel networks, and family offices seeking high-defensibility physical tech investments.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenModal("Investor Demo Day")}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-[#07070a] font-bold text-xs transition cursor-pointer whitespace-nowrap shadow-xl"
            >
              Request Pitch Review
            </button>
          </div>
        </div>
      </section>

      {/* 6. TARGET DOMAINS & VERTICALS */}
      <section className="py-24 bg-[#0c0c12] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              Investment & Acceleration Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Priority Deep-Tech Sectors We Back
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed font-normal">
              We focus on hardware engineering sectors where indigenous innovation creates high-barrier intellectual property, critical infrastructure defensibility, and sovereign manufacturing moats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_VERTICALS.map((track) => {
              const Icon = track.icon;
              return (
                <div key={track.title} className="p-7 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-blue-500/40 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#34d399] border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                      {track.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white">{track.title}</h4>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed font-normal">{track.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC SYNERGY & TECH TRANSFER */}
      <section className="py-24 bg-[#07070a] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34d399]">
                University Innovation Synergy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                From University Thesis to Market Commercialization
              </h2>
              <p className="text-base text-gray-400 leading-relaxed font-normal">
                Are you an engineering faculty researcher, post-doctoral scholar, or student team with a breakthrough patent or prototype in power electronics, silicon controllers, or electric mobility?
              </p>
              <p className="text-base text-gray-400 leading-relaxed font-normal">
                SMPS Tech Lab and the VTU-VRIF-TCOE Center provide structured venture incubation, corporate spin-off frameworks, seed grant backing, and OEM commercialization agreements to take your academic invention into volume production.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                  <span>Joint patent prosecution and clear commercial licensing agreements</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                  <span>Corporate venture matchmaking with industrial off-takers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] flex-shrink-0" />
                  <span>Full access to VTU testing labs, 1500V load bays, and environmental chambers</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact?inquiry=tech-transfer"
                  className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_0_20px_rgba(0,113,227,0.4)] transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Discuss Academic Tech Transfer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#38bdf8] border border-blue-500/20 text-xs font-semibold">
                  <Scale className="w-4 h-4" /> 100% Founder-Friendly Model
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Why Choose SMPS Tech Lab as Your Launchpad?
                </h3>
                <div className="space-y-4 text-xs text-gray-400 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="font-bold text-white block mb-1">0% Founder Equity Warrants</span>
                    We do not take equity from early-stage founders. You retain full control of your cap table.
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="font-bold text-white block mb-1">Authoritative VTU Certification</span>
                    Startups operating in our ecosystem receive institutional backing from Visvesvaraya Technological University.
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="font-bold text-white block mb-1">Active Hardware Supply Chain</span>
                    Direct procurement access to GaN/SiC semiconductors, rapid PCB fab, and high-precision testing gear.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTREPRENEUR & VENTURE FAQS */}
      <section className="py-24 bg-[#0c0c12] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              Founder Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Entrepreneurship & Venture FAQs
            </h2>
            <p className="text-base text-gray-400 mt-2">
              Straightforward answers on non-dilutive equity terms, government seed grants, IP ownership, and cohort eligibility.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {ENTREPRENEUR_FAQS.map((faq) => (
              <details
                key={faq.id}
                className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 transition duration-200"
              >
                <summary className="font-bold text-sm sm:text-base text-white cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-[#38bdf8] transition-transform duration-200 group-open:rotate-45 text-xl font-light">
                    +
                  </span>
                </summary>
                <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed font-normal pt-4 border-t border-white/10">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM IMMERSIVE CTA BANNER */}
      <section className="py-24 bg-[#07070a] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Applications Open for Cohort 2026</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white">
            Ready to Build India&apos;s Next Deep-Tech Hardware Venture?
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop waiting for expensive test gear and angel capital. Pitch your hardware venture today and access zero-capex lab bays, government grants, and veteran mentorship.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenModal()}
              className="px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm shadow-[0_0_30px_rgba(0,113,227,0.5)] transition inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>Apply for Incubation Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition"
            >
              Contact Venture Office
            </Link>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE PITCH APPLICATION MODAL */}
      {isPitchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0f0f15] border border-white/15 rounded-[32px] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-white">
            <button
              onClick={() => setIsPitchModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {pitchSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#34d399] flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Venture Application Received!
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your venture application. Our Technical & Venture Committee will review your architecture and contact you within 48 business hours to schedule a facility walkthrough and technical interview.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#34d399]">
                  100% Non-Dilutive • Strict Mutual NDA Protected
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#38bdf8] flex items-center justify-center">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    Deep-Tech Venture Intake
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Pitch to SMPS Tech Lab & VTU-VRIF
                </h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">
                  Apply for non-dilutive grant acceleration, zero-capex workbench access, and institutional off-take.
                </p>

                <form onSubmit={handlePitchSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Founder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pitchForm.founderName}
                        onChange={(e) => setPitchForm({ ...pitchForm, founderName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Startup / Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pitchForm.startupName}
                        onChange={(e) => setPitchForm({ ...pitchForm, startupName: e.target.value })}
                        placeholder="e.g. VoltFlow Systems"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={pitchForm.email}
                        onChange={(e) => setPitchForm({ ...pitchForm, email: e.target.value })}
                        placeholder="founder@venture.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={pitchForm.phone}
                        onChange={(e) => setPitchForm({ ...pitchForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Target Venture Track
                      </label>
                      <select
                        value={pitchForm.track}
                        onChange={(e) => setPitchForm({ ...pitchForm, track: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161620] border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white"
                      >
                        <option value="Student Founder Fellowship">Student Founder Fellowship</option>
                        <option value="Deep-Tech Hardware Accelerator">Deep-Tech Hardware Accelerator</option>
                        <option value="Faculty Research & Technology Spin-Offs">Faculty Research & Spin-Offs</option>
                        <option value="Women in Deep-Tech & Hardware">Women in Deep-Tech & Hardware</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Current Venture Stage
                      </label>
                      <select
                        value={pitchForm.stage}
                        onChange={(e) => setPitchForm({ ...pitchForm, stage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161620] border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white"
                      >
                        <option value="ideation">Ideation / Campus Capstone</option>
                        <option value="prototype">Working Alpha Prototype Built</option>
                        <option value="testing">Seeking Compliance & DFM Scale</option>
                        <option value="revenue">Pilot Deployments / Early Revenue</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Primary Hardware Domain
                      </label>
                      <select
                        value={pitchForm.domain}
                        onChange={(e) => setPitchForm({ ...pitchForm, domain: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161620] border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white"
                      >
                        <option value="Power Electronics & Energy Storage">Power Electronics & BESS</option>
                        <option value="EV Powertrains & Fast Chargers">EV Powertrains & Fast Chargers</option>
                        <option value="Semiconductors & DSP Silicon">Semiconductors & DSP Silicon</option>
                        <option value="Industrial IoT & Telemetry">Industrial IoT & Telemetry</option>
                        <option value="Defence & Rugged Electronics">Defence & Rugged Electronics</option>
                        <option value="Robotics & Motor Control">Robotics & Precision Motors</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Current Capital Status
                      </label>
                      <select
                        value={pitchForm.fundingStatus}
                        onChange={(e) => setPitchForm({ ...pitchForm, fundingStatus: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161620] border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white"
                      >
                        <option value="bootstrapped">Bootstrapped / Self-Funded</option>
                        <option value="seeking-grants">Seeking Non-Dilutive Grants (DST/MeitY)</option>
                        <option value="angel-funded">Angel / Friends & Family Funded</option>
                        <option value="institutional">Institutional Seed Round</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Pitch Deck / Executive Summary URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={pitchForm.pitchDeckUrl}
                      onChange={(e) => setPitchForm({ ...pitchForm, pitchDeckUrl: e.target.value })}
                      placeholder="https://drive.google.com/... or Notion link"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium focus:border-[#0071e3] outline-none text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Brief Description of What You Are Building & Lab Needs *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={pitchForm.ventureDescription}
                      onChange={(e) => setPitchForm({ ...pitchForm, ventureDescription: e.target.value })}
                      placeholder="Tell us what physical hardware product you are building, your target market, and what specific help you need (grants, testing, DFM, pilot customers)."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-normal focus:border-[#0071e3] outline-none text-white placeholder-gray-500 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs shadow-[0_0_20px_rgba(0,113,227,0.4)] transition cursor-pointer active:scale-98"
                    >
                      Submit Venture Application
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5">
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
