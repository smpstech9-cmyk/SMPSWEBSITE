import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Zap,
  BatteryCharging,
  Radio,
  Cpu,
  Layers,
  Brain,
  Atom,
  ShieldCheck,
  Activity,
  Rocket,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Building2,
  Sliders,
} from "lucide-react";

interface DomainDetail {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  labBay: string;
  specifications: string[];
  capabilities: { title: string; desc: string }[];
  equipment: string[];
}

const DOMAINS_DATA: Record<string, DomainDetail> = {
  "power-electronics": {
    slug: "power-electronics",
    badge: "Wide-Bandgap Systems",
    title: "Power Electronics & Wide-Bandgap Systems",
    tagline: "Ultra-High Frequency Silicon Carbide (SiC) & Gallium Nitride (GaN) Power Topologies",
    description:
      "Our Power Electronics laboratory conducts cutting-edge research in high-frequency, ultra-compact planar magnetics, soft-switching resonant DC-DC converters, and multi-megawatt bidirectional regenerative power conversion architectures.",
    iconName: "Zap",
    labBay: "1500V DC Regenerative Grid Simulator Bay",
    specifications: [
      "SiC MOSFET & GaN HEMT high-speed switching (>500 kHz)",
      "Planar magnetics with interleaved PCB winding matrices",
      ">99.1% peak conversion efficiency on 800V/1500V DC buses",
      "Sub-2.5µs ultrafast electronic short-circuit interruption",
    ],
    capabilities: [
      {
        title: "High-Density Resonant Converters",
        desc: "LLC, CLLC, and dual-active-bridge (DAB) topologies delivering >5 kW/L volumetric power density.",
      },
      {
        title: "Planar Magnetics Engineering",
        desc: "Custom matrix transformers with sub-10nH leakage inductance and integrated thermal heat spreaders.",
      },
      {
        title: "Automated Power-Loop Characterization",
        desc: "Real-time double-pulse testing, switching loss extraction, and dv/dt slew rate profiling up to 100 V/ns.",
      },
    ],
    equipment: [
      "Chroma 1500V / 100kW Regenerative DC Power Supply",
      "Tektronix 8-Channel 2GHz High-Voltage Isolation Scope",
      "Keysight Precision Power Analyzer (0.01% basic accuracy)",
      "High-Frequency LCR Meter (up to 120 MHz)",
    ],
  },
  "energy-storage-bess": {
    slug: "energy-storage-bess",
    badge: "Clean Energy Storage",
    title: "Energy Storage Systems (BESS)",
    tagline: "Utility-Scale 1500V Containerized LFP & Sodium-Ion Battery Energy Storage",
    description:
      "Developing containerized utility BESS architectures, liquid-cooled thermal management manifolds, multi-tier BMS protection topologies, and sub-millisecond bidirectional PCS inverters for industrial microgrids.",
    iconName: "BatteryCharging",
    labBay: "High-Capacity Electrochemical BESS Testing Bay",
    specifications: [
      "1500V DC operating architecture with modular rack arrays",
      "Active closed-loop dielectric liquid cooling (±1.5°C cell gradient)",
      "Multi-stage aerosol and Novec 1230 fire suppression integration",
      "CAN-FD & Modbus TCP sub-10ms telemetry reporting",
    ],
    capabilities: [
      {
        title: "Cell-Level Digital Twin",
        desc: "Real-time electrochemical impedance spectroscopy (EIS) state-of-health tracking and thermal runaway early warning.",
      },
      {
        title: "Modular PCS Inverters",
        desc: "Bidirectional power conversion systems scalable from 50 kW to 2 MW with four-quadrant reactive power support.",
      },
      {
        title: "Microgrid Dispatch Algorithms",
        desc: "Autonomous frequency regulation, peak-shaving, and black-start coordination algorithms.",
      },
    ],
    equipment: [
      "Arbin Multi-Channel High-Current Battery Cycler",
      "Weiss Technik Walk-In Environmental Test Chamber (-40°C to +85°C)",
      "Thermal Imaging Radiometric Camera Suite",
      "Grid Simulator 400kVA Four-Quadrant AC Source",
    ],
  },
  "telecom-6g": {
    slug: "telecom-6g",
    badge: "Telecom Infrastructure",
    title: "Telecom (5G & 6G Infrastructure)",
    tagline: "Sub-Station DC Distribution, Next-Gen Rectifiers & Wireless Transmission Bridges",
    description:
      "SMPS Tech Lab's telecom division engineers carrier-grade high-efficiency rectifiers, remote SNMP energy routers, and high-throughput wireless bridges connecting rural and mission-critical 5G/6G nodes.",
    iconName: "Radio",
    labBay: "VTU-TCOE 6G Wireless & Power Bay",
    specifications: [
      "98%+ peak efficiency telecom DC rectifier units",
      "SmartLink-20™ long-range wireless Ethernet bridges (up to 20 km)",
      "Ultra-low conducted EMI compliant with CISPR 22 Class B",
      "Integrated solar hybrid MPPT controllers with automatic battery backup",
    ],
    capabilities: [
      {
        title: "Long-Range Microwave Bridges",
        desc: "High-throughput Wi-Fi 6 OFDM MIMO bridges for remote cell site backhaul without fiber.",
      },
      {
        title: "Intelligent DC Energy Distribution",
        desc: "Automated load shedding, individual branch circuit metering, and remote cellular telemetry.",
      },
      {
        title: "Extreme Environmental Hardening",
        desc: "IP66/IP67 weatherized enclosures with natural convection cooling for desert and tropical climates.",
      },
    ],
    equipment: [
      "Rohde & Schwarz Spectrum Analyzer (up to 44 GHz)",
      "RF Anechoic Pre-Compliance Chamber",
      "High-Power DC Electronic Load Banks",
      "Surge and Lightning Impulse Simulator (10kV/5kA)",
    ],
  },
  "embedded-systems": {
    slug: "embedded-systems",
    badge: "Micro-Architectures",
    title: "Embedded Systems & DSP Firmware",
    tagline: "Deterministic Real-Time Control Loops, Space Vector PWM & Safety-Critical Firmware",
    description:
      "Engineering deterministic sub-microsecond firmware on modern ARM Cortex-M7 and C2000 DSP architectures for mission-critical power conversion, automotive BMS, and industrial automation.",
    iconName: "Cpu",
    labBay: "SaralaChip™ Firmware Bring-Up Bay",
    specifications: [
      "Sub-microsecond interrupt latency and deterministic execution",
      "Space-Vector PWM (SVPWM) and Field-Oriented Control (FOC)",
      "Dual CAN-FD, EtherCAT, and industrial Modbus RTU/TCP support",
      "ISO 26262 ASIL-D functional safety architecture guidelines",
    ],
    capabilities: [
      {
        title: "Hardware-in-the-Loop (HIL) Testing",
        desc: "Automated firmware validation against real-time simulated converters and battery packs.",
      },
      {
        title: "Model-Based Design & Code Gen",
        desc: "Simulink and Embedded Coder toolchains generating certifiable, MISRA-C compliant firmware.",
      },
      {
        title: "Secure Boot & OTA Telemetry",
        desc: "Hardware cryptographic engine support with authenticated firmware updates over CAN-FD and LTE.",
      },
    ],
    equipment: [
      "OPAL-RT Real-Time Digital Simulator (HIL Workbench)",
      "Lauterbach TRACE32 Hardware Debugger / Emulator",
      "Vector CANoe & CANalyzer Interface Suite",
      "High-Speed Mixed-Signal Logic Analyzers (16-channel)",
    ],
  },
  "vlsi-silicon": {
    slug: "vlsi-silicon",
    badge: "Silicon Engineering",
    title: "VLSI & Digital ASIC / FPGA Design",
    tagline: "Custom Silicon Architectures, RTL Synthesis & SaralaChip™ Tapeout Validation",
    description:
      "Architecting indigenous power management ICs, specialized DSP accelerators, and high-speed FPGA gate arrays powering the SaralaChip™ controller family.",
    iconName: "Layers",
    labBay: "VLSI Design & Silicon Verification Bay",
    specifications: [
      "80 nm ASIC digital/analog co-design platform",
      "Custom space-vector accelerator hardware engines",
      "Xilinx UltraScale+ FPGA emulation prototypes",
      "Complete DFT, boundary scan, and static timing analysis",
    ],
    capabilities: [
      {
        title: "RTL Design & Formal Verification",
        desc: "SystemVerilog and UVM testbenches with 100% code and functional coverage.",
      },
      {
        title: "Mixed-Signal Power ICs",
        desc: "Integration of high-speed comparators, bandgap references, and gate drivers on single silicon.",
      },
      {
        title: "FPGA Prototyping Platform",
        desc: "Full-speed pre-silicon emulation for immediate firmware development and corner-case verification.",
      },
    ],
    equipment: [
      "Cadence EDA Enterprise Tool Suite (Virtuoso, Genus, Innovus)",
      "Synopsys Design Compiler & PrimeTime STA Engine",
      "Xilinx UltraScale+ ZCU102 Development Workstations",
      "Micromanipulator Semiconductor Wafer Probing Station",
    ],
  },
  "ai-ml": {
    slug: "ai-ml",
    badge: "Edge AI & Analytics",
    title: "AI / ML & Intelligent Energy",
    tagline: "Edge Neural Networks, Predictive Battery Maintenance & Grid Load Forecasting",
    description:
      "Deploying lightweight deep learning models on embedded edge processors to predict battery degradation, detect micro-arc faults, and optimize industrial energy dispatch.",
    iconName: "Brain",
    labBay: "Intelligent Energy & Edge AI Lab Bay",
    specifications: [
      "Sub-millisecond inference on microcontrollers via TensorFlow Lite",
      "Electrochemical state-of-health estimation using LSTM networks",
      "High-speed arc fault detection utilizing 1D convolutional networks",
      "Physics-informed neural networks (PINN) for thermal prediction",
    ],
    capabilities: [
      {
        title: "Predictive Thermal Runaway Warning",
        desc: "Multi-sensor fusion algorithms detecting anomalous gas and temperature rises minutes before thermal events.",
      },
      {
        title: "Smart Grid Dynamic Dispatch",
        desc: "Reinforcement learning agents balancing renewable generation, battery storage, and dynamic tariffs.",
      },
      {
        title: "Edge Anomaly Detection",
        desc: "Unsupervised autoencoder models continuously monitoring inverter voltage and current harmonics.",
      },
    ],
    equipment: [
      "NVIDIA DGX GPU Compute Cluster for model training",
      "Edge AI Developer Workstations (Jetson Orin, Google Coral)",
      "High-Speed Audio/Acoustic Emission Sensor Suite",
      "Synchronized Grid PMU (Phasor Measurement Unit) Array",
    ],
  },
  "quantum-technologies": {
    slug: "quantum-technologies",
    badge: "Next Frontier",
    title: "Quantum Technologies & Solid-State",
    tagline: "Cryogenic Power Supplies, Sub-Nanovolt References & Quantum Telemetry",
    description:
      "Pioneering research into ultra-low noise power regulation at 4 Kelvin temperatures, precision quantum sensor conditioning, and post-quantum cryptographic telemetry.",
    iconName: "Atom",
    labBay: "Quantum Instrumentation & Cryogenic Bay",
    specifications: [
      "Cryogenic-compatible solid-state power regulation",
      "Sub-nanovolt voltage stability (<0.1 ppm noise floor)",
      "High-isolation magnetic and electrostatic shielding",
      "Post-quantum lattice-based encryption algorithms for grid telemetry",
    ],
    capabilities: [
      {
        title: "Cryogenic DC-DC Conversion",
        desc: "Power electronics stages optimized to operate efficiently inside dilution refrigerators.",
      },
      {
        title: "Ultra-Low Noise Amplifiers",
        desc: "Signal conditioning front-ends for SQUID sensors and diamond nitrogen-vacancy (NV) center magnetometers.",
      },
      {
        title: "Quantum Key Telemetry Links",
        desc: "Security protocols resilient to future quantum computer decryption attacks.",
      },
    ],
    equipment: [
      "Sub-Kelvin Closed-Cycle Cryostat Setup",
      "Keysight High-Resolution Nanovoltmeter & Electrometer",
      "Zero-Gauss Magnetic Shielding Enclosure",
      "Low-Noise SQUID Electronics Controller",
    ],
  },
  "defence-technology": {
    slug: "defence-technology",
    badge: "Strategic Defence",
    title: "Defence & Strategic Technology",
    tagline: "Rugged High-Altitude Power Converters, MIL-STD Packaging & Tactical BESS",
    description:
      "Engineering ruggedized, high-reliability power systems engineered to survive extreme altitude, vibration, wide thermal shocks, and intense electromagnetic interference.",
    iconName: "ShieldCheck",
    labBay: "MIL-STD Environmental & Ruggedization Bay",
    specifications: [
      "MIL-STD-810G vibration, shock, and humidity compliance",
      "MIL-STD-461G EMI/EMC shielding for tactical deployment",
      "Wide operating ambient temperature (-40°C to +75°C)",
      "High-altitude de-rating tolerance up to 18,000 feet AMSL",
    ],
    capabilities: [
      {
        title: "Tactical Mobile Energy Storage",
        desc: "Shock-mounted, weather-sealed field battery packs with rapid solar and generator recharging.",
      },
      {
        title: "High-Reliability Avionics SMPS",
        desc: "Redundant power supplies with instantaneous failover and galvanic isolation (>3000V).",
      },
      {
        title: "Ruggedized Radar Power Modules",
        desc: "High-power pulsed DC supplies delivering clean energy to phased-array transmitters.",
      },
    ],
    equipment: [
      "Electro-Dynamic Vibration & Shock Shaker Table",
      "Altitude Vacuum Test Chamber (simulates up to 60,000 ft)",
      "Thermal Shock Liquid-to-Liquid / Air-to-Air Chamber",
      "Conducted and Radiated EMI Test Receivers",
    ],
  },
  "industry-5-0": {
    slug: "industry-5-0",
    badge: "Industry 5.0",
    title: "Industry 5.0 & Smart Manufacturing",
    tagline: "Cobot Multi-Axis Actuator Drives, Circular Battery Reuse & Digital Twin Workcells",
    description:
      "Blending human ingenuity with intelligent automation: ultra-precise motor drives for collaborative robots, second-life battery grading, and cyber-physical shop-floor systems.",
    iconName: "Activity",
    labBay: "Industrial Robotics & Automation Bay",
    specifications: [
      "High-torque density servo drives with sub-arcminute positioning",
      "Automated second-life battery cell characterization workcell",
      "OPC-UA and MQTT edge industrial IoT gateways",
      "Predictive machinery health monitoring using vibration acoustics",
    ],
    capabilities: [
      {
        title: "Cobot Precision Motor Controllers",
        desc: "Integrated field-oriented controllers with torque sensing and collision avoidance safety stops.",
      },
      {
        title: "Circular Battery Reclamation",
        desc: "High-throughput sorting algorithms classifying spent EV cells for stationary BESS usage.",
      },
      {
        title: "Connected Factory Telemetry",
        desc: "Zero-latency telemetry streaming machine parameters to cloud and on-premise dashboards.",
      },
    ],
    equipment: [
      "6-Axis Industrial Collaborative Robotic Arm Workcell",
      "Multi-Axis High-Speed Dynamometer Testbench",
      "Automated Battery Pack Disassembly & Grading Rig",
      "Industrial PLC & SCADA Simulation Racks",
    ],
  },
  "deeptech-innovation": {
    slug: "deeptech-innovation",
    badge: "DeepTech Foundation",
    title: "R&D & DeepTech Innovation",
    tagline: "Translational Applied Physics, Multi-Physics Simulation & Zero-Capex Prototyping",
    description:
      "The foundational scientific wing of SMPS Tech Lab, translating fundamental electromagnetic theories and thermal physics into patentable industrial hardware platforms.",
    iconName: "Rocket",
    labBay: "Advanced Multi-Physics Simulation & Prototyping Bay",
    specifications: [
      "Finite Element Method (FEM) 3D electromagnetic simulations",
      "Computational Fluid Dynamics (CFD) active thermal loop analysis",
      "Rapid rapid-prototyping PCB milling and reflow in-house",
      "Direct pathway for VTU faculty & student patent incubation",
    ],
    capabilities: [
      {
        title: "Multi-Physics Electro-Thermal Modeling",
        desc: "Coupled simulations predicting hotspots and structural stress before physical fabrication.",
      },
      {
        title: "Rapid Hardware Prototyping",
        desc: "From schematic to operational 4-layer prototype hardware inside 72 hours.",
      },
      {
        title: "IP Creation & Tech Transfer",
        desc: "Dedicated patent drafting, prior art search, and licensing framework for industrial partners.",
      },
    ],
    equipment: [
      "Ansys Maxwell 3D & IcePak Multi-Physics High-Performance Compute Rig",
      "LPKF Precision PCB Prototyping Laser & Mechanical Milling System",
      "Multi-Zone Nitrogen Atmosphere SMD Reflow Oven",
      "Optical 3D Coordinate Measuring Machine (CMM)",
    ],
  },
};

const ICONS_MAP: Record<string, React.ElementType> = {
  Zap,
  BatteryCharging,
  Radio,
  Cpu,
  Layers,
  Brain,
  Atom,
  ShieldCheck,
  Activity,
  Rocket,
};

export function generateStaticParams() {
  return Object.keys(DOMAINS_DATA).map((slug) => ({ slug }));
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = DOMAINS_DATA[slug];

  if (!domain) {
    notFound();
  }

  const Icon = ICONS_MAP[domain.iconName] || Zap;

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Header Breadcrumb & Back Link */}
      <div className="border-b border-black/[0.06] bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#domains"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Strategic Technology Verticals</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-black/[0.06] bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider">
              <Icon className="w-3.5 h-3.5" />
              {domain.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
              {domain.title}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#0071e3]">
              {domain.tagline}
            </p>
            <p className="text-base text-[#6e6e73] font-normal leading-relaxed pt-2">
              {domain.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/partner"
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition inline-flex items-center gap-2"
              >
                <span>Partner on this Domain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/store"
                className="px-6 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition"
              >
                Explore Hardware Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Facilities & Technical Specs */}
      <section className="py-16 sm:py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Lab Bay & Equipment */}
            <div className="lg:col-span-5 space-y-6">
              <div className="apple-card p-6 sm:p-8 space-y-4 bg-[#fbfbfd]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#059669]">
                  <Building2 className="w-4 h-4" />
                  Primary Testing Facility
                </div>
                <h3 className="text-xl font-extrabold text-[#1d1d1f]">
                  {domain.labBay}
                </h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Housed inside the SMPS Tech Lab Engineering Center at VTU Campus, Nagarbhavi, Bengaluru. Fully certified for continuous high-voltage endurance and precision characterization.
                </p>

                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="text-xs font-bold text-[#1d1d1f] mb-3 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#0071e3]" />
                    Key Laboratory Equipment
                  </div>
                  <ul className="space-y-2">
                    {domain.equipment.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#6e6e73] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0071e3]/10 to-transparent border border-blue-100">
                <h4 className="text-sm font-bold text-[#1d1d1f]">
                  Need Custom Research or Prototyping?
                </h4>
                <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed">
                  We collaborate with OEMs, defense contractors, and technology enterprises on exclusive ODM product realization.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0071e3] hover:text-[#0056b3]"
                >
                  Contact Technical Lead <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Capabilities & Specifications */}
            <div className="lg:col-span-7 space-y-8">
              {/* Technical Specifications */}
              <div>
                <h3 className="text-2xl font-black text-[#1d1d1f] tracking-tight mb-4">
                  Engineering Benchmarks & Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domain.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-start gap-3"
                    >
                      <Sparkles className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#1d1d1f] leading-snug">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Capabilities */}
              <div>
                <h3 className="text-2xl font-black text-[#1d1d1f] tracking-tight mb-4">
                  Core Research Programs
                </h3>
                <div className="space-y-4">
                  {domain.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="text-sm font-bold text-[#1d1d1f]">
                        {cap.title}
                      </h4>
                      <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Global CTA Banner */}
      <section className="py-16 bg-[#fbfbfd]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
            Accelerate Your Hardware Innovation
          </h2>
          <p className="text-sm text-[#6e6e73] max-w-xl mx-auto font-normal">
            Engage with our Bengaluru laboratory bays for sponsored R&D, student internships, or procurement of indigenous hardware platforms.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/partner"
              className="px-6 py-3 rounded-full bg-[#0071e3] text-white text-xs font-bold hover:bg-[#0077ed] transition"
            >
              Initiate R&D Collaboration
            </Link>
            <Link
              href="/rnd"
              className="px-6 py-3 rounded-full bg-white text-[#1d1d1f] text-xs font-bold border border-[#e5e5ea] hover:bg-[#f5f5f7] transition"
            >
              View All Laboratory Bays
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

