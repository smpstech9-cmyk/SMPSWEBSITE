import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Cpu,
  Rocket,
  BatteryCharging,
  Award,
  Target,
  Eye,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "About SMPS Tech Lab | Power Electronics R&D, Innovation & Incubation",
  description:
    "Learn about SMPS Electric Control Pvt Ltd and our R&D facility inside the VTU-VRIF-TCOE building, Bengaluru. Leading innovation in clean energy, power electronics, and hardware incubation.",
};

export default function AboutPage() {
  const coreDivisions = [
    {
      title: "R&D & Systems Engineering",
      desc: "Architecting grid-scale PURNA BESS™ battery storage systems, 1500V bidirectional PCS inverters, and high-speed DC fast EV charging stations with peak efficiencies exceeding 96.5%.",
      icon: BatteryCharging,
      link: "/rnd",
      cta: "Explore R&D Programs",
    },
    {
      title: "Proprietary Silicon & Patents",
      desc: "Designing indigenous digital signal controllers like SaralaChip™ CCU with 2.5µs hardware fault isolation and proprietary active thermal management patents.",
      icon: Cpu,
      link: "/rnd#ccu",
      cta: "Discover Silicon IP",
    },
    {
      title: "Hardware Startup Incubation",
      desc: "Accelerating early-stage clean-tech hardware founders with laboratory access, DFM production engineering, ARAI/BIS compliance advisory, and investor introductions.",
      icon: Rocket,
      link: "/incubation",
      cta: "Venture Incubation",
    },
    {
      title: "VTU Talent Pipeline",
      desc: "Cultivating elite engineers through immersive, hands-on internships inside real testing bays, working on actual high-voltage battery modules, gate drivers, and motor controllers.",
      icon: Award,
      link: "/internships",
      cta: "View Internships",
    },
  ];

  const milestones = [
    {
      year: "VTU-VRIF-TCOE",
      title: "State R&D Center Established",
      desc: "Established advanced power electronics lab inside the Visvesvaraya Technological University Research & Innovation Foundation campus in Bengaluru.",
    },
    {
      year: "PURNA BESS™",
      title: "Grid Energy Storage Launch",
      desc: "Engineered modular containerized 50kWh to 2MWh battery energy storage systems for commercial and microgrid deployment.",
    },
    {
      year: "SaralaChip™",
      title: "Indigenous CCU Controller",
      desc: "Unveiled original DSP-grade power electronics microcontroller featuring dual high-speed CAN-FD and ultra-fast hardware fault protection.",
    },
    {
      year: "SWARNALI™",
      title: "High-Speed DC Fast EV Chargers",
      desc: "Commercialized 60kW to 240kW dual-gun EV charging stations with dynamic power allocation and OCPP 2.0.1 smart integration.",
    },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs text-[#6e6e73] font-medium mb-2">
            <Link href="/" className="hover:text-[#0071e3]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1d1d1f]">About SMPS Tech Lab</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            VTU-VRIF-TCOE Facility, Bengaluru
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
            Pioneering Clean Power, Hardware Innovation & Deep-Tech Ventures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal">
            <span className="font-semibold text-[#1d1d1f]">SMPS Electric Control Pvt Ltd</span> operates an enterprise-grade research, product development, and hardware incubation facility located inside the prestigious <span className="font-semibold text-[#1d1d1f]">VTU-VRIF-TCOE Building</span> in Bengaluru. We bridge the gap between academic breakthrough and mass-manufactured hardware deployment.
          </p>
        </div>

        {/* Facility Showcase Banner */}
        <div className="relative rounded-[32px] overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] p-8 sm:p-12 mb-16 shadow-sm">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Telecom Center of Excellence Campus
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f]">
              SMPS Tech Lab at VTU
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6e6e73] leading-relaxed font-normal">
              Equipped with Chroma regenerative grid simulators, high-frequency oscilloscopes, -40°C to +85°C thermal cycling chambers, and lithium battery impedance cyclers. We engineer industrial BESS, proprietary silicon, and high-power EV charging infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/rnd"
                className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition shadow-sm inline-flex items-center gap-1.5"
              >
                Inspect R&D Test Benches
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/incubation"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition shadow-sm"
              >
                Hardware Startup Incubation
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Divisions */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
              Institutional Scope
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] mt-1">
              Four Interlocking Divisions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreDivisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.title}
                  className="apple-card p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0071e3] border border-blue-100 flex items-center justify-center mb-5 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-[#1d1d1f]">
                      {div.title}
                    </h4>
                    <p className="mt-2.5 text-xs text-[#6e6e73] leading-relaxed font-normal">
                      {div.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <Link
                      href={div.link}
                      className="text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] inline-flex items-center gap-1"
                    >
                      {div.cta} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones / Innovations */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
              Engineering Heritage
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] mt-1">
              Major Innovations & Flagship Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="apple-card p-6 bg-[#fbfbfd]"
              >
                <div className="text-xs font-mono font-bold text-[#0071e3] mb-2">
                  {m.year}
                </div>
                <h4 className="text-base font-bold text-[#1d1d1f] mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & National Recognition */}
        <div className="mb-20 p-8 sm:p-12 rounded-[32px] bg-[#f5f5f7] border border-[#e5e5ea]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Recognition & Accreditations
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mt-1">
              Validated by State & National Bodies
            </h3>
            <p className="text-sm text-[#6e6e73] mt-2 font-normal">
              Recognized for contributions toward indigenizing high-power electronics and fostering clean-energy hardware startups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm flex items-center gap-5">
              <div className="h-16 w-16 relative flex-shrink-0 bg-white rounded-xl p-2 flex items-center justify-center border border-gray-100 shadow-sm">
                <img src="/logos/awards/aw%201.png" alt="Award 1" className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1d1d1f]">Innovation in Clean Energy Storage</h4>
                <p className="text-xs text-[#6e6e73] mt-1 font-normal">Honored for modular BESS architecture and sub-cycle microgrid control integration.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm flex items-center gap-5">
              <div className="h-16 w-16 relative flex-shrink-0 bg-white rounded-xl p-2 flex items-center justify-center border border-gray-100 shadow-sm">
                <img src="/logos/awards/aw%202.png" alt="Award 2" className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1d1d1f]">VTU Industry-Academia Excellence</h4>
                <p className="text-xs text-[#6e6e73] mt-1 font-normal">Operating benchmark hardware research laboratories within the VTU-VRIF center.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="apple-card p-8 bg-[#fbfbfd]">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f]">
              Our Mission
            </h3>
            <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
              To architect reliable, high-efficiency power electronics and energy storage solutions while fostering a self-sustaining ecosystem of deep-tech hardware startups, university patent commercialization, and elite engineering talent in India.
            </p>
          </div>

          <div className="apple-card p-8 bg-[#fbfbfd]">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0071e3] border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f]">
              Our Vision
            </h3>
            <p className="mt-3 text-sm text-[#6e6e73] leading-relaxed font-normal">
              To establish India as a global leader in high-power semiconductor controllers, clean-tech energy storage, and sovereign hardware manufacturing through cutting-edge R&D and world-class laboratory incubation.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-[#0071e3] via-[#0056b3] to-[#1e3a8a] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_45px_rgba(0,113,227,0.25)]">
          <div>
            <h3 className="text-2xl font-bold text-white">Partner with SMPS Tech Lab</h3>
            <p className="mt-1 text-sm text-blue-100 font-normal">Discuss custom R&D, startup incubation, or visit our facility at VTU-VRIF-TCOE.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact?inquiry=rnd"
              className="px-6 py-3 rounded-full bg-white text-[#0071e3] font-semibold text-sm hover:bg-blue-50 transition shadow-sm whitespace-nowrap"
            >
              Contact Leadership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
