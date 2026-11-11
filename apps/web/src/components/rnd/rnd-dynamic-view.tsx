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

export function RndDynamicView() {
  const permanentRndBays = [
    {
      id: "bay-1",
      name: "High-Voltage Power Electronics Bay",
      focusArea: "Wide-Bandgap Semi",
      description:
        "Characterization of SiC/GaN wide-bandgap topologies up to 1500V DC and bidirectional regenerative power flows.",
      equipment: [
        "High-Voltage DC Power Supplies (1500V/100A)",
        "High-Bandwidth 8-Channel Oscilloscopes",
        "Custom Calorimetric Loss Test Jig",
      ],
      leadInvestigator: "POWER ELECTRONICS R&D TEAM",
    },
    {
      id: "bay-2",
      name: "Grid Simulation & Microgrid Bay",
      focusArea: "Grid Integration",
      description:
        "Emulation of weak grids, microgrid synchronization, and fault-ride-through validation for central inverters.",
      equipment: [
        "Regenerative Grid Simulator (100kVA)",
        "Dynamic Load Banks (R-L-C)",
        "Power Quality Analyzers",
      ],
      leadInvestigator: "POWER ELECTRONICS R&D TEAM",
    },
    {
      id: "bay-3",
      name: "Advanced Battery Testing & Characterization Bay",
      focusArea: "Energy Storage",
      description:
        "Electrochemical impedance spectroscopy, cell thermal runaway testing, and multi-chemistry cycle life characterization.",
      equipment: [
        "Multi-Channel Battery Cycler (5V/60A)",
        "Environmental Thermal Chambers",
        "Electrochemical Impedance Analyzer",
      ],
      leadInvestigator: "POWER ELECTRONICS R&D TEAM",
    },
    {
      id: "bay-env-rel",
      name: "Environmental & Reliability Bay",
      focusArea: "Ruggedisation & Reliability",
      description:
        "Thermal, environmental and EMI pre-compliance validation of power and telecom hardware for demanding field and defence conditions.",
      equipment: [
        "Environmental Stress Chamber",
        "EMI/EMC Pre-Compliance Setup",
        "Thermal Imaging & Data Logging",
      ],
      leadInvestigator: "Reliability & Compliance Team",
    },
    {
      id: "bay-renew-int",
      name: "Renewable Integration & Industrial Energy Bay",
      focusArea: "Oil & Gas • Renewable Energy",
      description:
        "Validation of solar-hybrid, microgrid and DC power systems for renewable plants and for oil and gas facilities, from remote wellhead and pipeline installations to process plants.",
      equipment: [
        "Programmable PV Array Simulator",
        "DC Power Analyser",
        "Hybrid Microgrid Test Rig",
      ],
      leadInvestigator: "Renewable & Industrial Energy R&D Team",
    },
    {
      id: "bay-renew-ind",
      name: "Renewable & Industrial Energy Systems",
      focusArea: "Clean Energy • Industrial",
      description:
        "Solar-hybrid, microgrid and DC power architectures for renewable plants and oil and gas facilities, engineered for reliability in remote and demanding environments.",
      equipment: [
        "Solar-Hybrid Microgrids",
        "Remote-Site DC Power Systems",
        "Mobile Microgrid Solutions",
      ],
      leadInvestigator: "Renewable & Industrial Energy R&D Team",
    },
    {
      id: "bay-embedded-sarala",
      name: "Embedded Control & SARALA CHIP Bring-Up Bay",
      focusArea: "Embedded & Silicon",
      description:
        "Silicon validation, firmware development, hardware-in-the-loop (HIL) testing, and control loop characterization for SARALA CHIP and embedded power controllers.",
      equipment: [
        "Real-time HIL Simulator",
        "Digital Storage Oscilloscopes & Logic Analyzers",
        "Automated Silicon Bring-Up & Test Fixture",
      ],
      leadInvestigator: "Embedded Systems R&D Team",
    },
    {
      id: "bay-telecom-rf",
      name: "5G/6G RF & Telecom Bay",
      focusArea: "Telecom & 6G Hub",
      description:
        "RF characterisation, high-frequency signal integrity, conducted and radiated pre-compliance, and telecom DC power distribution testing for 5G/6G infrastructure.",
      equipment: [
        "Vector Network Analyser (up to 20 GHz)",
        "Spectrum Analyser & Near-Field Probes",
        "Telecom DC Power System Test Rack",
      ],
      leadInvestigator: "Telecom & RF Infrastructure Team",
    },
    {
      id: "bay-vlsi-emu",
      name: "VLSI Design & Emulation Bay",
      focusArea: "VLSI & ASIC Design",
      description:
        "RTL verification, FPGA-based hardware emulation, gate-level timing analysis, and ASIC physical design exploration for domain-specific power management chips.",
      equipment: [
        "High-Capacity FPGA Emulation Platforms",
        "EDA Verification & Synthesis Compute Cluster",
        "Logic & Protocol Analysers",
      ],
      leadInvestigator: "VLSI & Silicon Architecture Team",
    },
  ];

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
              SMPS Tech Lab Advanced R&D Facility
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
              Translating Fundamental Power Physics into Commercial Hardware Platforms
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal">
              Inside our 5,000 sq.ft engineering facility at VTU-VRIF Center, our researchers design, simulate, and stress-test wide-bandgap semiconductors, megawatt BESS, and microcontrollers.
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
              <Link
                href="/ip"
                className="p-3.5 px-5 rounded-2xl bg-[#f5f5f7] hover:bg-blue-50/60 border border-[#e5e5ea] hover:border-[#0071e3]/40 transition group cursor-pointer"
              >
                <div className="text-xl font-black text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                  <span>16+ Provisional & Awarded Patents</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] text-[#6e6e73] font-medium">Intellectual Property & Patents →</div>
              </Link>
              <div className="p-3.5 px-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
                <div className="text-xl font-black text-emerald-600">₹12 Cr+</div>
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

          {/* Mainframe & Computing Infrastructure Showcase */}
          <div className="mb-14 rounded-3xl overflow-hidden border border-[#e5e5ea] bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full bg-[#0a0a0f] overflow-hidden">
              <Image
                src="/images/incubation-facility.jpg"
                alt="SMPS Tech Lab Mainframe Computing & Power Emulator Rack"
                fill
                className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 lg:to-white pointer-events-none" />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-2 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>HIL Mainframe Grid Rack Active</span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" /> High-Performance Mainframe
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                Real-Time Hardware-in-the-Loop Mainframe
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                Equipped with custom FPGA hardware emulators, high-throughput DSP signal processors, and sub-nanosecond transient loggers to stress-test 1500V power electronics and SARALA CHIP controllers.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]">
                  <span className="text-lg font-black text-[#1d1d1f] block">&lt;2.5µs</span>
                  <span className="text-[10px] text-[#6e6e73] font-medium">Fault Isolation Latency</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]">
                  <span className="text-lg font-black text-[#0071e3] block">1500V DC</span>
                  <span className="text-[10px] text-[#6e6e73] font-medium">Continuous Emulation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {permanentRndBays.map((bay) => (
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
                  <span className="font-semibold text-[#1d1d1f]">Lead Investigator:</span>{" "}
                  {bay.leadInvestigator &&
                  !["Er. Shiv Bhalke", "Dr. K. S. Narayanaswamy", "Dr. Pratibha Rao", "Dr. Faculty Lead"].includes(bay.leadInvestigator)
                    ? bay.leadInvestigator
                    : "POWER ELECTRONICS R&D TEAM"}
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
    </div>
  );
}
