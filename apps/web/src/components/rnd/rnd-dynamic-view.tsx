"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cpu,
  Zap,
  BatteryCharging,
  Gauge,
  ArrowRight,
  Flame,
  Building2,
  Activity,
  Radio,
  Sliders,
  CircuitBoard,
  BookOpen,
  Award,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Atom,
  CheckCircle2,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

export function RndDynamicView() {
  const { content } = useSiteContent();
  const { rnd } = content;

  const domainPillars = [
    {
      id: "domain-rnd",
      name: "R&D & DeepTech Systems",
      badge: "Core Science",
      icon: Zap,
      desc: "Translational research converting fundamental physics, wide-bandgap SiC/GaN switching models, and advanced finite-element multi-physics into scalable hardware.",
      topics: ["High-Frequency Planar Magnetics", "Electro-Thermal Transient Analysis", "Thermal Runaway Containment"],
      labCapability: "1500V DC Regenerative Bay",
    },
    {
      id: "domain-embedded",
      name: "Embedded Systems & DSP Firmware",
      badge: "Micro-Architectures",
      icon: Cpu,
      desc: "Deterministic firmware pipelines with sub-microsecond interrupt response times, space-vector PWM modulation, and functional safety compliance (ISO 26262 ASIL-D).",
      topics: ["Hardware-in-the-Loop (HIL) Emulation", "CAN-FD / Modbus Protocols", "DSP Math Accelerators"],
      labCapability: "SaralaChip™ Bring-Up Bay",
    },
    {
      id: "domain-vlsi",
      name: "VLSI & Digital ASIC / FPGA Design",
      badge: "Silicon Engineering",
      icon: Layers,
      desc: "RTL design, static timing analysis (STA), and FPGA-based emulation for next-generation power controller application-specific integrated circuits.",
      topics: ["Verilog/SystemVerilog Synthesis", "Gate-Level Simulation & DFT", "Xilinx UltraScale Prototyping"],
      labCapability: "VLSI Design & Emulation Bay",
    },
    {
      id: "domain-defence",
      name: "Defence Technology & Rugged Systems",
      badge: "Strategic Defence",
      icon: ShieldCheck,
      desc: "Ruggedized high-altitude power conversion modules, MIL-STD-810G vibration-tolerant packaging, and military-grade EMI/EMC compliance.",
      topics: ["MIL-STD-461G Conducted Emissions", "Wide Temp Range (-40°C to +85°C)", "High-G Shock Isolation Enclosures"],
      labCapability: "Environmental Stress Chamber",
    },
    {
      id: "domain-telecom",
      name: "Telecom (5G & 6G Infrastructure)",
      badge: "Telecommunications",
      icon: Radio,
      desc: "High-power-density 48V telecom rectifiers, remote SNMP/MQTT micro-substation telemetry, and distributed DC microgrids powering 5G small cells and future 6G base stations.",
      topics: ["98%+ Peak Rectifier Efficiency", "Sub-Station Energy Routers", "Multi-Phase Dynamic Load Balancing"],
      labCapability: "Telecom Power Testing Bay",
    },
    {
      id: "domain-quantum",
      name: "Quantum Technology & Cryogenics",
      badge: "Next Frontier",
      icon: Atom,
      desc: "Ultra-low-noise solid-state power topologies, cryogenic control interfaces, and sub-nanovolt voltage references for quantum sensors and computing peripherals.",
      topics: ["Sub-ppm Precision References", "Cryogenic Driver Interfaces", "Low-Noise Shielded Loops"],
      labCapability: "Precision Instrumentation Lab",
    },
    {
      id: "domain-industry5",
      name: "Industry 5.0 & Human-Centric Tech",
      badge: "Automation 5.0",
      icon: Activity,
      desc: "Collaborative robotics (Cobot) actuator drive systems, edge AI power anomaly detection, circular second-life battery diagnostics, and resilient microgrids.",
      topics: ["Cobot High-Torque Inverters", "Second-Life Battery Profiling", "Edge Sensor Fusion Algorithms"],
      labCapability: "Robotics & Smart Factory Bay",
    },
    {
      id: "domain-storage",
      name: "Commercial Energy Storage (BESS)",
      badge: "Clean Energy",
      icon: BatteryCharging,
      desc: "Utility-scale containerized 1500V LFP energy storage architectures featuring multi-tier liquid cooling, distributed BMS balancing, and cloud battery telemetry.",
      topics: ["PURNA BESS™ 100kWh Clusters", "Active Thermal Loop Management", "Sub-Millisecond Grid Peaking"],
      labCapability: "High-Voltage Battery Chamber",
    },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden border-b border-black/[0.06]">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#0071e3] text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              VTU-VRIF-TCOE Research & Development Facility
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
              {rnd.headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal">
              {rnd.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact?inquiry=rnd"
                className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition inline-flex items-center gap-2"
              >
                Initiate R&D Collaboration
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/store"
                className="px-7 py-3.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold text-sm border border-[#e5e5ea] transition"
              >
                View Commercial Hardware
              </Link>
            </div>

            {/* Impact Metric Chips */}
            <div className="mt-10 flex flex-wrap items-center gap-4 pt-6 border-t border-black/[0.06]">
              <div className="p-3.5 px-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
                <div className="text-xl font-black text-[#1d1d1f]">{rnd.patentsCount}</div>
                <div className="text-[11px] text-[#6e6e73] font-medium">Intellectual Property</div>
              </div>
              <div className="p-3.5 px-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
                <div className="text-xl font-black text-emerald-600">{rnd.grantsAmount}</div>
                <div className="text-[11px] text-[#6e6e73] font-medium">Research Investment</div>
              </div>
              <div className="p-3.5 px-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
                <div className="text-xl font-black text-[#0071e3]">1500V DC</div>
                <div className="text-[11px] text-[#6e6e73] font-medium">High-Bay Test Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAMPUS RESEARCH BAYS */}
      <section className="py-24 relative bg-[#fbfbfd] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0071e3]">
              Laboratory Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] mt-2 tracking-tight">
              Operational Research Bays & Testbenches
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              Physical engineering test bays equipped for full power characterization and wide-bandgap testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rnd.bays.map((bay) => (
              <div
                key={bay.id}
                className="apple-card p-8 rounded-[28px] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>{bay.focusArea}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1d1d1f]">{bay.name}</h3>
                  <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                    {bay.description}
                  </p>

                  <div className="pt-3 border-t border-black/[0.06]">
                    <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block mb-2">
                      Key Instrumentation
                    </span>
                    <ul className="space-y-1.5">
                      {bay.equipment.map((eq, i) => (
                        <li key={i} className="text-xs text-[#1d1d1f] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] text-xs text-[#6e6e73]">
                  <span className="font-semibold text-[#1d1d1f]">Lead Investigator:</span> {bay.leadInvestigator}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC DEEP-TECH DOMAINS (VLSI, DEFENCE, TELECOM 5G/6G, QUANTUM, INDUSTRY 5.0) */}
      <section className="py-24 relative bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-3">
              <CircuitBoard className="w-3.5 h-3.5" />
              Strategic Technology Disciplines
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
              Domain-Specific R&D Capabilities
            </h2>
            <p className="text-base text-[#6e6e73] mt-3 leading-relaxed font-normal">
              Specialized research programs driving self-reliance in semiconductors, strategic defense power, cellular networks, and energy storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainPillars.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className="apple-card p-6 flex flex-col justify-between hover:border-[#0071e3]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded">
                        {domain.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1d1d1f]">
                      {domain.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
                      {domain.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-black/[0.04]">
                      <span className="text-[10px] font-bold uppercase text-[#86868b] tracking-wider block mb-2">
                        Active Investigations
                      </span>
                      <ul className="space-y-1">
                        {domain.topics.map((topic, idx) => (
                          <li key={idx} className="text-[11px] text-[#1d1d1f] flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#0071e3] flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/[0.05] text-[10px] font-mono text-[#059669] font-semibold">
                    ✓ {domain.labCapability}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RESEARCH PUBLICATIONS & PAPERS */}
      <section className="py-24 relative bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0071e3]">
                Academic Contributions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-2 tracking-tight">
                Peer-Reviewed Publications & Whitepapers
              </h2>
              <p className="text-sm text-[#6e6e73] mt-2 max-w-2xl font-normal leading-relaxed">
                Authored by SMPS Tech Lab researchers in collaboration with VTU faculty.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {rnd.publications.map((pub) => (
              <div
                key={pub.id}
                className="apple-card p-6 sm:p-7 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-3xl">
                  <span className="text-[10px] font-mono font-bold text-[#0071e3] uppercase">
                    {pub.venue} • {pub.year}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#1d1d1f]">{pub.title}</h4>
                  <p className="text-xs text-[#6e6e73]">{pub.authors}</p>
                </div>

                {pub.doiOrUrl && (
                  <a
                    href={pub.doiOrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-full bg-white hover:bg-gray-50 text-xs font-semibold text-[#0071e3] border border-[#e5e5ea] transition inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
