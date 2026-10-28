"use client";

import { FAQItem } from "@/components/ui/faq-accordion";

export interface MetricStat {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export interface TechnologyHighlight {
  id: string;
  badge: string;
  title: string;
  description: string;
  specs: string[];
  linkUrl: string;
}

export interface CMS_MilestoneItem {
  id: string;
  year: string;
  quarter: string;
  badge: string;
  title: string;
  desc: string;
  metrics: string;
}

export interface CMS_DomainPillar {
  id: string;
  title: string;
  badge: string;
  desc: string;
  features: string[];
  link: string;
}

export interface CMS_UpcomingProduct {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  stage: string;
  imageUrl: string;
  status: string;
  specs: string[];
  availability: string;
  link: string;
}

export interface HomePageContent {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  stats: MetricStat[];
  technologies: TechnologyHighlight[];
  milestones: CMS_MilestoneItem[];
  domains: CMS_DomainPillar[];
  upcomingProducts: CMS_UpcomingProduct[];
  faqs: FAQItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
}

export interface ResearchBayItem {
  id: string;
  name: string;
  focusArea: string;
  equipment: string[];
  leadInvestigator: string;
  description: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  doiOrUrl: string;
}

export interface RnDPageContent {
  headline: string;
  subheadline: string;
  bays: ResearchBayItem[];
  publications: PublicationItem[];
  patentsCount: string;
  grantsAmount: string;
}

export interface InternshipTrackItem {
  id: string;
  slug: string;
  title: string;
  domain: string;
  duration: string;
  mode: string;
  level: string;
  description: string;
  applyPortalUrl?: string;
  isActive: boolean;
  upcomingBatchDate: string;
  price?: string;
}

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: "labs" | "events" | "ceremonies" | "students";
  date: string;
  location: string;
  imageUrl: string;
  description: string;
}

export interface ExComMemberItem {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  qualifications: string;
  bio: string;
  email: string;
}

export interface CMS_EventItem {
  id: string;
  title: string;
  category: "symposia" | "workshops" | "hackathons" | "past";
  badge: string;
  date: string;
  time: string;
  venue: string;
  speaker: string;
  speakerRole: string;
  description: string;
  agenda: string[];
  capacity: string;
  seatsLeft?: string;
  registrationOpen: boolean;
  featured?: boolean;
}

export interface CMS_JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  badge: string;
  isActive: boolean;
}

export interface CMS_IncubationContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  facilityTitle: string;
  facilityDesc: string;
  founderPerks: string[];
  faqs: FAQItem[];
}

export interface HardwareStoreSettings {
  isOrderingEnabled: boolean;
  showPricing: boolean;
  storeNotice: string;
  storeFaqs: FAQItem[];
  upcomingProducts: CMS_UpcomingProduct[];
}

export interface GlobalSiteSettings {
  announcementBarEnabled: boolean;
  announcementText: string;
  announcementLink: string;
  contactEmail: string;
  contactPhone: string;
  facilityAddress: string;
}

export interface FullSiteContent {
  home: HomePageContent;
  rnd: RnDPageContent;
  internships: InternshipTrackItem[];
  gallery: GalleryMediaItem[];
  excom: ExComMemberItem[];
  events: CMS_EventItem[];
  careers: CMS_JobRole[];
  incubation: CMS_IncubationContent;
  hardware: HardwareStoreSettings;
  global: GlobalSiteSettings;
}

export const INITIAL_SITE_CONTENT: FullSiteContent = {
  home: {
    heroEyebrow: "VTU-VRIF-TCOE Accredited Center • Bengaluru",
    heroTitleLine1: "Pioneering Industrial",
    heroTitleHighlight: "Power Electronics",
    heroTitleLine2: "& Clean Energy Storage",
    heroSubtitle:
      "Advanced R&D testbenches, university-certified student research cohorts, and native high-efficiency power architectures built at the Visvesvaraya Technological University campus.",
    stats: [
      { id: "stat-1", value: "1,450+", label: "VTU Scholars Trained", subtext: "Across 40+ affiliated engineering institutes" },
      { id: "stat-2", value: "1500V", label: "DC Bus Test Capacity", subtext: "Regenerative grid simulator & high-bay" },
      { id: "stat-3", value: "100%", label: "Indigenous Hardware", subtext: "Designed, engineered & assembled in Karnataka" },
      { id: "stat-4", value: "94.5%", label: "Practical Lab Rigor", subtext: "Verifiable digital cryptographic credentials" },
    ],
    technologies: [
      {
        id: "tech-1",
        badge: "Energy Storage Systems",
        title: "PURNA BESS™ Modular Storage",
        description: "Lithium iron phosphate battery energy storage systems engineered for peak shaving and industrial microgrids.",
        specs: ["50 kWh to 1 MWh scalable clusters", "Active liquid thermal loop", "CAN-FD real-time telemetry"],
        linkUrl: "/store/purna-bess-commercial",
      },
      {
        id: "tech-2",
        badge: "Semiconductors & DSP",
        title: "SaralaChip™ CCU Embedded Controller",
        description: "Real-time digital signal controller optimized for high-frequency resonant power conversion and dual CAN bus interfacing.",
        specs: ["Sub-microsecond fault protection", "GaN/SiC optimized gate drivers", "Industrial EMI hardened"],
        linkUrl: "/store/saralachip-dev-board",
      },
      {
        id: "tech-3",
        badge: "E-Mobility Infrastructure",
        title: "Swarnali™ Dual-Gun EV Fast Charger",
        description: "Commercial high-power EV charging station compliant with OCPP 2.0.1, designed for depot and highway applications.",
        specs: ["22 kW AC / 60 kW DC options", "RFID scholar authentication", "IP55 all-weather enclosure"],
        linkUrl: "/store/swarnali-60kw-dc-fast-charger",
      },
    ],
    milestones: [
      {
        id: "ms-1",
        year: "2024",
        quarter: "Q1 - Q2",
        badge: "Institutional Foundation",
        title: "Tri-Party MoU & VTU-VRIF-TCOE Facility Commissioning",
        desc: "Formal tripartite agreement signed between SMPS Electric Control Pvt Ltd, Visvesvaraya Technological University, and VTU Research & Innovation Foundation to establish the 5,000 sq.ft Power Electronics & CleanTech incubation bay in Bengaluru.",
        metrics: "5,000 sq.ft Lab Bay • High-Voltage Grid Simulator",
      },
      {
        id: "ms-2",
        year: "2024 - 2025",
        quarter: "Q3 - Q4",
        badge: "Hardware R&D Commissioning",
        title: "SaralaChip™ CCU Controller & High-Voltage Test Bay",
        desc: "Joint development of the 1500V regenerative battery cycler infrastructure and the inaugural hardware bring-up of the SaralaChip™ real-time DSP verification workbench with sub-2.5µs hardware fault isolation.",
        metrics: "1500V DC Test Bay • 2.5µs Fault Interruption",
      },
      {
        id: "ms-3",
        year: "2025",
        quarter: "Q1 - Q3",
        badge: "Academic Accreditation",
        title: "VTU-Certified Curriculum & Student Cohort Launch",
        desc: "Accreditation of 4-week intensive hands-on hardware training programs in Power Electronics, BMS firmware, and IoT telemetry conferring official university credits to engineering undergraduates across 200+ affiliated colleges.",
        metrics: "500+ Engineers Trained • 100% Practical Bench Labs",
      },
      {
        id: "ms-4",
        year: "2025 - 2026",
        quarter: "Q4 - Q1",
        badge: "Scientific Patents",
        title: "IEEE Publications & Joint Patent Filings",
        desc: "Publication of high-frequency planar magnetics optimization and adaptive Kalman filter BMS state estimation algorithms co-authored by SMPS researchers and VTU faculty, with 3 provisional national patents submitted.",
        metrics: "2 IEEE Papers • 3 Patents Filed • 18 Citations",
      },
      {
        id: "ms-5",
        year: "2026 - Beyond",
        quarter: "Active Phase",
        badge: "Commercial Scale",
        title: "Commercial PURNA BESS™ Rollout & Venture Spin-Offs",
        desc: "Transitioning validated laboratory prototypes into mass-commercial deployment for Karnataka state power utilities, defense telecom power supplies, and incubating 10+ student deep-tech hardware startups.",
        metrics: "100kWh BESS Deployed • 10 Startups Incubated",
      },
    ],
    domains: [
      {
        id: "rnd-deeptech",
        title: "R&D & DeepTech Innovation",
        desc: "Translational research transforming fundamental physics into commercial-grade power electronics, active thermal cooling systems, and multi-physics simulations.",
        badge: "Foundation",
        features: ["Thermal CFD Modeling", "Planar Magnetics", "Zero-Capex Prototyping"],
        link: "/rnd",
      },
      {
        id: "embedded-systems",
        title: "Embedded Systems & DSP Firmware",
        desc: "Deterministic sub-microsecond control loops, CAN-FD / Modbus protocols, ISO 26262 functional safety, and real-time DSP microcontrollers.",
        badge: "Core Architecture",
        features: ["Space Vector PWM", "Hardware HIL Testing", "CAN-FD Telemetry"],
        link: "/rnd",
      },
      {
        id: "vlsi-asic",
        title: "VLSI & Digital ASIC / FPGA Design",
        desc: "Custom silicon architectures, RTL synthesis, high-speed FPGA gate arrays, and ASIC layout validation for the SaralaChip™ family.",
        badge: "Silicon Engineering",
        features: ["RTL & Verilog Synthesis", "FPGA Hardware Emulators", "Tapeout Pre-Verification"],
        link: "/rnd",
      },
      {
        id: "defence-tech",
        title: "Defence Technology & Rugged Systems",
        desc: "Ruggedized high-altitude power converters, MIL-STD-810G vibration-tolerant packaging, and EMI/EMC shielded subsystems for defense communications.",
        badge: "Strategic Defence",
        features: ["MIL-STD Compliance", "Wide Ambient Range (-40°C to +75°C)", "Galvanic Isolation"],
        link: "/partner",
      },
      {
        id: "telecom-5g-6g",
        title: "Telecom (5G & 6G Infrastructure)",
        desc: "Ultra-high efficiency rectifier units, intelligent remote power telemetry, and sub-station DC distribution for next-gen 5G/6G cellular towers.",
        badge: "Telecommunications",
        features: ["98%+ Peak Rectifier Efficiency", "Sub-Station Energy Routers", "Remote SNMP Telemetry"],
        link: "/store",
      },
      {
        id: "quantum-tech",
        title: "Quantum Technology & Solid-State",
        desc: "Ultra-low noise cryogenic power supplies, precision sub-nanovolt voltage references, and quantum sensor signal-conditioning interfaces.",
        badge: "Next Frontier",
        features: ["Cryogenic Low-Noise Stages", "Sub-ppm Voltage References", "Quantum Telemetry"],
        link: "/rnd",
      },
      {
        id: "industry-5",
        title: "Industry 5.0 & Human-Centric Tech",
        desc: "Collaborative robot (Cobot) actuator drives, intelligent microgrids, circular battery reuse, and edge predictive maintenance algorithms.",
        badge: "Industry 5.0",
        features: ["Cobot High-Torque Drives", "Second-Life BESS Profiling", "Edge Anomaly Detection"],
        link: "/incubation",
      },
      {
        id: "energy-storage",
        title: "Energy Storage Systems (BESS)",
        desc: "Utility-scale containerized 1500V LFP/Sodium-ion battery banks, active liquid cooling thermal loop, and bidirectional sub-millisecond PCS inverters.",
        badge: "Clean Energy",
        features: ["1500V Architecture", "Liquid Cooling Loop", "BMS Fire-Suppression Matrix"],
        link: "/store",
      },
    ],
    upcomingProducts: [
      {
        id: "quantum-bess",
        name: "Quantum BESS™ 500kWh / 1MWh",
        brand: "Quantum BESS™",
        tagline: "Containerized Liquid-Cooled Industrial Energy Storage",
        stage: "R&D in Progress • Validation Bay 3",
        imageUrl: "/images/products/quantum-bess.jpg",
        status: "Upcoming R&D",
        specs: [
          "1500V High-Density LFP Cell Chemistry",
          "Dual-Circuit Active Liquid Thermal Management",
          "Sub-Millisecond Grid Frequency Regulation",
          "SmartLink™ Cloud & Modbus-TCP Telemetry",
        ],
        availability: "Pilot Trials: Q3 2027",
        link: "/store",
      },
      {
        id: "smartlink-gateway",
        name: "SmartLink™ Industrial IoT & Grid Gateway",
        brand: "SmartLink™",
        tagline: "Rugged DIN-Rail Edge Controller & Telemetry Router",
        stage: "R&D in Progress • Silicon Bring-Up",
        imageUrl: "/images/products/smartlink-gateway.jpg",
        status: "Upcoming R&D",
        specs: [
          "Triple 10/100 Ethernet + Dual RS485 Isolated Ports",
          "Native CAN-FD 5.0Mbps Automotive Bus",
          "Integrated 4G/5G Cellular & LoRa Sub-GHz Uplink",
          "Embedded Linux RT-Preempt Deterministic Kernel",
        ],
        availability: "Evaluation Kits: Q1 2027",
        link: "/store",
      },
      {
        id: "saralachip-nextgen",
        name: "SaralaChip™ Gen-2 DSP Silicon Controller",
        brand: "SaralaChip™",
        tagline: "Sub-Microsecond Space-Vector Power Silicon",
        stage: "Active Evaluation & Store Available",
        imageUrl: "/images/products/saralachip.jpg",
        status: "Available in Lab & Store",
        specs: [
          "Sub-2.5µs Hardware Fault Interruption Logic",
          "Hardware-Accelerated Clarke / Park Vector Math",
          "Isolated Gate Driver Signal Conditioning",
          "Open-Architecture Firmware C API & Python HIL",
        ],
        availability: "Immediate Dispatch & Lab Access",
        link: "/store/saralachip-dev-board",
      },
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What is SMPS Electric Control and its partnership with VTU?",
        answer: "SMPS Electric Control Pvt Ltd is an enterprise power electronics, energy storage, and embedded silicon manufacturer. Operating directly inside the prestigious VTU-VRIF-TCOE (Visvesvaraya Technological University Research & Innovation Foundation) facility in Bengaluru, we conduct collaborative academic-industrial R&D, offer accredited engineering internships, and commercialize cutting-edge hardware.",
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
        question: "Can hardware startups apply for incubation and laboratory access?",
        answer: "Yes. Our Deep-Tech Incubation program provides founders with zero-capex access to multi-channel oscilloscopes, power grid simulators, battery cyclers, Design-for-Manufacturing (DFM) advisory, and institutional pilot testing. Applications are open year-round via our Incubation portal.",
        category: "Incubation",
      },
      {
        id: "faq-5",
        question: "How do institutional and corporate customers place hardware orders?",
        answer: "Clients can explore products in our online Hardware Catalog. For enterprise BESS containers, custom telecom SMPS rectifiers, or university lab setup packages, submit an ODM partnership inquiry or contact our sales engineering division directly.",
        category: "Procurement",
      },
    ],
    ctaTitle: "Advance Your Engineering Career with Hands-On Hardware R&D",
    ctaSubtitle:
      "Join the next batch of elite engineers mastering power converters, BMS firmware, and battery testing inside the VTU Telecom Center of Excellence.",
    ctaPrimaryText: "Explore VTU Internships",
    ctaPrimaryLink: "/internships",
  },
  rnd: {
    headline: "Translational Hardware Research & Silicon Development",
    subheadline:
      "Operating inside the VTU-VRIF-TCOE high-voltage test center, our research faculty and industrial fellows build patented solutions across power electronics, BMS algorithms, and wide-bandgap semiconductors.",
    bays: [
      {
        id: "bay-1",
        name: "1500V Regenerative Power Bay",
        focusArea: "Utility BESS & High-Power Conversion",
        equipment: ["1500V / 250kW Regenerative Grid Simulator", "16-Channel Power Analyzer", "High-Voltage LFP Cycler"],
        leadInvestigator: "Er. Shiv Bhalke",
        description: "Full-scale stress testing of containerized commercial BESS units with real-time grid disturbance emulation.",
      },
      {
        id: "bay-2",
        name: "GaN & SiC Switching Laboratory",
        focusArea: "Wide-Bandgap Semiconductor Characterization",
        equipment: ["4-Channel 1GHz Mixed Signal Oscilloscope", "Optical Isolated Gate Probes", "Double-Pulse Test Workbench"],
        leadInvestigator: "Dr. K. S. Narayanaswamy",
        description: "Nanosecond gate-drive transient capture and parasitic inductance suppression for wide-bandgap topologies.",
      },
      {
        id: "bay-3",
        name: "Automotive BMS & Real-Time HIL Bay",
        focusArea: "SaralaChip™ Embedded Control & CAN-FD",
        equipment: ["Vector CANoe Network Interface", "JTAG High-Speed Emulators", "Rohde & Schwarz Spectrum Analyzer"],
        leadInvestigator: "Dr. Pratibha Rao",
        description: "Closed-loop firmware design for resonant LLC converters and ISO 26262 functional safety compliance.",
      },
    ],
    publications: [
      {
        id: "pub-1",
        title: "High-Frequency Planar Magnetics Optimization for 1500V Photovoltaic Central Inverters",
        authors: "Narayanaswamy, K. S., Bhalke, S., et al.",
        venue: "IEEE Transactions on Industrial Electronics, Vol. 71",
        year: "2025",
        doiOrUrl: "https://doi.org/10.1109/TIE.2025.1092831",
      },
      {
        id: "pub-2",
        title: "Adaptive Extended Kalman Filter Formulation for LFP State-of-Charge Tracking in Modular BESS",
        authors: "Bhalke, S., Rao, P.",
        venue: "Journal of Power Sources & Energy Storage",
        year: "2026",
        doiOrUrl: "https://doi.org/10.1016/j.jpowsour.2026.04.019",
      },
    ],
    patentsCount: "18 Published",
    grantsAmount: "₹4.2 Cr DST & Industry Grants",
  },
  internships: [],
  gallery: [],

  excom: [
    {
      id: "excom-1",
      name: "Er. Shiv Bhalke",
      role: "Managing Director & Chief Technologist",
      designation: "Managing Director, SMPS Electric Control Pvt Ltd",
      department: "Power Systems & Strategic R&D",
      qualifications: "B.E. (Electrical & Electronics), M.S. (Power Electronics)",
      bio: "Leads technical research, industrial technology commercialization, and university-industry co-development at SMPS Tech Lab.",
      email: "shiv.bhalke@smpstechlab.com",
    },
    {
      id: "excom-2",
      name: "Dr. K. S. Narayanaswamy",
      role: "Academic Advisor & Director of Research",
      designation: "Director of Research, VTU-VRIF Center",
      department: "Visvesvaraya Technological University",
      qualifications: "Ph.D. (Power Electronics, IISc Bengaluru), Senior Member IEEE",
      bio: "Oversees research curriculum accreditation, doctoral grants, and advanced wide-bandgap semiconductor testbenches.",
      email: "research.director@vtu.ac.in",
    },
    {
      id: "excom-3",
      name: "Dr. Pratibha Rao",
      role: "Head of Embedded Systems & DSP",
      designation: "Principal Architect, Digital Control Systems",
      department: "Embedded Microcontrollers & Telemetry",
      qualifications: "Ph.D. (Real-Time Control Systems, IIT Madras)",
      bio: "Directs SaralaChip™ firmware algorithms, CAN-FD grid synchronization, and automotive functional safety compliance.",
      email: "pratibha.rao@smpstechlab.com",
    },
  ],
  events: [],
  careers: [],
  incubation: {
    heroEyebrow: "Deep-Tech Hardware Entrepreneurship & Venture Launchpad",
    heroTitle: "Empowering Deep-Tech Hardware Entrepreneurs",
    heroSubtitle:
      "Bridging the brutal 'hardware valley of death'. Operating from the prestigious VTU-VRIF-TCOE ecosystem, SMPS Tech Lab provides hardware entrepreneurs and startup founders with zero-capex testbenches, DFM engineering, regulatory pre-compliance certification, and venture market access.",
    facilityTitle: "Industrial Test Benches Built for Hardware Entrepreneurs",
    facilityDesc:
      "Don't spend millions of rupees on initial test equipment. Our facility equips hardware entrepreneurs with multi-channel oscilloscopes, 1500V load banks, grid simulators, and thermal chambers from day one.",
    founderPerks: [
      "Workstation bays located inside the prestigious VTU-VRIF-TCOE Center",
      "Direct technical mentorship from veteran power electronics design engineers",
      "Prototyping component library & discount hardware procurement",
      "Access to pilot manufacturing test runs and PCB assembly lines",
      "Assistance with patent drafting, provisional filings, and trademarking",
      "Introduction to institutional grant programs and clean-tech angel syndicates",
    ],
    faqs: [
      {
        id: "inc-faq-1",
        question: "Do you take equity in incubated hardware startups?",
        answer: "No. SMPS Tech Lab and VTU-VRIF offer non-dilutive incubation support for early-stage student and academic founders. We provide zero-capex workbench access, testing instruments, and DFM mentorship without mandatory equity warrants.",
        category: "Equity & Terms",
      },
      {
        id: "inc-faq-2",
        question: "Who retains ownership of Intellectual Property (IP)?",
        answer: "Startups and founders retain 100% full commercial ownership of proprietary IP, schematics, and codebases developed in the incubation bay. In cases of co-developed joint patents with VTU faculty, structured technology transfer licensing agreements are established.",
        category: "IP Rights",
      },
      {
        id: "inc-faq-3",
        question: "What test instruments and laboratory facilities are accessible?",
        answer: "Incubated teams have direct access to 4-channel mixed-signal oscilloscopes, 1500V regenerative DC load banks, programmable AC grid simulators, thermal environmental stress chambers (-40°C to +85°C), high-precision battery cyclers, and isolated CAN-bus analyzers.",
        category: "Facilities",
      },
      {
        id: "inc-faq-4",
        question: "Are external non-VTU engineering founders eligible to apply?",
        answer: "Yes. While VTU faculty and alumni receive fast-track admission, any deep-tech hardware startup working in CleanTech, Electric Mobility, Power Electronics, Semiconductors, or Industrial IoT across India is eligible to apply for cohort slots.",
        category: "Eligibility",
      },
      {
        id: "inc-faq-5",
        question: "Do you assist with institutional grants and seed capital?",
        answer: "Yes. We facilitate founder introductions and documentation assistance for DST NIDHI-PRAYAS grants, Karnataka Startup Seed Funds, MeitY TIDE 2.0 schemes, and institutional angel syndicates specializing in deep-tech hardware.",
        category: "Funding",
      },
    ],
  },
  hardware: {
    isOrderingEnabled: false,
    showPricing: false,
    storeNotice: "Hardware products are available for institutional laboratory procurement and industry R&D quotation. Direct e-commerce checkout is currently disabled.",
    storeFaqs: [
      {
        id: "store-faq-1",
        question: "How do institutional and enterprise clients order commercial hardware?",
        answer: "For commercial BESS containers, high-voltage EV fast chargers, and institutional developer kit batches, submit an inquiry via our contact or partner portal. Our technical sales team provides custom project quotations, electrical single-line diagrams (SLD), and delivery schedules.",
        category: "Ordering",
      },
      {
        id: "store-faq-2",
        question: "What is the status of Quantum BESS™ and SmartLink™?",
        answer: "Quantum BESS™ and SmartLink™ are in active R&D validation inside the VTU-VRIF Center of Excellence. Early access evaluation units and technical datasheets are available upon request for qualifying industrial test partners.",
        category: "Upcoming Products",
      },
      {
        id: "store-faq-3",
        question: "Are academic lab kits and SaralaChip™ modules available for universities?",
        answer: "Yes. Educational institutions can procure bulk kits with specialized VTU laboratory manuals, firmware SDKs, and instructor onboarding packages directly from our hardware catalog.",
        category: "Academic",
      },
      {
        id: "store-faq-4",
        question: "What warranty and compliance certifications come with the hardware?",
        answer: "All commercial hardware includes a standard 3-to-5-year industrial warranty with optional SLA extensions. Units undergo stringent pre-compliance testing covering BIS, ARAI, CE, and CISPR EMI/EMC standards.",
        category: "Warranty & Support",
      },
    ],
    upcomingProducts: [
      {
        id: "quantum-bess",
        name: "Quantum BESS™ 500kWh / 1MWh Container",
        brand: "Quantum BESS™",
        tagline: "Utility-scale 1500V LFP liquid-cooled energy storage",
        stage: "R&D in Progress • Validation Bay 3",
        imageUrl: "/images/products/quantum-bess.jpg",
        status: "Upcoming R&D",
        specs: [
          "1500V DC Operating Voltage",
          "SmartLink™ Real-time Telemetry",
          "Dual Liquid Thermal Loop",
        ],
        availability: "Trials: Q3 2027",
        link: "/store/quantum-bess-container",
      },
      {
        id: "smartlink-gateway",
        name: "SmartLink™ Industrial IoT Gateway",
        brand: "SmartLink™",
        tagline: "DIN-rail edge controller with CAN-FD and 4G/5G",
        stage: "Silicon Bring-Up",
        imageUrl: "/images/products/smartlink-gateway.jpg",
        status: "Upcoming R&D",
        specs: [
          "Triple 10/100 Ethernet + CAN-FD",
          "Embedded Linux RT-Preempt",
          "Sub-GHz LoRa & 4G/5G Uplink",
        ],
        availability: "Eval Kits: Q1 2027",
        link: "/store/smartlink-iot-gateway",
      },
      {
        id: "saralachip-nextgen",
        name: "SaralaChip™ CCU Controller Module",
        brand: "SaralaChip™",
        tagline: "Sub-2.5µs hardware fault isolation digital signal controller",
        stage: "Available in Lab & Store",
        imageUrl: "/images/products/saralachip.jpg",
        status: "In Stock & Available",
        specs: [
          "Sub-2.5µs Hardware Protection",
          "Isolated High-Voltage Drivers",
          "VTU Curriculum SDK Included",
        ],
        availability: "Ready to Dispatch",
        link: "/store/saralachip-dev-board",
      },
    ],
  },
  global: {
    announcementBarEnabled: true,
    announcementText: "Admissions Open: VTU Winter 2026 Hands-on Engineering Internship Batches at Nagarbhavi Campus.",
    announcementLink: "/internships",
    contactEmail: "info@smpstechlab.com",
    contactPhone: "+91 80 2318 4567",
    facilityAddress: "VTU-VRIF-TCOE Center, Visvesvaraya Technological University Campus, Nagarbhavi, Bengaluru - 560072, Karnataka",
  },
};

export const STORAGE_KEY = "smps_operations_cms_state_v4";

export function mergeWithDefaults(raw: any): FullSiteContent {
  if (!raw || typeof raw !== "object") return INITIAL_SITE_CONTENT;
  return {
    home: { ...INITIAL_SITE_CONTENT.home, ...(raw.home || {}) },
    rnd: { ...INITIAL_SITE_CONTENT.rnd, ...(raw.rnd || {}) },
    internships: Array.isArray(raw.internships) ? raw.internships : INITIAL_SITE_CONTENT.internships,
    gallery: Array.isArray(raw.gallery) ? raw.gallery : INITIAL_SITE_CONTENT.gallery,
    excom: Array.isArray(raw.excom) ? raw.excom : INITIAL_SITE_CONTENT.excom,
    events: Array.isArray(raw.events) ? raw.events : INITIAL_SITE_CONTENT.events,
    careers: Array.isArray(raw.careers) ? raw.careers : INITIAL_SITE_CONTENT.careers,
    incubation: { ...INITIAL_SITE_CONTENT.incubation, ...(raw.incubation || {}) },
    hardware: { ...INITIAL_SITE_CONTENT.hardware, ...(raw.hardware || {}) },
    global: { ...INITIAL_SITE_CONTENT.global, ...(raw.global || {}) },
  };
}

export function loadSiteContent(): FullSiteContent {
  if (typeof window === "undefined") {
    return INITIAL_SITE_CONTENT;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SITE_CONTENT;
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch (err) {
    console.error("Failed to parse CMS store from localStorage:", err);
    return INITIAL_SITE_CONTENT;
  }
}

export async function fetchSiteContentFromDatabase(): Promise<FullSiteContent | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/api/content", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) return null;
    return mergeWithDefaults(data);
  } catch (err) {
    console.warn("Could not fetch CMS content from database API:", err);
    return null;
  }
}

export async function saveSiteContentToDatabase(content: FullSiteContent): Promise<boolean> {
  try {
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to persist CMS content to database API:", err);
    return false;
  }
}

export function saveSiteContent(content: FullSiteContent): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("smps-cms-updated"));
    // Asynchronously persist to the database
    saveSiteContentToDatabase(content).catch((err) => {
      console.error("Background database save error:", err);
    });
  } catch (err) {
    console.error("Failed to save CMS store to localStorage:", err);
  }
}

export function resetSiteContentToDefault(): FullSiteContent {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("smps-cms-updated"));
    saveSiteContentToDatabase(INITIAL_SITE_CONTENT).catch(console.error);
  }
  return INITIAL_SITE_CONTENT;
}
