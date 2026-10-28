import React from "react";
import Link from "next/link";
import {
  Lightbulb,
  Cpu,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileText,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Innovation & Intellectual Property | SMPS Tech Lab",
  description:
    "Explore SMPS patented power topologies, high-frequency magnetic architectures, and green tech innovations co-developed with VTU-VRIF Center of Excellence.",
};

export default function InnovationPage() {
  const patents = [
    {
      id: "PAT-2026-081",
      title: "Resonant Bidirectional DC-DC Converter Topology",
      domain: "Power Electronics",
      status: "GRANTED",
      date: "2025",
      abstract:
        "Zero-voltage zero-current switching architecture achieving 98.4% peak conversion efficiency with integrated planar transformer magnetics for electric mobility.",
    },
    {
      id: "PAT-2025-119",
      title: "Adaptive Electrochemical Impedance Spectroscopy (EIS) for LFP Batteries",
      domain: "Energy Storage",
      status: "GRANTED",
      date: "2025",
      abstract:
        "Real-time state-of-health (SoH) and state-of-charge (SoC) estimation algorithm embedded on silicon without requiring offline laboratory resting cycles.",
    },
    {
      id: "PAT-2026-204",
      title: "Galvanically Isolated High-Frequency Gate Driver with Active Miller Clamping",
      domain: "Semiconductor CCU",
      status: "PUBLISHED",
      date: "2026",
      abstract:
        "Integrated driver IC architecture for GaN & SiC wide-bandgap transistors operating at switching frequencies up to 1.2 MHz under high dV/dt noise margins.",
    },
  ];

  const innovations = [
    {
      title: "Solid-State High Voltage DC Architecture",
      desc: "Replacing mechanical contactors with silicon-carbide bidirectional solid-state switches, reducing fault isolation time from 35ms to under 1.2 microseconds.",
      impact: "Zero mechanical arcing • 10x lifecycle extension",
    },
    {
      title: "Modular PURNA Multi-Chemistry Battery Stacking",
      desc: "Dynamic cell-level balancing allowing parallel connection of retired 2nd-life EV packs with brand new prismatic cells for affordable grid peak-shaving.",
      impact: "Circular economy • 40% lower CAPEX storage",
    },
    {
      title: "SaralaChip™ Real-Time HIL Emulation",
      desc: "Hardware-in-the-loop firmware simulation module capable of testing microgrid control code at 20ns loop intervals directly from student desktop computers.",
      impact: "Rapid prototyping • Accessible hardware education",
    },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden">
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            Engineering Innovation & IP
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
            Pioneering the Future of <br className="hidden sm:inline" />
            <span className="text-[#0071e3]">Clean Power Engineering</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed max-w-2xl">
            From breakthrough wide-bandgap converter topologies to autonomous energy storage algorithms, our R&D facility invents core intellectual property that powers India’s industrial decarbonization.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold shadow-sm transition active:scale-[0.98]"
            >
              Collaborate on Research
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rnd"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] text-[#1d1d1f] text-xs sm:text-sm font-semibold transition shadow-xs"
            >
              Tour Laboratory Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* Patent & Intellectual Property Registry */}
      <section className="py-20 bg-[#fbfbfd] border-y border-[#e5e5ea] px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
              Patented Engineering Assets
            </h2>
            <p className="text-sm text-[#6e6e73] mt-2">
              Our registered and published intellectual properties co-developed under the VTU-VRIF Center of Excellence framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patents.map((pat) => (
              <div
                key={pat.id}
                className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0071e3] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {pat.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> {pat.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1d1d1f] leading-snug">
                    {pat.title}
                  </h3>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    {pat.abstract}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e5e5ea] flex items-center justify-between text-xs text-[#86868b]">
                  <span>Field: {pat.domain}</span>
                  <span className="font-semibold text-[#1d1d1f]">Year: {pat.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Tech Innovation Highlights */}
      <section className="py-20 px-6 sm:px-10 max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Deep-Tech Frontiers Under Active Development
          </h2>
          <p className="text-sm text-[#6e6e73] mt-2">
            Translational research driving domestic manufacturing of commercial energy infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {innovations.map((item, idx) => (
            <div
              key={idx}
              className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white space-y-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">{item.title}</h3>
              <p className="text-xs text-[#6e6e73] leading-relaxed">{item.desc}</p>
              <div className="pt-3 border-t border-[#e5e5ea]">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                  {item.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
