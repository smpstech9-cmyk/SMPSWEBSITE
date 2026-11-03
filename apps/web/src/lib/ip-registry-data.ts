// Auto-generated Strategic IP Asset Registry Data from official Word Documents
export interface IPReportSection {
  title: string;
  content: string[];
}

export interface IPAssetItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  ipRef: string;
  sectors: string[];
  file: string;
  docSeries: string;
  author: string;
  authorRole: string;
  org: string;
  date: string;
  classification: string;
  abstract: string;
  sections: IPReportSection[];
  totalParagraphs: number;
}

export const IP_ASSETS_REGISTRY: IPAssetItem[] = [
  {
    "id": "ip-01",
    "code": "SIPAIR IP-01",
    "title": "Smart Hybrid SMPS",
    "subtitle": "Novel Designed Smart Hybrid Switched-Mode Power Supply with Multi-Source Arbitrage",
    "category": "Power Electronics",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-01 \u2014 Novel Design Patent Filed, 2025",
    "sectors": [
      "Telecom Infrastructure",
      "Solar Microgrids",
      "Data Centers",
      "Industrial Automation"
    ],
    "file": "SIPAIR_IP01_SmartHybridSMPS_v5_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the Smart Hybrid Switched-Mode Power Supply topology and associated adaptive switching methodology \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). All references to this IP are made in the capacity of the IP rights holder.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "Smart Hybrid SMPS  \u2014  IP-01",
          "Novel Designed Smart Hybrid Switched-Mode Power Supply",
          "Report Title",
          "SIPAIR IP-01 \u2014 Smart Hybrid SMPS Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "2.2  Four Integrated Functional Layers19",
        "content": [
          "2.2.1  Functional Architecture \u2014 Reference Schematic20"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data25",
        "content": [
          "CAGR Comparison \u2014 IP-01 Target Market Segments26"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary46",
        "content": [
          "The Context48",
          "The IP-01 Integration Solution48",
          "The Context50",
          "The IP-01 Integration Solution51",
          "The Context52",
          "The IP-01 Integration Solution53",
          "The Context54",
          "The IP-01 Integration Solution55",
          "The Observation That Started Everything56",
          "Seven Iterations to Production Readiness57",
          "The Patent Filing \u2014 What It Protects and Why It Matters58",
          "The Invitation60",
          "Three Ways to Engage61",
          "Model A \u2014 Research Fellowship61",
          "Model B \u2014 OEM Co-Development Partnership62"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Power electronics is not a peripheral engineering discipline \u2014 it is the central nervous system of the modern electrified economy. Every watt of energy that flows through a renewable installation, an electric vehicle, a 5G base station, a smart factory, or a medical imaging suite must traverse a power conversion stage. The quality, efficiency, and intelligence of that conversion stage determine system performance, operational cost, regulatory compliance, and the competitive differentiation of every OEM or infrastructure operator that deploys it.",
          "The global power electronics market stands at USD 51.7 billion in 2025 and is simultaneously expanding across every sector of consequence \u2014 a convergence of four irreversible structural megatrends: the industrial digitalisation wave of Industry 4.0, the clean energy transition, the electric mobility revolution, and the hyperscale digital infrastructure buildout of 5G and cloud computing. These are not cyclical demand episodes \u2014 they are structural, multi-decade transformations, each creating direct, documented demand for exactly the capabilities that IP-01 delivers."
        ]
      },
      {
        "title": "1.2  The Problem This IP Solves",
        "content": [
          "Every advanced electrified system operates simultaneously across both AC and DC power domains. A CNC machining centre requires AC supply for its spindle motor and regulated DC rails at 24V and 48V for its servo controllers and digital logic. A solar-plus-storage installation must condition panel DC for battery charging and synthesise AC for grid injection simultaneously. An EV charging station must manage AC grid input and deliver regulated DC to the vehicle battery, while increasingly requiring bi-directional energy flow capability for Vehicle-to-Grid demand-response operation.",
          "The conventional industry response has been to deploy multiple discrete converter units \u2014 a separate AC inverter and a DC converter, each with its own control board, thermal system, enclosure, and certification. This architectural approach introduces cascaded conversion losses of three to eight efficiency percentage points, inflates bill-of-materials cost by 30\u201345% at the system level, compounds failure points, and creates fragmented monitoring requirements. It is an engineering compromise born of historical product-line silos, not of engineering optimality.",
          "Figure 1.1 \u2014 The architectural distinction: conventional two-unit approach (left) versus the IP-01 single hybrid SMPS (right). The efficiency delta, BOM cost saving, and diagnostic unification are all consequences of this single architectural decision."
        ]
      },
      {
        "title": "1.3  The IP-01 Solution",
        "content": [
          "STRATEGIC NOTE",
          "IP-01 eliminates this architectural compromise. The Smart Hybrid SMPS is a single, patent-protected power conversion platform that simultaneously delivers regulated AC and DC outputs from one unified hybrid topology \u2014 replacing the multi-converter cascade with a single intelligent unit that is more efficient, more compact, more data-aware, and substantially lower in total system cost than anything the current commercial SMPS market offers."
        ]
      },
      {
        "title": "1.4  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$68.7B",
          "2025 Baseline \u00b7 5 Sectors",
          "HIGHEST-GROWTH SECTOR",
          "21.65%",
          "EV Charging CAGR 2025\u20132035",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "Patent Filed",
          "Hybrid Topology & Method",
          "Figure 1.2 \u2014 IP-01 Total Addressable Market breakdown by sector (left) and global reference market landscape positioning (right). EV Charging represents the highest-growth application opportunity; Energy & Renewables the largest absolute TAM."
        ]
      },
      {
        "title": "1.5  Why This IP, Why Now",
        "content": [
          "Three factors converge uniquely at this moment to define an exceptional commercialisation window. The global EV charging infrastructure build-out is at its early exponential phase \u2014 mandated, government-funded, and scaling from a 2025 base representing less than 5% of the eventual installed network. The power module specification for every charger deployed over the next decade will be locked in over the next 18\u201336 months. GaN and SiC semiconductors are crossing the commercial cost threshold \u2014 a transition that IP-01's adaptive switching architecture is designed to exploit without a topology redesign. And India's PLI framework, FAME II, and PM-KUSUM collectively create a domestic demand environment backed by over INR 30,000 crore of committed government capital, in which a domestically patented power electronics IP is a uniquely privileged commercial asset.",
          "RISK ADVISORY",
          "The power electronics IP landscape rewards early movers disproportionately. Certification cycles in automotive (18\u201324 months), medical (24\u201336 months), and grid infrastructure (12\u201324 months) create structural first-mover advantages that compound with every OEM design win. The cost of inaction in this window is not a missed revenue opportunity \u2014 it is the forfeiture of a structural market position to whichever organisation moves first.",
          "TECHNOLOGY OVERVIEW",
          "Architecture \u00b7 Differentiators \u00b7 GaN Roadmap \u00b7 Standards Framework"
        ]
      },
      {
        "title": "2.1  The SMPS Paradigm \u2014 A Technical Foundation",
        "content": [
          "A Switched-Mode Power Supply operates on a thermodynamically superior principle compared to its linear predecessor: instead of dissipating excess energy as heat, an SMPS uses high-frequency switching transistors \u2014 MOSFETs or IGBTs \u2014 to interrupt input power at frequencies between 50 kHz and 1 MHz, transferring energy through reactive storage elements to a regulated output. Modern SMPS designs achieve 88\u201396% conversion efficiency versus 40\u201365% for equivalent linear regulators \u2014 a gap that becomes commercially critical at the kilowatt-to-megawatt power levels of industrial, EV, and grid applications.",
          "The 'Smart Hybrid' designation in IP-01 embeds two independently valuable innovations onto this foundation. The 'Hybrid' innovation is the patent-bearing topology: a single unified power stage simultaneously generating both regulated AC and regulated DC outputs. The 'Smart' innovation is the embedded intelligence layer: adaptive switching control that continuously optimises operating parameters in real time under dynamic load conditions, paired with a comprehensive telemetry platform that transforms the unit from a passive component into an active data-generating system node."
        ]
      }
    ],
    "totalParagraphs": 1029
  },
  {
    "id": "ip-02",
    "code": "SIPAIR IP-02",
    "title": "SMPS Integrated CCU for Telecom",
    "subtitle": "SMPS-Based Integrated Central Control Unit for Uninterrupted Multi-Rail Telecom Power",
    "category": "Telecom Power & CCU",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-02 \u2014 Integrated CCU Architecture, Filed 2025",
    "sectors": [
      "5G/6G Macro Sites",
      "Telecom Tower Infrastructure",
      "Distributed Micro-Substations"
    ],
    "file": "SIPAIR_IP02_SMPSIntegratedCCU_Telecom_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated Central Control Unit architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-02 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-02: SMPS Integrated CCU for Telecom",
          "SMPS-Based Integrated Central Control Unit for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-02 \u2014 SMPS Integrated CCU for Telecom Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.2  Global Market Reference Data1",
        "content": [
          "CAGR Comparison \u2014 IP-02 Target Market Segments1"
        ]
      },
      {
        "title": "4.3  Sector Deep-Dives1",
        "content": [
          "Sector 1 \u2014 5G & Next-Generation Telecom Tower Infrastructure1",
          "Sector 2 \u2014 Hyperscale Data Centres & Edge Computing1",
          "Sector 3 \u2014 Satellite Ground Infrastructure & SATCOM Networks1",
          "Sector 4 \u2014 Smart City & Critical Public Communication Networks1",
          "Sector 5 \u2014 Maritime, Offshore & Remote Operations1"
        ]
      },
      {
        "title": "8.2  Five Commercialisation Pathways1",
        "content": [
          "Pathway 1 \u2014 Telecom OEM Licensing1",
          "Pathway 2 \u2014 Tower Company Direct Supply1",
          "Pathway 3 \u2014 Government & Public Safety Procurement1",
          "Pathway 4 \u2014 Maritime & Offshore OEM Integration1",
          "Pathway 5 \u2014 Satellite Ground Infrastructure1"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary1",
        "content": [
          "The Context1",
          "The IP-02 Integration Solution1",
          "The Context1",
          "The IP-02 Integration Solution1",
          "The Context1",
          "The IP-02 Integration Solution1",
          "The Context1",
          "The IP-02 Integration Solution1",
          "The Architecture Insight That Created IP-021",
          "The Engineering Challenges of CCU Integration1",
          "The Invitation1",
          "Three Ways to Engage1",
          "Model A \u2014 Research Fellowship1",
          "Model B \u2014 OEM Co-Development Partnership1",
          "Model C \u2014 Technology Licensing1"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Telecommunications infrastructure has become the single most reliability-dependent sector in the global economy. The physical network of 5G base stations, satellite ground hubs, data centre edge nodes, smart city communication backbones, and maritime SATCOM terminals represents a USD 41 trillion global economy's connective tissue. A power outage at a 5G macro station does not merely inconvenience nearby users \u2014 it affects connected vehicles, industrial automation systems, emergency services, and financial transactions simultaneously. The downtime cost for a single tier-1 telecom operator during a major power event is measured in crores per hour. The reliability standard is not aspirational: it is contractually mandated at 99.999% uptime across the global telecom infrastructure estate.",
          "This reliability mandate defines an engineering requirement that the current generation of separate-component telecom power architectures is structurally incapable of meeting without compromise. A conventional telecom site deploys three separate systems to manage power: a rectifier to convert AC to DC, an SMPS to deliver regulated voltage rails, and a controller unit to manage switching between grid, battery, and generator sources. Each is independently sourced, independently certified, independently maintained, and dependent on the other two functioning correctly. The intelligence governing source switching typically resides in software that polls system state at intervals measured in seconds \u2014 far too slow to prevent a power interruption that occurs in milliseconds. The result is infrastructure that is theoretically designed for 99.999% availability and operationally delivering significantly less.",
          "Figure 1.1 \u2014 The architectural distinction: conventional three-unit telecom power architecture (left) versus the IP-02 Integrated CCU+SMPS (right). The sub-millisecond failover capability is not an incremental improvement \u2014 it is an architectural consequence of integrating the control intelligence directly with the power conversion stage."
        ]
      },
      {
        "title": "1.2  The IP-02 Solution",
        "content": [
          "STRATEGIC NOTE",
          "IP-02 \u2014 the SMPS-Based Integrated Central Control Unit \u2014 resolves the reliability gap at its architectural root. By integrating the CCU intelligence layer directly with the SMPS power conversion stage in a single unified platform, IP-02 eliminates the inter-system communication latency, the BOM duplication, and the monitoring blind spots that characterise the conventional three-unit approach. The result is a single, patent-protected power orchestration system that delivers uninterrupted AC and DC to mission-critical telecom infrastructure in all grid conditions \u2014 while providing the network management telemetry and predictive fault intelligence that modern telecom operators require."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$27.1B",
          "2025 Baseline \u00b7 5 Sectors",
          "HIGHEST-GROWTH SECTOR",
          "14.84%",
          "Satellite Ground CAGR 2025\u20132035",
          "5G TOWER SECTOR TAM",
          "$6.11B",
          "9.53% CAGR to 2031",
          "IP PROTECTION",
          "CCU Filed",
          "Integrated Architecture Patent"
        ]
      },
      {
        "title": "1.4  Reference Metrics Table",
        "content": [
          "METRIC",
          "VALUE / OBSERVATION",
          "Total Addressable Market (2025)",
          "USD 27.1 Billion across 5 primary sectors and 10 commercial applications",
          "Strongest Sector Growth (CAGR)",
          "Satellite Ground Infrastructure \u2014 14.84% CAGR (2025\u20132035); market projected at USD 19.6B by 2035",
          "Data Centre & Edge Sector TAM",
          "USD 10.86 Billion (2025) \u2014 largest individual sector; CAGR 7.3% to 2030",
          "5G Telecom Tower Sector TAM",
          "USD 6.11 Billion (2025) \u2014 fastest near-term revenue pathway; CAGR 9.53%",
          "Smart City & Public Comms TAM",
          "USD 4.2 Billion (2025) \u2014 8.5% CAGR; India Smart City Mission and BharatNet aligned",
          "Maritime & Offshore Sector TAM",
          "USD 3.1 Billion (2025) \u2014 6.5% CAGR; IMO GMDSS modernisation mandate drives upgrade cycle",
          "IP Protection Status"
        ]
      },
      {
        "title": "1.5  Why IP-02, Why Now",
        "content": [
          "Three structural forces create an exceptional and time-bounded commercialisation window for IP-02. The 5G densification wave \u2014 2.3 billion subscriptions by end of 2024 with 4 billion more to come \u2014 is driving the largest single upgrade cycle in telecom tower power infrastructure history. Every new 5G base station requires a multi-rail power solution that legacy rectifiers cannot deliver; IP-02 is architecturally designed for exactly this specification. The LEO satellite constellation buildout \u2014 Amazon Project Kuiper deploying 3,000+ satellites in April 2025, Starlink licensed in India in June 2025 \u2014 is creating hundreds of distributed ground hubs in remote locations that demand autonomous, uninterrupted hybrid power management with satellite-backhaul monitoring: a requirement that fits the IP-02 CCU architecture with near-perfect precision. And the IMO GMDSS modernisation mandate, requiring a complete upgrade of vessel emergency communication systems to LEO-based GMDSS by 2026, is forcing a full power infrastructure refresh across the global commercial shipping fleet.",
          "RISK ADVISORY",
          "Each of these three market events has a defined timeline. The 5G tower upgrade cycle will lock in power module specifications over the next 18\u201336 months. LEO ground hub power system contracts are being awarded now. The GMDSS maritime mandate has a 2026 compliance deadline. These are not open-ended opportunities \u2014 they are windows with hard close dates. The organisations that establish IP-02 as the reference architecture before those windows close will hold structural first-mover positions in markets that will be served by their technology for the next decade.",
          "TECHNOLOGY OVERVIEW",
          "CCU Architecture \u00b7 Differentiators \u00b7 IP-01 vs IP-02 \u00b7 Standards"
        ]
      }
    ],
    "totalParagraphs": 1098
  },
  {
    "id": "ip-03",
    "code": "SIPAIR IP-03",
    "title": "Novel Integrated Versa Module Converter",
    "subtitle": "Hot-Swappable High-Density Power Conversion Architecture for Uninterrupted Applications",
    "category": "Modular Converters",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-03 \u2014 Novel Versa Module Converter Architecture, Filed 2025",
    "sectors": [
      "Modular Data Centers",
      "Mission-Critical Power",
      "Industrial Switchgear"
    ],
    "file": "SIPAIR_IP03_VersaModuleConverter_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated Versa Module Converter architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-03 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-03: Novel Integrated Versa Module Converter",
          "SMPS-Based Integrated Versa Module Converter for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-03 \u2014 Novel Integrated Versa Module Converter Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data1",
        "content": [
          "CAGR Comparison \u2014 IP-03 Target Market Segments1"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary1",
        "content": [
          "The Context1",
          "The IP-03 VMC Integration Solution1",
          "The Context1",
          "The IP-03 VMC Integration Solution1",
          "The Context1",
          "The IP-03 VMC Integration Solution1",
          "The Context1",
          "The IP-03 VMC Integration Solution1",
          "The Observation That Led to IP-031",
          "Three Engineering Challenges1",
          "Three Ways to Engage1",
          "Model A \u2014 Research Fellowship1",
          "Model B \u2014 OEM Co-Development Partnership1",
          "Model C \u2014 Technology Licensing1",
          "What You Bring. What SMPS Tech Lab Provides.1"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "The global energy transition has created an unprecedented deployment challenge for power electronics engineers: modern energy systems are no longer single-source, single-load architectures. A utility-scale solar farm feeds a battery storage system that also interfaces with the grid and local industrial loads. A hyperscale data centre integrates on-site solar generation, grid-interactive UPS, and 48V server power distribution. A commercial EV charging hub must simultaneously charge vehicles at DC fast-charge rates, export energy back to the grid through V2G protocols, and manage a local battery buffer. In every one of these architectures, the conventional answer has been the same: deploy multiple discrete converter units, each optimised for one conversion mode, connected by interfaces that add cost, failure points, and energy loss at every junction.",
          "This architectural redundancy is not an engineering optimum. It is a market legacy \u2014 the accumulated product-line thinking of an industry that built single-mode converters because single-mode systems were the norm. That norm has changed. The systems being deployed today and throughout the next decade are multi-source, multi-mode, and multi-directional by design. The power conversion platform they require must be equally versatile."
        ]
      },
      {
        "title": "1.2  The Problem IP-03 Solves",
        "content": [
          "Figure 1.1 \u2014 The architectural distinction: conventional four-unit multi-converter cascade (left) versus the IP-03 Versa Module Converter (right). Every interface eliminated is a failure point removed, a conversion loss recovered, and a commissioning complexity resolved.",
          "STRATEGIC NOTE",
          "IP-03 eliminates the multi-converter cascade. The Novel Integrated Versa Module Converter is a single modular platform configurable as AC-DC, DC-DC, DC-AC, or bidirectional converter \u2014 reducing total BOM and footprint by 30\u201350%, improving system round-trip efficiency by 4\u20138 percentage points, and enabling real-time power flow optimisation across all connected sources and loads without hardware redesign."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$42.3B",
          "2025 Baseline \u00b7 5 Sectors",
          "HIGHEST-GROWTH SECTOR",
          "EV & BESS CAGR 2025\u20132030",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "VMC Filed",
          "Multi-Mode Modular Patent",
          "Figure 1.2 \u2014 IP-03 TAM breakdown (left): Renewable & Microgrid is the largest sector at $13.0B; EV & BESS is the fastest-growing at 23.1% CAGR. Both are Excellent IP fit for the Versa Module Converter."
        ]
      },
      {
        "title": "1.4  Why IP-03, Why Now",
        "content": [
          "Four structural forces converge at this moment to define an exceptional commercialisation window. Global grid-scale battery storage is projected to expand 35-fold between 2022 and 2030 per the IEA Net Zero Scenario \u2014 every installation requires a bidirectional power conversion interface, which is the VMC's core capability. The V2G market is growing at 48.1% CAGR through 2030, requiring bidirectional AC-DC converters at every V2G-capable charging point. The microgrid market is expanding at 17\u201320% CAGR, driven by solar hybrid deployments in India, Africa, and Southeast Asia, each requiring a multi-mode power conversion backbone. And GaN and SiC semiconductors \u2014 now crossing commercial cost thresholds \u2014 enable the VMC's high-frequency multi-mode topology to achieve efficiencies previously impossible with silicon, providing a built-in technology upgrade path that extends the IP moat into the next semiconductor generation.",
          "MARKET DATA POINT",
          "59% of new UPS models introduced in 2025 feature modular designs (Global Growth Insights), validating that the market has already moved to the VMC's architectural philosophy. IP-03 is not pioneering an unproven concept \u2014 it is the next evolution of a direction the market has already confirmed.",
          "TECHNOLOGY OVERVIEW",
          "VMC Architecture \u00b7 Multi-Mode Topology \u00b7 Modular Scalability \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is the Novel Integrated Versa Module Converter?",
        "content": [
          "A conventional power converter is designed for a single conversion topology: a rectifier converts AC to DC; an inverter converts DC to AC; a DC-DC converter steps voltages up or down; a bidirectional converter manages energy flow in both directions. Each is a discrete product, optimised for its specific conversion path. In complex energy systems with multiple sources and load types, this means deploying multiple converters, each with its own control board, thermal management, enclosure, and certification \u2014 connected by interfaces that introduce latency, losses, and failure points at every junction.",
          "The Novel Integrated Versa Module Converter breaks from this paradigm. The 'Versa' designation reflects the technology's core architectural advantage: a single integrated hardware platform configurable as an AC-DC rectifier, DC-DC converter, DC-AC inverter, or bidirectional AC-DC-AC converter \u2014 determined by software-defined control logic rather than hardware topology. The 'Module' architecture adds a further dimension: VMC units stack to scale output power, with each module independently managed and hot-swappable. Failed modules do not interrupt system operation; the remaining modules automatically redistribute load within one switching cycle."
        ]
      },
      {
        "title": "2.2  The Four Integrated Functional Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-03",
          "Multi-Source Input Stage",
          "Accepts AC grid (85\u2013480V), solar DC (30\u20131500V), battery DC (24\u2013800V), and generator AC simultaneously. Active PFC for all AC inputs.",
          "Wide-range universal input accepting all four source types within a single input stage. No external switching or transfer hardware required for source transitions.",
          "Versa Conversion Core",
          "The patent-bearing element. A single integrated power stage reconfigurable as AC-DC, DC-DC, DC-AC, or bidirectional \u2014 all from the same hardware platform via software-defined switching sequences.",
          "Eliminates the multi-converter cascade entirely. One power stage replaces four separate units, removing cascaded losses, reducing BOM by 30\u201350%, and enabling sub-millisecond mode transitions.",
          "Power Flow Optimisation Controller",
          "Embedded DSP continuously monitors all source conditions, load demand, storage state, and grid signals \u2014 dynamically routing and balancing power flow in real time across all rails.",
          "<1ms response to source or load changes. MPPT for solar inputs. Load-sharing algorithm across stacked modules. Real-time efficiency optimisation selecting the optimal conversion path for current conditions.",
          "IoT Telemetry & Management",
          "Real-time power flow data, efficiency metrics, module health, and predictive fault indicators accessible via Modbus, CAN bus, MQTT, and REST API.",
          "Compatible with industrial SCADA, cloud energy management platforms, DCIM systems, and EV charging network management. Native integration without external gateway hardware."
        ]
      },
      {
        "title": "2.3  Multi-Mode Versatility vs. IP-01 and IP-02",
        "content": [
          "KEY INSIGHT",
          "IP-01 (Smart Hybrid SMPS) addresses the efficiency mandate: one hybrid stage delivering AC and DC rails. IP-02 (Integrated CCU) addresses the availability mandate: CCU intelligence ensuring 99.999% uptime for telecom. IP-03 (Versa Module Converter) addresses the versatility mandate: a single topology-agnostic modular platform replacing the entire multi-converter chain in complex hybrid energy systems. The three IPs are architecturally complementary and together represent a USD 138.1 billion combined TAM across 15 sectors."
        ]
      }
    ],
    "totalParagraphs": 982
  },
  {
    "id": "ip-04",
    "code": "SIPAIR IP-04",
    "title": "Smart Logical Control & Display Stations",
    "subtitle": "SMPS-Based Integrated SMART-LCDs for Real-Time Field Telemetry & Visual Diagnostics",
    "category": "HMI & Control Stations",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-04 \u2014 SMART-LCDs Architecture, Filed 2025",
    "sectors": [
      "Field Sub-Stations",
      "Industrial Operator Consoles",
      "Smart Grid Telemetry"
    ],
    "file": "SIPAIR_IP04_SmartLCDs_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SMART-LCDs architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-04 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-04: Smart Logical Control & Display Stations",
          "SMPS-Based Integrated SMART-LCDs for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-04 \u2014 Smart Logical Control & Display Stations Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data27",
        "content": [
          "CAGR Comparison \u2014 IP-04 Target Market Segments28"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary49",
        "content": [
          "The Context52",
          "The SMART-LCD Integration Solution53",
          "The Context54",
          "The SMART-LCD Integration Solution55",
          "The Context56",
          "The SMART-LCD Integration Solution57",
          "The Context59",
          "The SMART-LCD Integration Solution60",
          "The Observation That Started IP-0462",
          "Three Engineering Challenges63",
          "Three Ways to Engage66",
          "Model A \u2014 Research Fellowship66",
          "Model B \u2014 OEM Co-Development Partnership67",
          "Model C \u2014 Technology Licensing67",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Industrial facilities, energy substations, smart buildings, defence command centres, and hospital operating theatres share a common architectural problem: their operator interfaces are dumb. A conventional HMI panel displays data from a PLC. The PLC makes decisions. The SCADA server stores and analyses. The edge analytics module processes. Each is a separate device, connected by integration middleware that introduces latency, failure points, and engineering complexity. The operator, sitting at the interface, is the last element in a chain of separate hardware components \u2014 reading data that travelled from field device to PLC to SCADA to display, then issuing commands that will travel back down the same chain. In complex environments with hundreds of parameters and alarm states, this architecture creates cognitive load, response delay, and operational risk.",
          "The market has been aware of this problem for a decade. The Industry 4.0 movement has spent billions on IIoT connectivity, edge computing, and AI analytics \u2014 and yet the operator interface layer has largely remained a passive display terminal bolted onto an external controller. The opportunity is precisely at that interface: to embed the intelligence \u2014 the logical control, the AI-assisted guidance, the multi-protocol integration \u2014 directly into the station where the operator sits."
        ]
      },
      {
        "title": "1.2  The Problem S",
        "content": [
          "Figure 1.1 \u2014 Conventional HMI+PLC+Analytics cascade (left) versus SMART-LCD unified station (right). Three separate hardware units become one; integration latency is eliminated; the operator's command reaches field execution 5\u201320x faster.",
          "STRATEGIC NOTE",
          "SMART-LCDs eliminate the architectural separation between display, control, and intelligence. A single ruggedised station integrates high-resolution multi-touch visualisation, IEC 61131-3 embedded PLC logic execution, and AI-assisted operator guidance \u2014 reducing BOM by 30\u201340%, cutting installation time by 25%, and enabling direct control execution at the operator interface without routing through external PLCs or SCADA servers."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$38.5B",
          "2025 Baseline \u00b7 5 Sectors",
          "HIGHEST-GROWTH SECTOR",
          "Smart Buildings CAGR 2025\u20132030",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "SMART-LCD Filed",
          "Embedded Control & Display Patent",
          "Figure 1.2 \u2014 IP-04 TAM breakdown (left): Smart Buildings is the largest sector at $12.0B and the fastest-growing at 13.4% CAGR. Industrial Automation is the fastest path to near-term revenue with 6\u201318 month time-to-revenue."
        ]
      },
      {
        "title": "1.4  Why SMART-LCDs, Why Now",
        "content": [
          "Four market forces converge precisely at this moment. The Industry 4.0 HMI upgrade cycle is at its early exponential phase \u2014 52% of industrial facilities globally are in active legacy panel replacement programmes, with replacement decisions being made today for control hardware that will be in service for the next 10\u201315 years. The OT cybersecurity mandate is accelerating: IEC 62443 compliance is now mandatory or strongly recommended in energy, water, and critical manufacturing \u2014 and conventional HMI panels cannot meet it without the embedded security architecture that SMART-LCDs provide natively. The smart building market is growing at 13.4% CAGR, the fastest of any sector in this TAM, with Schneider Electric\u2019s February 2025 launch of AI-powered SpaceLogic Touchscreen Room Controllers validating commercial demand for exactly the intelligent display-control platform that SMART-LCDs deliver. And AI-assisted operator interfaces are being actively introduced by Rockwell Automation and Emerson as of late 2025 \u2014 confirming that the market is already moving toward the architecture SMART-LCDs represent.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab IP portfolio: IP-01 ($68.7B) + IP-02 ($27.1B) + IP-03 ($42.3B) + IP-04 ($38.5B) = USD 176.6 Billion total TAM across 20 sectors and 40 applications. IP-04 is the fourth pillar of a comprehensive technology platform spanning power conversion, control intelligence, and operator interface layers.",
          "TECHNOLOGY OVERVIEW",
          "Architecture \u00b7 Three Integrated Layers \u00b7 AI Intelligence \u00b7 Cybersecurity \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is a SMART-LCD?",
        "content": [
          "A Smart Logical Control & Display Station is an integrated operator interface platform that combines three technology layers in one ruggedised unit: a high-resolution multi-touch display with adaptive visualisation, an embedded logical control engine capable of executing IEC 61131-3 PLC logic independently, and a smart intelligence layer providing AI-assisted operator guidance, anomaly detection, and predictive alert management. In standard industrial deployments, these three functions are distributed across separate hardware \u2014 a display panel, a PLC or DCS controller, and an edge analytics module \u2014 with integration complexity and communication latency between them. SMART-LCDs consolidate all three into a single station, reducing hardware cost, installation footprint, communication latency, and single-point-of-failure risk.",
          "The distinction from conventional HMI panels is architectural, not incremental. Standard HMI panels are display terminals: they visualise data from connected PLCs and SCADA systems but have no independent control intelligence. SMART-LCDs are control stations: they visualise, decide, execute, and communicate autonomously within their domain. This positions SMART-LCDs as a next-generation platform that simultaneously upgrades both the HMI market and the edge PLC market."
        ]
      },
      {
        "title": "2.2  The Three Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-04",
          "High-Resolution Adaptive Display",
          "Multi-touch capacitive display (10\u201327 inch), industrial/medical-grade, anti-glare, brightness up to 1500 nits. Display layout, alarm hierarchy, and visualisation mode auto-reconfigure based on process state.",
          "Adaptive display intelligence: presentation of contextually relevant information during normal operation, alarm states, and emergency conditions reduces operator cognitive load and error rate in complex environments.",
          "Embedded Logical Control Engine",
          "IEC 61131-3 compliant logic execution within the display station. Supports Ladder Diagram, Function Block Diagram, and Structured Text. Executes safety interlocks, alarm sequences, and control outputs directly.",
          "Eliminates the separate external PLC for standard control applications. Reduces cabinet BOM by 30\u201340%, cuts wiring complexity, and provides sub-10ms command execution directly at the operator interface.",
          "AI-Assisted Operator Intelligence",
          "Embedded machine learning module: real-time anomaly detection, predictive maintenance alerts, operator guidance prompts, and adaptive alarm prioritisation. Processes sensor data locally via onboard edge compute.",
          "AI guidance directly at the operator interface \u2014 not accessed via a separate analytics server. Sub-second alert generation, contextual operator prompts, and predictive maintenance flagging without cloud dependency.",
          "Multi-Protocol Integration Hub",
          "Native OPC-UA, Modbus TCP/RTU, PROFINET, EtherCAT, BACnet, KNX, MQTT, REST API, IEC 61850 GOOSE/MMS, SunSpec Modbus. Direct connection to field devices, PLCs, SCADA, cloud platforms.",
          "Single station connects to all field device types across all five target sectors without additional middleware, gateways, or protocol converters. Integration cost and failure points reduced to zero additional hardware."
        ]
      },
      {
        "title": "2.3  AI Intelligence Layer \u2014 Operator Guidance at the Interface",
        "content": [
          "The AI intelligence layer in IP-04 is the differentiator that moves SMART-LCDs beyond the category of intelligent HMI panels into the category of decision-support control stations. The embedded ML module operates on real-time process data continuously \u2014 building a baseline model of normal process behaviour for each installation, detecting deviations from that baseline, and generating operator guidance prompts that appear directly on the display. These prompts are contextually positioned: during an alarm state, the SMART-LCD displays not just the alarm but the recommended operator action, the historical context for similar events, and the predicted impact of each available response option.",
          "Figure 2.2 \u2014 AI intelligence processing flow (left): sub-second anomaly detection and operator guidance generation from real-time sensor data. Adaptive display state reconfiguration (right): the display automatically reorganises based on process state, presenting operators with exactly the information they need at each operational moment."
        ]
      }
    ],
    "totalParagraphs": 981
  },
  {
    "id": "ip-05",
    "code": "SIPAIR IP-05",
    "title": "Smart Hybrid CCU",
    "subtitle": "Intelligent Central Control Unit with Dynamic Renewable/Grid Energy Arbitration",
    "category": "Hybrid Power Control",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-05 \u2014 Smart Hybrid CCU Architecture, Filed 2025",
    "sectors": [
      "Renewable Microgrids",
      "EV Charging Hubs",
      "Off-Grid Remote Installations"
    ],
    "file": "SIPAIR_IP05_SmartHybridCCU_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated Smart Hybrid CCU architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-05 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-05: Smart Hybrid CCU",
          "SMPS-Based Integrated Smart Hybrid CCU for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-05 \u2014 Smart Hybrid CCU Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data27",
        "content": [
          "CAGR Comparison \u2014 IP-05 Target Market Segments28"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary51",
        "content": [
          "The Context54",
          "The Smart Hybrid CCU Integration Solution54",
          "The Context56",
          "The Smart Hybrid CCU Integration Solution57",
          "The Context59",
          "The Smart Hybrid CCU Carbon Programme Solution60",
          "The Context61",
          "The Smart Hybrid CCU Integration Solution62",
          "The OPEX Observation63",
          "Three Engineering Challenges64",
          "Three Ways to Engage67",
          "Model A \u2014 Research Fellowship67",
          "Model B \u2014 OEM Co-Development Partnership68",
          "Model C \u2014 EaaS Platform Licensing68",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Diesel fuel and generator maintenance account for up to 70% of site OPEX in remote telecom deployments. China\u2019s 5G network alone costs an estimated 76.3 billion yuan annually in electricity (Acrel, 2024). A single 5G base station consumes 3.5\u20134 kW \u2014 nearly three times the power of a 4G equivalent \u2014 and the global 5G rollout is multiplying this energy burden across hundreds of thousands of sites simultaneously. For tower companies managing estates of 50,000 to 700,000 sites, energy has moved from a background operating cost to the single largest controllable variable in their entire P&L.",
          "The conventional response \u2014 basic rectifier controllers with simple battery float charging and rule-based generator start/stop logic \u2014 was designed for a world of single-source grid-powered 4G sites. It is architecturally incapable of optimising across five co-present energy sources (grid, solar, battery, diesel generator, and wind), adapting to weather forecasts and tariff schedules, managing per-tenant energy attribution, or generating the verified carbon accounting data that net-zero commitments now require. The telecom tower industry has reached an energy intelligence inflection point. The question is no longer whether AI-driven hybrid energy orchestration is necessary \u2014 it is which platform will define the standard."
        ]
      },
      {
        "title": "1.2  The Problem IP-05 Solves",
        "content": [
          "Figure 1.1 \u2014 Rule-based controller (left) versus Smart Hybrid CCU AI dispatch (right). The AI orchestration layer delivers 20\u201330% diesel reduction and up to 40% total site OPEX reduction \u2014 a validated, quantifiable ROI that drives divisional-level procurement approval without requiring corporate capex sign-off.",
          "STRATEGIC NOTE",
          "IP-05 is the energy intelligence layer for telecom infrastructure. The Smart Hybrid CCU is a purpose-built AI-driven orchestration platform that simultaneously manages grid, solar, battery, generator, and wind inputs \u2014 delivering 20\u201330% diesel savings, up to 30% CO\u2082 reduction, and up to 40% total OPEX reduction. These are not projections: they are validated outcomes from tower company deployments documented by TowerXChange, Cyient, and ZTE in 2024\u20132025."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$14.8B",
          "2025 Baseline \u00b7 5 Telecom Verticals",
          "HIGHEST-GROWTH VERTICAL",
          "Green Tower & Net-Zero CAGR 2025\u20132035",
          "VERTICALS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "HybridCCU Filed",
          "AI Orchestration Patent",
          "Figure 1.2 \u2014 IP-05 TAM by telecom vertical (left): MNO/TowerCo 5G is the largest at $5.1B and fastest near-term revenue pathway; Green Tower & Net-Zero is the fastest-growing at 13.6% CAGR. Diesel reduction benchmark (right): validated 20\u201330% reduction from AI dispatch versus rule-based controllers."
        ]
      },
      {
        "title": "1.4  Why IP-05, Why Now",
        "content": [
          "Three forces are converging at precisely the right moment. First, the 5G power cost surge has elevated energy from a managed overhead to the top agenda item at every major tower company and MNO board meeting: 5G consumes 3x the energy of 4G, and the industry is simultaneously rolling out 5G while committing to net-zero targets. The contradiction is only resolvable with intelligent energy management at scale. Second, the AI hybrid controller market is validated but not yet consolidated: ZTE installed 22,000 hybrid units in APAC in 2025; Siemens launched MHES with AI controls in March 2025; Schneider Electric partnered with CrossBoundary Energy for African tower microgrids in February 2025. These are commercial confirmations, not pilots. Third, the carbon market opportunity is maturing: ISO 14064-compliant carbon accounting from diesel displacement is now a certified revenue stream through carbon credit aggregators, and tower companies with net-zero commitments represent a systematic, multi-year procurement programme \u2014 not a one-time capex decision.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab IP portfolio: IP-01 $68.7B + IP-02 $27.1B + IP-03 $42.3B + IP-04 $38.5B + IP-05 $14.8B = USD 191.4 Billion total TAM across 25 sectors and 50 applications. IP-05 adds the telecom energy intelligence layer \u2014 the AI orchestration platform that manages and optimises the energy inputs to the power conversion and control systems of IP-01, IP-02, and IP-03.",
          "TECHNOLOGY OVERVIEW",
          "AI Dispatch Architecture \u00b7 Five Energy Sources \u00b7 Predictive Intelligence \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is the Smart Hybrid CCU?",
        "content": [
          "The Smart Hybrid CCU is a purpose-built telecom energy management and orchestration platform. It sits at the intersection of the energy sources (solar PV, battery bank, diesel generator, grid connection, wind turbine) and the telecom load (base station radio units, baseband equipment, site ancillaries) \u2014 continuously monitoring all inputs, all outputs, and all storage states, and dynamically deciding in real-time which source powers the site at each moment. This is not a basic rectifier controller performing simple battery float charging: it is an AI-driven dispatch engine that simultaneously knows the weather forecast for the site, the battery\u2019s state of health, the diesel fuel level, the grid tariff schedule, and the operator\u2019s carbon budget \u2014 and uses all of this to make the lowest-cost, highest-availability source dispatch decision continuously.",
          "The distinction from IP-02 is architectural and commercial. IP-02 (SMPS-Based Integrated CCU) provides the power delivery hardware \u2014 converting and delivering AC and DC power reliably with sub-millisecond failover. IP-05 (Smart Hybrid CCU) provides the energy intelligence layer above it: the orchestration platform that decides which energy source feeds the power delivery system, and continuously optimises that decision for cost, carbon, and availability. IP-05 can operate as a standalone orchestration controller interfacing with existing site power hardware, or as the intelligence layer of a complete system that includes IP-02 for power delivery."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-05",
          "Multi-Source Input Monitor",
          "Simultaneously monitors grid AC voltage and quality, solar DC array output (MPPT-tracked), battery state of charge and health, diesel fuel level and generator status, wind turbine AC output.",
          "First-principles real-time visibility of all five energy sources simultaneously. No external monitoring hardware. All source parameters available to the AI dispatch engine within a single control cycle.",
          "AI Source Dispatch Engine",
          "Embedded machine learning dispatch algorithm continuously optimises source selection: grid \u2192 solar \u2192 battery \u2192 generator priority sequence, modified in real time by predictive inputs (weather forecasts, tariff schedules, load profiles).",
          "The patent-bearing element. Source dispatch decisions are made predictively \u2014 pre-charging batteries before peak tariff periods, anticipating solar generation from weather forecasts, scheduling generator starts before battery deep discharge \u2014 not reactively after source failure.",
          "Energy Cost & Carbon Controller",
          "Real-time tariff arbitrage: dispatches stored energy during peak tariff periods, recharges from grid during off-peak. Tracks carbon intensity of each source per kWh. Generates ISO 14064-compliant carbon accounting data and GSMA Green Power for Mobile metrics.",
          "Turns the tower site into a financially optimised energy node. Carbon certificate generation from diesel displacement creates a certified revenue stream that directly funds the IP-05 deployment cost in many markets.",
          "TMS Integration & Remote Management",
          "Native SNMP, Modbus TCP, and REST API integration to Tower Management System NOC platforms. Reports energy KPIs, alarm states, fuel levels, battery health, generator runtime, carbon performance, and per-tenant energy attribution in real time.",
          "Full remote commissioning capability eliminates truck rolls for initial setup. OTA firmware updates deploy algorithm improvements to the entire tower estate without site visits \u2014 directly reducing OPEX at scale."
        ]
      },
      {
        "title": "2.3  AI Dispatch Engine \u2014 Predictive vs. Reactive Control",
        "content": [
          "The commercial value of IP-05 is concentrated in the AI Dispatch Engine and the distinction between predictive and reactive source management. A rule-based controller responds to what has already happened: the battery is below threshold, therefore start the generator. The Smart Hybrid CCU anticipates what is about to happen: the weather forecast shows 4 hours of cloud cover starting in 90 minutes, therefore pre-charge the battery to 95% now using grid or the remaining solar window, so that the generator start can be delayed or avoided entirely. This predictive approach is what delivers the 20\u201330% diesel reduction that reactive controllers cannot achieve.",
          "Figure 2.2 \u2014 AI dispatch decision tree (left): predictive source selection using weather forecasts and tariff schedules versus reactive rule-based triggers. Multi-source energy flow (right): five source inputs managed by the AI dispatch engine, with carbon intensity tracking per source per kWh."
        ]
      }
    ],
    "totalParagraphs": 958
  },
  {
    "id": "ip-06",
    "code": "SIPAIR IP-06",
    "title": "Swarna Li Lithium Energy Storage",
    "subtitle": "Integrated Lithium-Ion / LFP Energy Storage Architecture with Active Cell Balancing BMS",
    "category": "Energy Storage & BESS",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-06 \u2014 Swarna Li Energy Storage Architecture, Filed 2025",
    "sectors": [
      "Grid-Scale BESS",
      "Second-Life Battery Packs",
      "High-Cycle Stationary Storage"
    ],
    "file": "SIPAIR_IP06_SwarnaLi_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated Swarna Li architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-06 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "AbstractAbstract",
          "Abstract",
          "Abstract",
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-06: Swarna Li",
          "SMPS-Based Integrated Swarna Li for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-06 \u2014 Swarna Li Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data27",
        "content": [
          "CAGR Comparison \u2014 Swarna Li Target Market Segments27"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary51",
        "content": [
          "The Context54",
          "The Swarna Li Integration Solution54",
          "The Context56",
          "The Swarna Li Integration Solution57",
          "The Context58",
          "The Swarna Li Integration Solution59",
          "The Context60",
          "The Swarna Li Integration Solution61",
          "The Battery Observation62",
          "Three Engineering Challenges63",
          "Three Ways to Engage66",
          "Model A \u2014 Research Fellowship66",
          "Model B \u2014 OEM Co-Development Partnership67",
          "Model C \u2014 BaaS Platform Licensing67",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "The global lithium battery market is undergoing a structural bifurcation. On one side: commodity lithium cells, where LFP costs dipped below USD 100/kWh in 2024 and Chinese manufacturers are competing on volume and price in a race to the bottom. On the other side: intelligent lithium energy assets \u2014 battery platforms that monitor themselves, predict their own remaining useful life, optimise their charge cycles, communicate their health in real time, and underpin subscription-model Battery-as-a-Service commercial frameworks. The commodity market is contracting in value. The intelligent asset market is expanding at 16.4\u201326.03% CAGR. The entire strategic question for a lithium battery IP is on which side of this bifurcation to compete.",
          "Swarna Li competes entirely on the intelligent asset side. The name (Sanskrit: Swarna = Gold) reflects the premium positioning: not a commodity cell, but a premium intelligent energy platform that commands premium pricing, generates recurring software revenue alongside hardware sales, and creates durable customer relationships through health monitoring, predictive maintenance, and BaaS data services that commodity suppliers cannot replicate."
        ]
      },
      {
        "title": "1.2  The Problem Swarna Li Solves",
        "content": [
          "Figure 1.1 \u2014 Commodity lithium cell (left) versus Swarna Li intelligent energy asset (right). The intelligence layer is what commands premium pricing, generates recurring revenue, and creates the durable competitive moat that commodity suppliers cannot replicate.",
          "STRATEGIC NOTE",
          "Swarna Li is not a battery. It is an intelligent energy asset platform. The difference is commercially consequential: commodity batteries are single-transaction hardware sales competed on price. Swarna Li intelligent assets generate hardware revenue plus recurring BaaS subscription revenue plus warranty analytics plus second-life assessment data \u2014 creating a multi-stream, customer-sticky revenue model across every sector it serves."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$53.8B",
          "2025 Baseline \u00b7 5 Sectors \u00b7 Largest IP-06 TAM",
          "HIGHEST-GROWTH SECTOR",
          "26.03%",
          "Battery Energy Storage CAGR 2025\u20132035",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "Swarna Li Filed",
          "Smart Lithium BMS & AI Patent",
          "Figure 1.2 \u2014 Swarna Li TAM breakdown (left): Renewable Energy & BESS is the largest sector at $12.4B and the fastest-growing at 26.03% CAGR. AI BMS benchmark (right): Swarna Li delivers \u00b11% SoC accuracy and 18% failure rate reduction versus conventional BMS \u2014 validated commercial outcomes."
        ]
      },
      {
        "title": "1.4  Why Swarna Li, Why Now",
        "content": [
          "Three forces are creating an exceptional commercialisation window. First, LFP cost parity has arrived: at below USD 100/kWh, lithium is now cost-competitive with lead-acid across the full spectrum of stationary, industrial, and consumer applications \u2014 unleashing the replacement cycle across 600,000+ telecom towers, 1.5 million lead-acid forklifts, and tens of millions of residential solar installations that were previously price-locked from lithium adoption. Second, regulatory mandates are creating a structural requirement for Swarna Li\u2019s intelligence layer: the EU Battery Regulation 2023 mandates a digital battery passport for EV and industrial batteries from 2027, requiring documented SoH, charge history, and second-life assessment data. Only Swarna Li\u2019s embedded smart BMS and cloud data platform fulfil this requirement natively. Third, India\u2019s battery demand is projected to jump 48% by 2030, with PLI Advanced Chemistry Cell, FAME III, and PM Surya Ghar creating domestic procurement demand directly aligned with every sector Swarna Li serves.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 $68.7B + IP-02 $27.1B + IP-03 $42.3B + IP-04 $38.5B + IP-05 $14.8B + IP-06 $53.8B = USD 245.2 Billion total TAM across 30 sectors and 60 applications. IP-06 is the largest single-IP TAM in the portfolio \u2014 and uniquely addresses both the hardware storage layer and the recurring software intelligence layer simultaneously.",
          "TECHNOLOGY OVERVIEW",
          "Dual Chemistry Platform \u00b7 Smart BMS \u00b7 AI Diagnostics \u00b7 Cloud Connectivity \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is Swarna Li?",
        "content": [
          "Swarna Li is a premium intelligent lithium battery solution that integrates four tightly coupled technology layers into one certified energy asset platform. The first layer is application-optimised lithium cell chemistry: Lithium Iron Phosphate (LFP) for safety-critical, long-cycle applications where thermal stability, 3,000\u20135,000 cycle life, and total cost of ownership are the primary criteria, and Lithium Nickel Manganese Cobalt Oxide (NMC) for high-energy-density applications where maximum range or power density is the design driver. The second layer is an embedded Smart BMS providing cell-level monitoring of voltage, temperature, current, and impedance with active balancing and comprehensive protection logic. The third layer is an AI Diagnostics Engine running on the embedded BMS processor, providing Remaining Useful Life prediction, anomaly detection, thermal runaway precursor identification, and adaptive charge optimisation. The fourth layer is a Cloud Connectivity platform enabling fleet-level health monitoring, predictive maintenance scheduling, warranty analytics, and EU Battery Passport data generation.",
          "The commercial distinction from commodity lithium suppliers is not the cell chemistry \u2014 it is the intelligence stack. LFP and NMC cells are available from dozens of manufacturers at commodity pricing. The Swarna Li smart BMS, AI diagnostics engine, and cloud connectivity layer transform those cells into a certified intelligent energy asset that generates recurring software revenue, fulfils regulatory requirements (EU Battery Regulation 2023), and enables Battery-as-a-Service commercial models that commodity cell suppliers cannot support."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-06",
          "Application-Optimised Cell Chemistry",
          "LFP (3,000\u20135,000+ cycle life, thermal stability, inherently safe) for stationary/industrial; NMC (higher energy density, 300\u2013800 Wh/kg) for EV/performance applications.",
          "Dual-chemistry platform under single IP framework with shared BMS architecture. Single platform addresses the full spectrum of lithium market applications without separate product lines or separate IP protection.",
          "Embedded Smart BMS",
          "Cell-level monitoring of voltage, temperature, current, and impedance. Active cell balancing (<1% energy loss). SoC and SoH estimation. Protection logic: overcharge, over-discharge, short circuit, thermal runaway.",
          "Active (not passive/resistive) cell balancing extends pack life 20\u201330% versus passive BMS designs. \u00b11% SoC accuracy (versus \u00b15% for conventional BMS) is the commercial differentiator for EV range estimation and BaaS billing accuracy.",
          "AI Diagnostics Engine",
          "ML models on embedded BMS processor: Remaining Useful Life (RUL) prediction, anomaly detection (cell degradation, impedance drift), thermal runaway precursor identification 15\u201330 minutes before onset, adaptive charge/discharge optimisation.",
          "Thermal runaway precursor detection at 15\u201330 minutes advance warning is the life-safety differentiator in telecom, medical, and EV applications. RUL prediction >95% accuracy enables predictive replacement scheduling and BaaS contract risk management.",
          "Cloud Connectivity Layer",
          "MQTT/REST API telemetry: fleet health monitoring dashboard, predictive maintenance scheduling, warranty analytics, EU Battery Passport data generation, second-life battery assessment, BaaS contract performance data.",
          "EU Battery Regulation 2023 compliance data generation natively embedded \u2014 no retrofit required. BaaS commercial model enablement: per-kWh billing accuracy and health-based contract risk management from the same data platform."
        ]
      },
      {
        "title": "2.3  AI Diagnostics Engine \u2014 The Commercial Intelligence Layer",
        "content": [
          "The AI Diagnostics Engine is the most commercially significant layer of Swarna Li because it is the hardest to replicate and the most directly valuable to buyers. The engine runs three independent ML models simultaneously on the embedded BMS processor. The Remaining Useful Life model continuously tracks capacity fade against an electrochemical degradation model calibrated for the specific chemistry and operating conditions of each pack, predicting the cycle number at which capacity will reach the end-of-life threshold (typically 80% of rated capacity) with >95% accuracy at the 80% SoH threshold. The Anomaly Detection model monitors impedance spectra and temperature gradients, identifying cells exhibiting degradation patterns that precede failure \u2014 enabling targeted cell replacement rather than full pack replacement in modular applications. The Thermal Runaway Precursor model provides 15\u201330 minutes advance warning of conditions approaching thermal runaway \u2014 the safety-critical capability that enables Swarna Li to serve telecom, medical, and EV applications where battery fires are unacceptable.",
          "Figure 2.2 \u2014 AI SoH prediction engine flow (left): three simultaneous ML models delivering RUL, anomaly detection, and thermal runaway precursor. Chemistry routing (right): LFP for long-life safety-critical applications; NMC for maximum energy density where range is the design driver."
        ]
      }
    ],
    "totalParagraphs": 970
  },
  {
    "id": "ip-07",
    "code": "SIPAIR IP-07",
    "title": "SAMARAT Autonomous Rectifier",
    "subtitle": "Smart Modular Autonomous Rectifier & Automated Telemetry with High-Power Density",
    "category": "Modular Rectifiers",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-07 \u2014 SAMARAT Architecture, Filed 2025",
    "sectors": [
      "Sub-Station DC Power",
      "Heavy Industrial Drives",
      "Centralized Rectifier Bays"
    ],
    "file": "SIPAIR_IP07_SAMARAT_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SAMARAT architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-07 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "Abstract",
          "Abstract",
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-07: SAMARAT",
          "SMPS-Based Integrated SAMARAT for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-07 \u2014 SAMARAT Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data28",
        "content": [
          "CAGR Comparison \u2014 SAMARAT Target Market Segments28"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary53",
        "content": [
          "The Context56",
          "The SAMARAT Integration Solution57",
          "The Context58",
          "The SAMARAT Integration Solution59",
          "The Context60",
          "The SAMARAT Integration Solution61",
          "The Context62",
          "The SAMARAT Integration Solution63",
          "The Pattern That Defined SAMARAT64",
          "Three Engineering Challenges65",
          "Three Ways to Engage68",
          "Model A \u2014 Research Fellowship68",
          "Model B \u2014 Platform Licensing to System Integrators69",
          "Model C \u2014 Direct Operator Deployment69",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Three of the most strategically critical infrastructure domains in emerging and developed economies share a common, escalating operational problem: they are each managing an increasingly vast number of distributed physical assets \u2014 factory machines, rural sensor networks, telecom tower sites \u2014 with workforces that are simultaneously growing more expensive, harder to recruit, and less able to scale at the speed the assets are being deployed. Smart manufacturing facilities are adding machines faster than they can hire engineers to manage them. Rural digital infrastructure is being built at a pace that outstrips the availability of qualified maintenance technicians in remote areas. 5G networks are adding cells faster than any human optimisation team can configure them. In every case, the answer is the same: the intelligence that manages these assets must be embedded in software, not in headcount.",
          "SAMARAT (Sanskrit: Samarat = Emperor) is that intelligence. A unified AI-driven autonomous operations platform that functions as the commanding intelligence layer across three infrastructure domains simultaneously \u2014 making real-time operational decisions and executing them autonomously within defined parameters, 24/7, at machine speed, without waiting for human review. The platform\u2019s name reflects its positioning: a sovereign, autonomous intelligence that commands complex distributed operations with the authority and precision that only software can provide at scale."
        ]
      },
      {
        "title": "1.2  The Problem SAMARAT Solves",
        "content": [
          "Figure 1.1 \u2014 Siloed manual operations (left) versus SAMARAT unified autonomous platform (right). Three separate management stacks collapse into one AI engine; human operator dependency reduces 40\u201360%; cross-domain intelligence enables insights unavailable in any single-domain system.",
          "STRATEGIC NOTE",
          "SAMARAT is not a monitoring dashboard. It is an autonomous operations engine. The distinction is commercially consequential: monitoring dashboards present data to human operators who then decide and act. SAMARAT decides and acts autonomously within defined authority parameters \u2014 at machine speed, 24/7, without requiring human attention for routine operational events. Human operators are engaged only for exceptions that exceed the autonomous authority envelope."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$46.2B",
          "2025 Baseline \u00b7 5 Sectors \u00b7 Three Domains",
          "HIGHEST-GROWTH VERTICAL",
          "Smart Machines / AI Automation CAGR 2025\u20132033",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "SAMARAT Filed",
          "AI Autonomous Operations Patent",
          "Figure 1.2 \u2014 SAMARAT TAM by sector (left): Smart Manufacturing is the largest at $20.3B and fastest-growing; Rural IoT and Industrial Asset Management each at $10.0B. Autonomous operations benchmark (right): SAMARAT delivers millisecond-scale autonomous response vs. hours for manual operations \u2014 a 40\u201360% operator dependency reduction validated by industry deployments."
        ]
      },
      {
        "title": "1.4  Why SAMARAT, Why Now",
        "content": [
          "Three irreversible structural forces define the SAMARAT commercialisation window. Autonomous manufacturing has reached a commercial inflection point: Siemens introduced AI agents for industrial automation at Automate 2025 in Detroit, ABB launched AI-optimised industrial robots in June 2025, and the smart manufacturing market is growing at 15.9% CAGR \u2014 a market now actively procuring autonomous operations platforms, not evaluating them. India\u2019s digital infrastructure buildout is creating the world\u2019s largest single-country opportunity: the India IoT market at USD 58.65 billion with 19.6% CAGR, BharatNet connecting 250,000+ gram panchayats, and Smart Cities Mission investment exceeding USD 17 billion \u2014 all requiring autonomous management platforms at a scale no human workforce can deliver. And 5G network complexity has made autonomous network management a necessity: 5G cells are too dense, too numerous, and too interdependent for manual optimisation at scale. Ericsson SON is deployed across 35+ operators globally \u2014 the market has confirmed autonomous telecom operations as a standard, not a premium.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 $68.7B + IP-02 $27.1B + IP-03 $42.3B + IP-04 $38.5B + IP-05 $14.8B + IP-06 $53.8B + IP-07 $46.2B = USD 291.4 Billion total TAM across 35 sectors and 70 applications. SAMARAT adds the autonomous operations intelligence layer \u2014 the AI command platform that manages the infrastructure powered by IP-01\u2013IP-06 and controlled by IP-04.",
          "TECHNOLOGY OVERVIEW",
          "Autonomous Engine \u00b7 Digital Twin \u00b7 Data Fabric \u00b7 Three-Domain Architecture \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is SAMARAT?",
        "content": [
          "SAMARAT is a unified AI-driven autonomous operations platform that functions as the intelligence command layer across three infrastructure domains: Smart Autonomous Manufacturing, Rural Digital Infrastructure and Precision Agriculture, and Telecom Network Operations. The platform builds on the insight that these three domains share the same fundamental operational challenge \u2014 managing large numbers of distributed physical assets at scale with limited human supervision \u2014 and that the AI models, data pipeline, digital twin framework, and autonomous operations engine that solve this problem in a factory are architecturally identical to those that solve it in a rural sensor network or a telecom tower estate. SAMARAT amortises the R&D investment across three markets while domain-specific AI modules provide the vertical differentiation required in each.",
          "The Autonomous Operations Engine is the core IP differentiator. Unlike conventional SCADA, MES, or network management platforms that present data to human operators for decision-making, SAMARAT executes operational decisions autonomously within defined authority envelopes: adjusting production parameters in real-time, rerouting rural sensor data through alternative connectivity paths, or triggering self-healing actions in telecom networks \u2014 all without human intervention, at machine speed, 24/7. Human operators remain in the loop for strategic decisions and exceptions that exceed the autonomous authority envelope, but are freed from the continuous manual monitoring burden that is the primary cost driver in all three domains."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-07",
          "Autonomous Operations Engine",
          "AI decision-making module that monitors all assets, detects anomalies, formulates response options, and executes the optimal response autonomously within defined authority levels \u2014 across all three domains simultaneously.",
          "Cross-domain autonomous execution is the patent-bearing element. A single AI engine managing factory quality control, rural irrigation, and telecom cell parameters simultaneously \u2014 sharing learned patterns across domains to improve performance in each.",
          "Digital Twin Management System",
          "Real-time virtual replicas of physical assets: manufacturing machine twins (predictive maintenance, process simulation), rural infrastructure twins (water/power/connectivity node state), telecom network twins (capacity, interference, fault prediction).",
          "The digital twin framework is the same architecture for all three domains \u2014 amortising the development cost while enabling domain-specific simulation models. A factory process twin and a rural water distribution twin share the same platform infrastructure.",
          "Unified Edge-to-Cloud Data Fabric",
          "Multi-protocol data pipeline connecting OT (PROFINET, EtherCAT, Modbus, IEC 61850), IT (REST API, MQTT, OPC-UA), and CT (NETCONF, YANG, gNMI for telecom) systems \u2014 seamless data flow from field sensors to enterprise analytics without custom integration.",
          "Single data fabric eliminates the custom integration projects that typically consume 40\u201360% of deployment budgets. OT+IT+CT protocols in one pipeline is the key commercial enabler for cross-domain intelligence.",
          "Domain-Specific AI Intelligence Modules",
          "Pre-trained AI models for each domain: manufacturing quality vision (<0.1% defect escape), agricultural crop health anomaly detection (soil, pest, yield), and telecom network anomaly detection (call drop prediction, interference mapping, SON+ optimisation).",
          "Domain AI modules are the commercial differentiation in each vertical. The same edge inference hardware runs different domain modules depending on deployment context \u2014 enabling rapid new domain expansion on the existing platform architecture."
        ]
      },
      {
        "title": "2.3  Autonomous Operations Engine \u2014 The Core IP Differentiator",
        "content": [
          "The Autonomous Operations Engine implements a closed-loop decision architecture: continuous monitoring of all connected assets feeds an anomaly detection layer, which feeds a multi-option response formulation layer, which feeds an autonomous execution layer operating within predefined authority parameters. The authority envelope is operator-configurable per deployment: in a pharmaceutical manufacturing facility, the engine might be authorised to autonomously adjust mixing speed within \u00b15% of setpoint but require human approval for changes beyond that threshold; in a rural irrigation system, it might be authorised to open any valve for up to 2 hours without approval. The authority envelope concept is the commercial enabler for adoption in safety-critical and regulated environments where full autonomy is not acceptable but human-speed response is operationally inadequate.",
          "Figure 2.2 \u2014 Autonomous operations decision loop (left): closed-loop from monitoring through detection, decision, and autonomous execution \u2014 with human escalation only for exceptions outside the authority envelope. Digital twin synchronisation (right): real-time physical-to-virtual mirroring enabling simulation and predictive optimisation across all three domains."
        ]
      }
    ],
    "totalParagraphs": 980
  },
  {
    "id": "ip-08",
    "code": "SIPAIR IP-08",
    "title": "SARALA Adaptive Antenna System",
    "subtitle": "Smart Adaptive RF Beamforming Array & Low-Loss Telecom Antenna Subsystem",
    "category": "RF & Antennas",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-08 \u2014 SARALA Antenna Architecture, Filed 2025",
    "sectors": [
      "5G Small Cells",
      "6G Terahertz Research",
      "Defence Radar & Secure RF Comms"
    ],
    "file": "SIPAIR_IP08_SARALAAntenna_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SARALA architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-08 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-08: SARALA",
          "SMPS-Based Integrated SARALA for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-08 \u2014 SARALA Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data27",
        "content": [
          "CAGR Comparison \u2014 SARALA Target Market Segments27"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary52",
        "content": [
          "The Context55",
          "The SARALA Integration Solution55",
          "The Context57",
          "The SARALA Integration Solution58",
          "The Context59",
          "The SARALA AI Beamforming Integration Solution60",
          "The Context61",
          "The SARALA ESA Terminal Integration Solution62",
          "The Gap That Started SARALA63",
          "Three Engineering Challenges64",
          "Three Ways to Engage67",
          "Model A \u2014 Research Fellowship67",
          "Model B \u2014 OEM Integration Partnership68",
          "Model C \u2014 Technology Licensing68",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "The global threat environment has undergone a structural shift. Weaponised drones have evolved from specialist military tools into accessible, cheap, and lethal threats deployed in conventional and unconventional conflicts. The Russia-Ukraine conflict demonstrated drone warfare at scale. Commercial DJI-class drones have been used against critical infrastructure, public events, and military assets on every continent. Every airport, military base, border post, nuclear facility, and major public event venue now needs a drone detection capability \u2014 and no meaningful proportion of the world\u2019s critical infrastructure has one yet. This threat has simultaneously created the world\u2019s fastest-growing detection market (Counter-UAS growing at 25\u201328.7% CAGR) and a global procurement urgency that is compressing the time between technology availability and procurement approval to months rather than years.",
          "The same antenna technology that detects drones is the physical layer foundation of 5G massive MIMO networks, LEO satellite terminals, border surveillance radars, naval multi-function systems, and smart city traffic detection. The phased array antenna with embedded AI processing \u2014 the SARALA architecture \u2014 is not a niche capability. It is the enabling technology platform for five independently large and growing markets simultaneously."
        ]
      },
      {
        "title": "1.2  The Problem SARALA Solves",
        "content": [
          "Figure 1.1 \u2014 Conventional passive antenna (left) versus SARALA embedded AI detection platform (right). The intelligence embedded within the antenna eliminates the separate radar processor, reduces detection latency by 3\u20136x, and enables standalone autonomous operation in forward-deployed or remote applications.",
          "STRATEGIC NOTE",
          "SARALA is not a radar system. It is an intelligent detection platform built on a radar antenna. The commercial distinction is decisive: radar systems detect signals. SARALA detects, classifies, tracks, and communicates threat assessments \u2014 autonomously, in real time, with <50ms latency, and without requiring a separate processing unit. The embedded AI is the IP; the antenna is the hardware it runs on."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$37.6B",
          "2025 Baseline \u00b7 5 Sectors \u00b7 10 Applications",
          "FASTEST-GROWING VERTICAL",
          "Drone Detection CAGR 2025\u20132029",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "SARALA Filed",
          "Embedded AI Signal Processing Patent",
          "Figure 1.2 \u2014 TAM breakdown (left): 5G & Smart Wireless is the largest sector at $12.5B; Counter-UAS is the fastest-growing at 25\u201328.7% CAGR. Detection benchmark (right): SARALA\u2019s embedded AI achieves 3\u20136x lower latency and >92% drone classification accuracy versus conventional radar systems."
        ]
      },
      {
        "title": "1.4  Why SARALA, Why Now",
        "content": [
          "Four convergent forces define the SARALA commercialisation window. Drone threat proliferation has created an existential procurement urgency: Anduril secured USD 642 million in USMC C-UAS contracts in March 2025; Raytheon\u2019s LTAMD received USAF production approval in April 2025; India MoD signed a INR 2,906 crore AESA radar contract in March 2025. These are not R&D announcements \u2014 they are active production procurements confirming the market has passed evaluation and entered sustained procurement. GaN (Gallium Nitride) semiconductor cost reductions of 40\u201360% are making AESA systems commercially viable across border security, smart city, and commercial wireless markets that were previously priced out. India\u2019s Atmanirbhar Bharat defence policy creates structural procurement preference for domestic IP that foreign radar manufacturers cannot access. And LEO satellite terminal demand from Amazon Kuiper\u2019s 3,000+ satellite deployment (April 2025) and Starlink\u2019s India licensing (June 2025) is creating hundreds of thousands of electronically steered flat-panel antenna procurement orders.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 through IP-07 = $291.4B + IP-08 $37.6B = USD 329.0 Billion total TAM across 40 sectors and 80 applications. SARALA adds the detection and sensing layer \u2014 the smart antenna intelligence that protects and enables the infrastructure built, powered, and managed by IP-01 through IP-07.",
          "TECHNOLOGY OVERVIEW",
          "AESA Platform \u00b7 Embedded AI Engine \u00b7 Multi-Sensor Fusion \u00b7 All-Domain Detection \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is SARALA Antenna?",
        "content": [
          "SARALA Antenna is an intelligent multi-mode detection platform built around a smart antenna array. The antenna hardware takes the form of a phased array (electronically steered, no mechanical rotation), AESA (Active Electronically Scanned Array with independent transmit/receive modules per element), or hybrid configuration combining radar, RF, and optical sensing elements within a single compact platform. The defining characteristic is the embedded AI intelligence layer: SARALA processes signals at the antenna level \u2014 identifying targets, classifying threat types, assessing engagement priority, and reporting to command-and-control systems \u2014 autonomously and in real time. This architecture is a fundamental departure from conventional antenna systems where raw signals are passed to a separate radar processor for analysis. By embedding the AI within the antenna platform, SARALA achieves lower latency (faster threat detection), reduced system complexity (fewer hardware units), improved reliability, and the ability to operate in standalone mode without external compute infrastructure."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-08",
          "AESA / Phased Array Hardware",
          "Active Electronically Scanned Array with independent T/R modules per element. Millisecond-speed electronic beam steering with no mechanical rotation. Multi-frequency and multi-mode operation from a single aperture.",
          "Electronic beam agility enabling simultaneous multi-target tracking across wide azimuth/elevation without mechanical rotation. Reduced RCS (low-observable deployment). No maintenance requirement vs. mechanically rotating radar.",
          "Embedded AI Signal Processing Engine",
          "Neural network inference co-located with antenna hardware. Target detection, classification, and tracking in real-time. <50ms detection-to-alert latency vs. 150\u2013300ms in remote-processing systems.",
          "The patent-bearing element. AI inference at antenna level eliminates the separate radar processor entirely. Autonomous target identification without external compute. Functional in standalone mode when communications are disrupted.",
          "Multi-Sensor Data Fusion Engine",
          "Simultaneously fuses radar returns, RF signal signatures, acoustic inputs, and electro-optical feeds through a unified fusion AI producing a single high-confidence target picture.",
          "Multi-sensor fusion at the antenna platform level. Single-sensor systems have 40\u201360% false alarm rates in clutter. Multi-sensor AI fusion reduces false alarms below 2% through cross-sensor confirmation of detections.",
          "Adaptive Clutter & LPI Management",
          "ML models dynamically adjust detection thresholds for sea clutter, ground clutter, and weather in real time. LPI transmission modes (frequency hopping, spread spectrum) reduce system detectability.",
          "Environmental adaptation eliminates the need for operator-defined clutter maps. LPI operation ensures SARALA cannot be located and targeted by adversary EW systems \u2014 a critical operational requirement in contested environments."
        ]
      },
      {
        "title": "2.3  Micro-Doppler AI Classification \u2014 The Discrimination Breakthrough",
        "content": [
          "The fundamental commercial challenge in drone detection is not detection sensitivity \u2014 any radar can detect a drone-sized object. The challenge is classification: distinguishing a drone from a bird, a bird from a balloon, a commercial DJI quadcopter from a fixed-wing surveillance UAV, and a benign agricultural drone from a weaponised delivery vehicle. False alarms that send security teams scrambling for every bird or plastic bag are as operationally damaging as missed detections. SARALA\u2019s micro-Doppler AI engine addresses this directly: by analysing the unique rotational signature of a drone\u2019s propellers in the Doppler frequency domain, combined with the structural resonance signature of its body and wing configuration, SARALA achieves >92% classification accuracy at ranges up to 10km for small UAS targets \u2014 with a false alarm rate below 2%.",
          "Figure 2.2 \u2014 Micro-Doppler AI classification (left): distinctive spectral signatures allow SARALA to discriminate drones from birds and other clutter with >92% accuracy \u2014 the false alarm problem that limits operational acceptance of conventional C-UAS detection systems. AESA beam agility (right): simultaneous multi-target tracking without mechanical rotation \u2014 <1ms beam repositioning vs. 1\u201310 seconds for mechanically scanned systems."
        ]
      }
    ],
    "totalParagraphs": 978
  },
  {
    "id": "ip-09",
    "code": "SIPAIR IP-09",
    "title": "SARALA Chip Indigenous Silicon",
    "subtitle": "Real-Time Power Management DSP Controller & Wide-Bandgap GaN/SiC Gate Driver ASIC",
    "category": "Semiconductors & ASICs",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-09 \u2014 SARALA Chip Architecture, Filed 2025",
    "sectors": [
      "Semiconductor Fabrication",
      "Automotive Traction Controllers",
      "High-Voltage DSPs"
    ],
    "file": "SIPAIR_IP09_SARALAChip_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SARALA architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-09 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-09: SARALA",
          "SMPS-Based Integrated SARALA for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-09 \u2014 SARALA Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data28",
        "content": [
          "CAGR Comparison \u2014 SARALA Chip Application Verticals29"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary52",
        "content": [
          "The Portfolio Integration Case55",
          "The SARALA Chip Radar DSP Design55",
          "The Rural IoT Edge AI Challenge57",
          "The SARALA Chip Edge AI Solution58",
          "The India Sovereign AI Silicon Opportunity59",
          "The ISM DLI-Funded Development Programme60",
          "The EV BMS Silicon Gap61",
          "EU Battery Passport 2027 Alignment62",
          "The Silicon Gap That Started SARALA Chip63",
          "Three Engineering Challenges64",
          "Three Ways to Engage67",
          "Model A \u2014 Research Fellowship67",
          "Model B \u2014 Co-Design & Co-Tape-Out68",
          "Model C \u2014 IP Licensing & Supply68",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Every layer of intelligence in the SMPS Tech Lab portfolio \u2014 the embedded AI in SARALA Antenna\u2019s detection engine, the autonomous operations edge nodes in SAMARAT, the smart BMS algorithms in Swarna Li, the power conversion control in the Smart Hybrid SMPS \u2014 ultimately runs on silicon. And the most commercially and technically significant decision in any embedded intelligence design is whether that silicon is a general-purpose processor running software, an FPGA running reconfigurable logic, or a purpose-designed ASIC running the exact algorithm in optimised transistors. The answer, for high-performance and power-constrained applications, is always ASIC. A chip designed specifically for its target workload achieves 5\u2013100x better performance per watt than general-purpose processors doing the same computation. This is not a marginal advantage \u2014 it is the difference between a viable embedded system and an impractical one.",
          "The market has confirmed this in 2024\u20132025 with extraordinary commercial force. Microsoft, Google, and Amazon AWS are building what analysts call the \u2018rising ASIC coalition\u2019 \u2014 independently developing custom AI ASICs as a strategic hedge against GPU dependency, capable of trimming total cost of ownership by up to 40% on stable inference workloads (June 2025). NVIDIA launched a dedicated ASIC department in January 2025. OpenAI partnered with Broadcom for a custom AI inference ASIC in October 2024. TSMC signalled its 2nm node was multi-year sold out in May 2025. The entire semiconductor industry is converging on application-specific silicon."
        ]
      },
      {
        "title": "1.2  The Problem SARALA Chip Solves",
        "content": [
          "Figure 1.1 \u2014 The three silicon options for embedded intelligence. For any fixed, well-defined computational workload \u2014 AI inference, radar signal processing, 5G baseband, battery management \u2014 ASIC delivers 5\u2013100x better performance per watt than general-purpose silicon. SARALA Chip is that ASIC.",
          "STRATEGIC NOTE",
          "SARALA Chip is not just a standalone product. It is the silicon foundation for the entire SMPS Tech Lab portfolio. IP-08 SARALA Antenna\u2019s embedded AI detection engine runs on SARALA Chip. IP-07 SAMARAT\u2019s autonomous operations edge nodes run on SARALA Chip. IP-06 Swarna Li\u2019s smart BMS algorithms run on SARALA Chip. IP-01/03\u2019s power conversion control runs on SARALA Chip. The portfolio\u2019s \u2018embedded intelligence\u2019 promise is technically realised through SARALA Chip. This portfolio integration creates a captive internal demand pipeline that de-risks initial commercialisation from Day 1."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$44.8B",
          "2025 Baseline \u00b7 5 Application Sectors",
          "HIGHEST-GROWTH SECTOR",
          "AI Inference ASIC CAGR 2025\u20132033",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "SARALA Chip Filed",
          "Custom ASIC Silicon Design Patent",
          "Figure 1.2 \u2014 TAM breakdown (left): AI & Data Centre is the largest and fastest-growing sector at $13.0B and 18.6% CAGR. ASIC performance benchmark (right): SARALA Chip achieves 5\u2013100x performance per watt versus GPU/CPU for fixed-function workloads \u2014 making it the only viable silicon platform for power-constrained embedded intelligence applications."
        ]
      },
      {
        "title": "1.4  Why SARALA Chip, Why Now",
        "content": [
          "Four forces are defining the ASIC commercialisation moment. The \u2018rising ASIC coalition\u2019 \u2014 Microsoft, Google, Amazon AWS independently building custom AI chips \u2014 has validated custom silicon as a strategic imperative, not a luxury. This validation is flowing down from hyperscalers to automotive OEMs, telecom equipment manufacturers, and industrial system designers. India\u2019s Semiconductor Mission with USD 10 billion in committed incentives, Vervesemi\u2019s Made-in-India ASIC launch (February 2024), and the ISM\u2019s IP matching programme are creating a domestic ASIC ecosystem that makes India-first silicon IP creation commercially viable for the first time. The EU Battery Digital Passport mandate (2027) is creating a regulatory-driven upgrade cycle for automotive-grade BMS ASICs with precision measurement and cloud connectivity. And TSMC\u2019s 2nm sold-out capacity signals that the market\u2019s appetite for advanced custom silicon is so strong that fabrication capacity is the binding constraint.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 through IP-08 = $329.0B + IP-09 $44.8B = USD 373.8 Billion total TAM across 45 sectors and 90 applications. SARALA Chip is unique in this portfolio: it is simultaneously a standalone commercial product and the enabling silicon technology that makes every other portfolio IP technically realisable at the performance and power specifications they claim.",
          "TECHNOLOGY OVERVIEW",
          "ASIC Architecture \u00b7 Hardware Security \u00b7 Chiplet Strategy \u00b7 Portfolio Integration \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is SARALA Chip?",
        "content": [
          "An Application-Specific Integrated Circuit is a semiconductor chip designed and fabricated for a single, specific purpose. Unlike general-purpose processors that execute arbitrary software or FPGAs that are reconfigurable, ASICs encode specific algorithms directly in hardware at the transistor level. SARALA Chip is the company\u2019s proprietary ASIC IP \u2014 a custom silicon design that encodes specific algorithms, signal processing operations, or control functions in dedicated hardware to achieve three fundamental advantages: performance (executing target algorithms orders of magnitude faster than software), power efficiency (consuming 5\u2013100x less power by eliminating programmable architecture overhead), and security (embedding cryptographic and protection functions in hardware that software attacks cannot bypass).",
          "The portfolio integration dimension makes SARALA Chip strategically distinct from a standalone chip product. It is the silicon foundation that makes the embedded intelligence claims of IP-08 (SARALA Antenna), IP-07 (SAMARAT), IP-06 (Swarna Li), and IP-01/03 (SMPS power converters) technically realisable at the performance and power specifications those IPs require. A custom chip designed specifically for SARALA Antenna\u2019s micro-Doppler AI classification algorithm runs that algorithm faster, at lower power, and with better reliability than any FPGA or embedded CPU \u2014 making the <50ms detection-to-alert latency claim physically achievable rather than aspirational."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-09",
          "Application-Specific Compute Core",
          "Custom datapath, parallelism, memory hierarchy, and clock domains co-optimised at transistor level for the target algorithm. No general-purpose instruction overhead. Fixed-function execution at maximum efficiency.",
          "Transistor-level co-optimisation for the specific workload \u2014 the fundamental ASIC advantage. A systolic array for AI inference, a matched filter for radar processing, or a cell balancing controller for BMS each gets exactly the silicon resources required and nothing more.",
          "Hardware-Rooted Security Architecture",
          "AES-256, SHA-3, ECC cryptographic engines; hardware security module (HSM) with secure key storage; Physical Unclonable Function (PUF) for device identity; secure boot; active anti-tamper mesh; key zeroisation on intrusion detection.",
          "Security functions implemented in dedicated silicon that cannot be bypassed by software. PUF generates device-unique cryptographic keys from manufacturing variation \u2014 no key injection required, no key storage vulnerability. Anti-tamper active mesh prevents physical probing.",
          "Advanced Process Node & Power Management",
          "Fabrication on TSMC 7nm/5nm/3nm (or Samsung equivalent). Dynamic voltage and frequency scaling (DVFS), clock gating, power domain isolation. Always-on low-power subsystem for standby sensing. Sub-milliwatt operation for IoT/edge applications.",
          "TSMC 2nm capacity was multi-year sold out as of May 2025 \u2014 leading-edge process nodes are the competitive differentiator. Advanced power management enables SARALA Chip to serve both high-performance data centre applications (<300W) and ultra-low-power IoT applications (<5mW) from the same design family.",
          "Chiplet Architecture & Interface Portfolio",
          "Multi-chip package integration: digital logic die + analog/mixed-signal die + memory die + RF die through 2.5D/3D advanced packaging. Interface portfolio: PCIe Gen5, DDR5, HBM3, LPDDR5, USB4, 100G Ethernet, MIPI CSI/DSI, CAN FD, SPI/I2C/UART.",
          "Chiplet architecture enables functionality exceeding single-die limits while maintaining per-die process node optimisation (e.g., digital logic on 5nm, analog on 28nm, memory on specialised DRAM node). Universal interface portfolio enables SARALA Chip integration into any system architecture."
        ]
      },
      {
        "title": "2.3  Portfolio Silicon Integration \u2014 The Internal Demand Pipeline",
        "content": [
          "SARALA Chip\u2019s most commercially distinctive advantage is its role as the silicon enabler for multiple other portfolio IPs. This creates an internal demand pipeline that validates commercial adoption before any external customer engagement. Each variant of SARALA Chip serves a specific portfolio IP\u2019s embedded processing requirement, making the portfolio\u2019s performance claims technically achievable and commercially defensible.",
          "Figure 2.2 \u2014 SARALA Chip portfolio integration map. Six other IPs in the portfolio benefit from a dedicated SARALA Chip variant as their embedded processing core \u2014 creating an internal demand pipeline of validated design-wins before external commercialisation begins."
        ]
      }
    ],
    "totalParagraphs": 970
  },
  {
    "id": "ip-10",
    "code": "SIPAIR IP-10",
    "title": "SMPS Electric Grid-Tie Inverter",
    "subtitle": "Industrial-Grade Bidirectional High-Voltage Grid-Tie Converter with Smart V2G Capabilities",
    "category": "Grid-Tie Power Systems",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-10 \u2014 SMPS Electric Grid Architecture, Filed 2025",
    "sectors": [
      "Utility Microgrids",
      "V2G Electric Mobility",
      "Commercial Rooftop Solar"
    ],
    "file": "SIPAIR_IP10_SMPSElectric_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SARALA architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-10 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-10: SARALA",
          "SMPS-Based Integrated SARALA for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-10 \u2014 SARALA Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "2.3  GaN/SiC Topology \u2014 The Efficiency Foundation1",
        "content": [
          "2.4  Solar-Integrated Smart Charging Hub \u2014 The Multi-Source Integration Advantage1"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data1",
        "content": [
          "CAGR Comparison \u2014 SMPS Electric Target Market Segments1"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary1",
        "content": [
          "The Context1",
          "The SMPS Electric Supply Proposition1",
          "The Context1",
          "The SMPS Electric Integration Solution1",
          "The Context1",
          "The SMPS Electric Integrated OBC Solution1",
          "V2G and ISO 15118-20 Positioning1",
          "The Context1",
          "The SMPS Electric Wayside Converter Solution1",
          "The Integration Insight That Started SMPS Electric1",
          "Three Engineering Challenges1",
          "Three Ways to Engage1",
          "Model A \u2014 Research Fellowship1",
          "Model B \u2014 Supply Partnership1",
          "Model C \u2014 Technology Licensing1"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "The global electrification transition is creating an unprecedented demand wave for power supply solutions across every domain simultaneously: 35 million EV charge points forecast in the US by 2030, global BEV registrations exceeding 8.5 million units in August 2025 alone, India\u2019s PM e-DRIVE scheme committing INR 10,900 crore for EV charging infrastructure, V-GREEN signing an agreement to deploy EV charging at 24,400+ HPCL fuel outlets, and industrial electrification programmes replacing fossil fuel combustion with electric processes at every scale. The common factor in every one of these deployments is an SMPS power supply at the core of the energy conversion. Every EV charger is an SMPS. Every on-board vehicle charger is an SMPS. Every solar-integrated charging hub requires an SMPS. The question for operators, OEMs, and infrastructure developers is not whether to procure an SMPS \u2014 it is which SMPS.",
          "The answer that the market is converging on \u2014 validated by ABB\u2019s 360kW integrated ultra-fast charger, ChargePoint\u2019s 500kW modular platform, and Delta Electronics\u2019 liquid-cooled 500A system \u2014 is integration. A single, co-optimised SMPS platform that consolidates the AC-DC rectifier, active power factor correction, DC-DC conversion, energy management controller, and smart diagnostics into one factory-tested unit outperforms a cascade of separately procured units on every relevant metric: efficiency, reliability, total cost, and commissioning time. SMPS Electric is that integrated platform, purpose-engineered for every application in the electric mobility and electrification ecosystem."
        ]
      },
      {
        "title": "1.2  The Problem SMPS Electric Solves",
        "content": [
          "Figure 1.1 \u2014 Fragmented multi-unit cascade (left) versus SMPS Electric integrated platform (right). Four separate procurement, commissioning, and maintenance events collapse into one. End-to-end efficiency improves by 4\u20138 percentage points through cross-stage co-optimisation in a single thermal design.",
          "STRATEGIC NOTE",
          "SMPS Electric is not just a more efficient charger. It is the integrated power platform that replaces the entire cascade of separate units conventionally required across every electric domain application \u2014 EV charging, on-board vehicle power, renewable energy integration, railway traction, and industrial electrification. Integration is the competitive moat. Co-optimisation within a single platform is what delivers the 4\u20138 percentage point efficiency advantage. And the wide voltage range (85V\u2013480V AC input, 50V\u20131500V DC output) covering every electric application from a single platform family is what makes SMPS Electric the only power supply solution a system integrator needs across the entire electrification portfolio."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$52.3B",
          "2025 Baseline \u00b7 5 Electric Sectors",
          "FASTEST-GROWING SECTOR",
          "25.37%",
          "EV Charging Infrastructure CAGR 2025\u20132034",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "SMPS Electric Filed",
          "Integrated Electric SMPS Patent",
          "Figure 1.2 \u2014 TAM breakdown (left): EV Charging Infrastructure is the largest sector at $17.0B and fastest-growing at 25.37% CAGR. Integration efficiency benchmark (right): SMPS Electric\u2019s fully integrated platform achieves >96% end-to-end efficiency \u2014 4\u20138 percentage points above fragmented multi-unit approaches."
        ]
      },
      {
        "title": "1.4  Why SMPS Electric, Why Now",
        "content": [
          "Four forces are converging on the SMPS Electric commercialisation moment. The EV charging infrastructure growth rate is extraordinary: the US forecast moves from 4 million to 35 million charge points by 2030, and every single charge point requires an integrated SMPS power supply at its core. India\u2019s PM e-DRIVE scheme\u2019s INR 10,900 crore for EV charging infrastructure \u2014 with Make in India preference for domestically designed power supply solutions \u2014 creates the largest single procurement opportunity for SMPS Electric in any country. V2G mainstream adoption is driving the upgrade from unidirectional to bidirectional charging power supplies: ChargePoint launched V2G-capable Level 2 chargers in 2025; the V2G market is growing at 48.1% CAGR. And GaN/SiC semiconductor cost reductions \u2014 Infineon\u2019s USD 830 million GaN Systems acquisition (March 2024) signalling the industry\u2019s commitment \u2014 are enabling SMPS Electric\u2019s high-frequency GaN/SiC topology to reach commercial price points competitive with legacy silicon MOSFET designs.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 through IP-09 = $373.8B + IP-10 $52.3B = USD 426.1 Billion total TAM across 50 sectors and 100 applications. SMPS Electric adds the electric mobility and electrification domain \u2014 the integrated power supply that converts, manages, and delivers energy across every application in the electrification transition.",
          "TECHNOLOGY OVERVIEW",
          "Integrated Architecture \u00b7 GaN/SiC Topology \u00b7 V2G Bidirectional \u00b7 Smart Grid \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is SMPS Electric?",
        "content": [
          "SMPS Electric is an integrated Switched-Mode Power Supply solution built specifically for electric mobility and electrification applications. The \u2018Electric\u2019 designation distinguishes it from IP-01 (Smart Hybrid SMPS, a general-purpose platform) and IP-02 (SMPS-Based CCU, a telecom-specific architecture): SMPS Electric is the electric domain specialist where every design decision \u2014 topology selection, voltage range, bidirectional capability, protocol stack, safety certification \u2014 is optimised for EV charging, vehicle on-board power, renewable energy integration, railway traction, and industrial electrification. The \u2018Integrated\u2019 architecture consolidates functions that conventional implementations deploy as separate, disconnected units: the AC-DC rectifier stage, the active power factor correction unit, the DC-DC conversion stage, the energy management controller, the smart diagnostics module, and the grid-interface protection relay \u2014 all into a single, co-optimised, factory-tested SMPS Electric platform."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-10",
          "GaN/SiC Power Conversion Stage",
          "Wide-bandgap semiconductor switches (GaN for high-frequency low-power stages, SiC for high-voltage high-power stages). LLC resonant or phase-shifted full-bridge topology. Switching frequencies >400kHz.",
          "GaN/SiC enables 2\u20133x power density versus silicon MOSFET designs, enabling significantly smaller passives and dramatically reduced thermal mass. >96% peak efficiency across the load range.",
          "Bidirectional Power Flow Architecture",
          "Native bidirectional AC-DC-AC capability enabling V2G and V2B operation without additional hardware. Sub-100ms mode switching between EV charging and V2G discharge. Supports ISO 15118-20, CHAdeMO V2G, CCS Bidirectional.",
          "The patent-bearing element: a single integrated SMPS that charges EVs from the grid AND discharges EV batteries back to the grid or building without requiring separate bidirectional hardware. One platform, two revenue streams (charging + V2G grid services).",
          "Smart Grid Integration Intelligence",
          "OCPP 2.0, OpenADR 2.0, IEC 61850 GOOSE demand response protocols. Automatic charging rate adjustment based on grid frequency, dynamic pricing, or utility signals. Solar MPPT integration for renewable-powered charging hubs.",
          "Built-in demand response participation enables SMPS Electric installations to earn grid services revenue without additional hardware. A 100-unit charging hub with SMPS Electric\u2019s demand response can generate USD 50,000\u2013200,000/year in grid services income.",
          "Integrated IoT Diagnostics & Hot-Swap Modularity",
          "Real-time monitoring of switch junction temperatures, capacitor ESR drift, and inductor saturation margins. AI predictive maintenance engine forecasting failures 2\u20134 weeks in advance. Modular hot-swap architecture: any power module replaceable under live load.",
          "Hot-swap module replacement under live load is the critical operational requirement for commercial charging infrastructure. A faulty module pulled and replaced without interrupting charging station operation eliminates the revenue loss from taking the charging point offline."
        ]
      }
    ],
    "totalParagraphs": 966
  },
  {
    "id": "ip-11",
    "code": "SIPAIR IP-11",
    "title": "SurgeTrap Transient Voltage Suppressor",
    "subtitle": "Multi-Stage High-Energy Surge Suppression & Lightning Protection Barrier System",
    "category": "Surge Protection & Safety",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-11 \u2014 SurgeTrap Architecture, Filed 2025",
    "sectors": [
      "High-Altitude Radar Sites",
      "Transmission Line Substations",
      "Ruggedized Field Hardware"
    ],
    "file": "SIPAIR_IP11_SurgeTrap_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SARALA architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-11 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-11: SARALA",
          "SMPS-Based Integrated SARALA for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-11 \u2014 SARALA Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation",
          "SMPS Tech Lab \u2014 Engineering Intelligent Power",
          "Date of Issue"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data1",
        "content": [
          "CAGR Comparison \u2014 Surge Trap Target Market Segments1"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary1",
        "content": [
          "The Context1",
          "The Surge Trap OEM Supply Solution1",
          "The Context1",
          "The Surge Trap Pilot Programme Solution1",
          "The Context1",
          "The Surge Trap Solar Variant Solution1",
          "The Context1",
          "The Surge Trap Medical-Grade Solution1",
          "The Silent Failure Gap That Defined Surge Trap1",
          "Three Engineering Challenges1",
          "Three Ways to Engage1",
          "Model A \u2014 Research Fellowship1",
          "Model B \u2014 OEM Component Supply1",
          "Model C \u2014 Technology Licensing & Managed Service Platform1",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Every piece of electrical equipment on the planet requires protection from voltage surges. Yet in the vast majority of installations \u2014 industrial facilities, residential buildings, telecom towers, EV charging stations, solar farms, hospitals \u2014 the surge protection device installed is a passive, silent, degrading component that the owner cannot monitor, cannot query, and cannot know is still functional. Industry data shows that 80% of transients are self-generated from motor switching, transformer operation, and power electronics \u2014 not from lightning. These low-amplitude, high-frequency surges silently wear out Metal Oxide Varistors (MOVs) with every event until the device fails \u2014 leaving connected equipment completely unprotected without the owner\u2019s knowledge. This \u2018silent failure\u2019 problem is the fundamental commercial limitation of every conventional Surge Protection Device ever manufactured.",
          "India\u2019s 700,000+ telecom towers, 500+ million electrical connection points, rapidly expanding EV charging infrastructure, multi-GW solar farm portfolio, and dense hospital and industrial sectors are all exposed to this same risk. As India\u2019s grid becomes more complex \u2014 with bidirectional energy flows from rooftop solar, EV charging loads, and reactive industrial equipment \u2014 the frequency of transient events is increasing, not decreasing. A better grid, paradoxically, creates more surge events. The addressable market for intelligent surge protection grows every time a new EV charger is installed, every time a solar farm is commissioned, and every time an industry 4.0 factory connection is made."
        ]
      },
      {
        "title": "1.2  The Problem Surge Trap Solves",
        "content": [
          "Figure 1.1 \u2014 Passive SPD (left): the conventional SPD silently degrades with every surge event, showing a green LED even after internal failure \u2014 leaving equipment unprotected without any warning. Surge Trap (right): continuous MOV health monitoring, AI end-of-life prediction, and IoT alert eliminates the silent failure problem entirely.",
          "STRATEGIC NOTE",
          "Surge Trap is not a better SPD. It is an intelligent protection platform that makes the SPD visible, manageable, and predictive for the first time. The commercial differentiator is transformative: conventional SPDs are commodities priced by cent and replaced reactively after equipment failure. Surge Trap is a managed protection service \u2014 priced at 2\u20133x the conventional SPD ASP, generating recurring monitoring revenue, and creating the data foundation for predictive maintenance contracts and insurance risk management integration."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$15.2B",
          "2025 Baseline \u00b7 5 Protection Sectors",
          "SMART SPD PREMIUM CAGR",
          "12\u201315%",
          "IoT/AI SPD sub-segment vs. 6.48% conventional",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "Surge Trap Filed",
          "AI Predictive SPD Patent",
          "Figure 1.2 \u2014 TAM breakdown (left): Industrial & Critical Infrastructure is the largest sector at $5.5B. Smart SPD commercial benchmark (right): Surge Trap commands 2\u20133x the ASP of conventional SPDs while delivering >98% failure detection versus 0% for passive units \u2014 a payback of 6\u201312 months through avoided equipment damage alone."
        ]
      },
      {
        "title": "1.4  Why Surge Trap, Why Now",
        "content": [
          "Three convergent forces define the Surge Trap commercialisation window. Industry 4.0 adoption is connecting previously isolated industrial equipment \u2014 PLCs, servo drives, SCADA servers \u2014 to Ethernet and cloud platforms, dramatically increasing the financial consequence of a single surge event and creating demand for smart monitored protection. In December 2025, Raycap unveiled the ProTec T2 DCGU 3Y \u2014 a pluggable smart SPD specifically engineered for DC fast-charging infrastructure \u2014 providing commercial validation that EV charging SPD is now an active, shipping product category that Surge Trap is directly aligned with. And Global Market Insights confirms data centres as the fastest-growing SPD end-user in 2025 \u2014 driven by hyperscale operators requiring SNMP/DCIM-integrated smart SPDs to satisfy uptime SLA requirements that passive SPDs cannot support.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 through IP-10 = $426.1B + IP-11 $15.2B = USD 441.3 Billion total TAM across 55 sectors and 110 applications. Surge Trap adds the intelligent protection layer \u2014 safeguarding every investment the portfolio powers, converts, stores, manages, and delivers across the entire electrification ecosystem.",
          "TECHNOLOGY OVERVIEW",
          "AI EOL Prediction \u00b7 IoT Architecture \u00b7 Type 1+2+3 Combined \u00b7 Power Quality \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is Surge Trap?",
        "content": [
          "Surge Trap is a smart voltage protection device \u2014 an evolution of the conventional Surge Protection Device (SPD) into an intelligent, communicating, and self-aware platform. A conventional SPD uses Metal Oxide Varistors (MOVs), Gas Discharge Tubes (GDTs), or Transient Voltage Suppressor (TVS) diodes to clamp voltage transients by diverting excess energy to ground. The critical limitation of conventional SPDs is that their protective elements degrade silently with every transient event \u2014 each surge partially degrades the MOV \u2014 until the device fails without warning. Surge Trap transforms this passive component into an active, monitored, and manageable protection platform by adding continuous MOV condition monitoring, AI-driven end-of-life prediction, IoT connectivity, and power quality analytics \u2014 all within the same physical form factor as a conventional SPD, with no change to installation requirements."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-11",
          "Multi-Mode Protection Array",
          "MOV array (Type 1, 2, or 3 rating), Gas Discharge Tube (GDT), TVS diodes, thermal fuse backup. Combined Type 1+2+3 topology replaces conventional three-device cascade with a single co-ordinated unit.",
          "Single-device Type 1+2+3 combined protection reduces installation cost 40\u201360% versus three separate devices. Co-ordinated protection stages prevent the under/over-protection gaps that occur when three separately procured devices interact unpredictably.",
          "AI End-of-Life Prediction Engine",
          "Onboard microcontroller continuously monitors MOV leakage current (nA precision), joule absorption history, surge event count and energy, and thermal state. AI model predicts remaining protection capacity and issues replacement alert 2\u20134 weeks before failure.",
          "The patent-bearing element. Leakage current rises exponentially as MOV approaches end-of-life. The AI calibration converts this non-linear signal into a linear remaining-capacity percentage \u2014 enabling a precise replacement timeline rather than a vague \"degraded\" warning. False negative rate: <2%.",
          "IoT Connectivity & Power Quality Analytics",
          "Wi-Fi / RS-485 / Modbus TCP / MQTT connectivity. Real-time data: surge event count and energy per event, power quality metrics (voltage sag/swell, frequency deviation, harmonic index), MOV health percentage, temperature. Dashboards: cloud, SCADA, BMS, DCIM.",
          "Multi-protocol IoT connectivity eliminates proprietary lock-in. The power quality analytics layer converts Surge Trap from a single-function protection device into a continuous power quality sensor \u2014 providing data that no conventional SPD can generate. Managed service revenue model enabled by cloud connectivity.",
          "Application Variant Architecture",
          "Industrial (DIN rail, Modbus, SCADA), Residential (Wi-Fi, app), Telecom (outdoor, RS-485, EMS), EV Charging DC (IEC 61851-23, OCPP 2.0), Solar PV (EN 50539, 1500V DC), Healthcare (IEC 60601-1), Defence (MIL-STD-461).",
          "Seven distinct application variants from a shared base platform. The core AI engine, MOV monitoring circuit, and IoT stack are common; the protection rating, connectivity protocol, enclosure, and certification path are application-specific. Amortises R&D across seven markets."
        ]
      },
      {
        "title": "2.3  AI End-of-Life Prediction \u2014 The Core Intelligence",
        "content": [
          "The fundamental innovation in Surge Trap is the AI end-of-life prediction engine. MOV degradation follows a well-characterised but non-linear pattern: leakage current at rated voltage increases slowly for the majority of the device\u2019s life, then rises exponentially as the device approaches failure. Conventional SPDs cannot measure this \u2014 they simply display a green LED until the MOV catastrophically fails and the LED turns red (if the LED circuit itself still functions). Surge Trap\u2019s onboard microcontroller measures MOV leakage current with nA resolution, combined with joule absorption counting from each surge event, thermal state, and total operating hours. The AI model \u2014 trained on accelerated life test degradation data for MOV families across temperature and surge energy profiles \u2014 converts this multi-parameter input into a remaining protection capacity percentage and a calibrated days-to-replacement estimate. The practical result: Surge Trap alerts the facility manager, SCADA operator, or building management system 2\u20134 weeks before the protective element reaches its end-of-life \u2014 enabling a planned maintenance event rather than an emergency response after equipment failure.",
          "Figure 2.2 \u2014 AI end-of-life prediction (left): Surge Trap detects the exponential rise in MOV leakage current 2\u20134 weeks before catastrophic failure, providing a planned replacement window that passive SPDs are physically incapable of providing. Surge event lifecycle (right): from microsecond transient clamping through energy logging to cloud dashboard update in real time."
        ]
      }
    ],
    "totalParagraphs": 959
  },
  {
    "id": "ip-12",
    "code": "SIPAIR IP-12",
    "title": "SonaGrip High-Tension Busbar Grip",
    "subtitle": "Intelligent High-Tension Terminal Connector & Busbar Fastener with Thermal Monitoring",
    "category": "Hardware Interconnects",
    "status": "Patent Filed (2025)",
    "ipRef": "IP-12 \u2014 SonaGrip Architecture, Filed 2025",
    "sectors": [
      "High-Voltage Switchgear",
      "Battery Pack Interconnects",
      "Industrial Power Distribution"
    ],
    "file": "SIPAIR_IP12_SonaGrip_032026.docx",
    "docSeries": "Strategic IP Asset Intelligence Report (SIPAIR)",
    "author": "Shri Amareshwar Karatagi",
    "authorRole": "Lead Hardware Architect & Founder",
    "org": "SMPS Tech Lab \u2014 Engineering Intelligent Power",
    "date": "March 2026",
    "classification": "Confidential & Proprietary \u2014 Read Only Access",
    "abstract": "The core technology described in this report \u2014 the SMPS-Based Integrated SARALA architecture, including its active power management layer, CCU intelligence stack, uninterrupted multi-rail AC/DC delivery system, and NMS integration platform \u2014 is the exclusive proprietary invention of SMPS Tech Lab, protected under a filed novel design patent (2025). IP-12 is a distinct and independently protectable invention from IP-01 (Smart Hybrid SMPS), though both emerge from the same SMPS Tech Lab research programme. The two IPs are designed to complement each other across adjacent application verticals and may be jointly licensed or co-deployed where application requirements demand both hybrid topology and active power management intelligence.",
    "sections": [
      {
        "title": "Executive Overview",
        "content": [
          "Abstract",
          "Abstract",
          "STRATEGIC IP ASSET INTELLIGENCE REPORT",
          "SIPAIR Series",
          "IP-12: SARALA",
          "SMPS-Based Integrated SARALA for Uninterrupted Telecom Power",
          "Report Title",
          "SIPAIR IP-12 \u2014 SARALA Commercialisation Brief",
          "Document Series",
          "Strategic IP Asset Intelligence Report (SIPAIR)",
          "Version",
          "Version 1.0 \u2014 First Edition",
          "Compiled & Edited by",
          "Shri Amareshwar Karatagi",
          "Organisation"
        ]
      },
      {
        "title": "3.3  Global Market Sizing \u2014 Primary Reference Data1",
        "content": [
          "CAGR Comparison \u2014 Sona Grip Target Market Segments1"
        ]
      },
      {
        "title": "Appendix C \u2014 Glossary1",
        "content": [
          "The Context1",
          "The Sona Grip EV Battery Assembly Solution1",
          "The Context1",
          "The Sona Grip Aerospace Documentation Solution1",
          "The Context1",
          "The Sona Grip PLI Industry 4.0 Solution1",
          "The Context1",
          "The Sona Grip Wind Turbine Documentation Solution1",
          "The Customer Pain That Defined Sona Grip1",
          "Three Engineering Challenges1",
          "Three Ways to Engage1",
          "Model A \u2014 Research Fellowship1",
          "Model B \u2014 OEM Tool Supply1",
          "Model C \u2014 Technology Licensing1",
          "FOUNDER & EDITOR"
        ]
      },
      {
        "title": "1.1  The Strategic Context",
        "content": [
          "Incorrect fastener torque is the single most pervasive quality failure in modern manufacturing. It is invisible at time of assembly, catastrophic in consequence, and almost entirely preventable. An under-torqued bolt in an EV battery cell module creates poor electrical contact \u2014 a fire risk discovered under load. An over-torqued aerospace fastener strips the thread \u2014 a structural failure discovered at 35,000 feet. A cross-threaded screw in a surgical instrument causes sterility failure discovered during a procedure. In every case, the failure was detectable at the point of assembly by a tool that could measure, compare, and record the torque being applied. The industry has known this for decades. But the tools that deliver this capability \u2014 precision digital torque tools with closed-loop control, AI error detection, and MES-integrated traceability \u2014 have historically been expensive, application-specific, and proprietary. A factory needed different tools for different fastener types, different torque ranges, and different industry certifications. The fragmentation was the barrier.",
          "Over 68% of global OEMs now employ automated fastening with digital torque wrenches (Industry Research Biz, 2025). Tesla Gigafactories use smart torque tools specifically for EV battery module fastening to prevent thermal runaway. Volkswagen reports 15\u201320% assembly defect reduction after adopting IoT-enabled torque wrenches. Lockheed Martin\u2019s F-35 production line uses Bluetooth-enabled wrenches that auto-upload torque values to central QA systems. The market has validated the technology. What it has not had is a universal platform \u2014 one tool, one certification, one MES integration, across all fastener types, all torque ranges, and all industry standards simultaneously."
        ]
      },
      {
        "title": "1.2  The Problem Sona Grip Solves",
        "content": [
          "Figure 1.1 \u2014 Three levels of torque control capability. Sona Grip\u2019s universal platform achieves what no conventional tool provides: \u00b11% accuracy across the full range, AI pre-fault detection, and automatic MES-integrated traceability \u2014 replacing a fragmented inventory of application-specific tools with a single certified universal platform.",
          "STRATEGIC NOTE",
          "The Sanskrit and Hindi meaning of Sona is Gold. Sona Grip is positioned as the gold standard of torque control: the single, universal, intelligent fastening platform that replaces the fragmented collection of application-specific torque tools that every precision manufacturer must stock, certify, calibrate, and maintain. One tool. One certification. One MES integration. Every fastener type. Every torque range. Every industry."
        ]
      },
      {
        "title": "1.3  Key Metrics at a Glance",
        "content": [
          "TOTAL ADDRESSABLE MARKET",
          "$26.4B",
          "2025 Baseline \u00b7 5 Manufacturing Sectors",
          "FASTEST GROWING SEGMENT",
          "Smart Power Tools CAGR 2025\u20132033 (Grand View)",
          "SECTORS MAPPED",
          "10 Applications Identified",
          "IP PROTECTION",
          "Sona Grip Filed",
          "Universal Torque Control Patent",
          "Figure 1.2 \u2014 TAM breakdown (left): Automotive & EV Assembly is the largest sector at $9.8B driven by EV battery pack fastening safety requirements. Precision benchmark (right): Sona Grip achieves \u00b11% accuracy versus \u00b14\u20138% for click wrenches and provides full MES-integrated traceability that no passive tool can generate."
        ]
      },
      {
        "title": "1.4  Why Sona Grip, Why Now",
        "content": [
          "Four forces are defining the Sona Grip commercialisation moment. EV battery assembly is the highest-criticality, fastest-growing torque application in manufacturing history \u2014 every EV battery cell requires documented, AI-verified torque, and India EV production is scaling from 2 million to tens of millions of units. The 68% OEM digital torque adoption rate means the market has crossed the majority adoption threshold globally, with India\u2019s manufacturing sector at the beginning of the same curve. PLI scheme Industry 4.0 compliance requirements are creating a direct procurement mandate for MES-integrated fastening documentation among PLI beneficiaries. And the emergence of AI-driven torque tools \u2014 Bosch investing in AI torque optimisation, Tesla\u2019s smart battery assembly validation \u2014 confirms that AI cross-threading detection is transitioning from experimental to procurement-standard.",
          "MARKET DATA POINT",
          "Combined SMPS Tech Lab portfolio: IP-01 through IP-11 = $441.3B + IP-12 $26.4B = USD 467.7 Billion total TAM across 60 sectors and 120 applications. Sona Grip adds the precision manufacturing quality layer \u2014 ensuring every fastener in every product that the portfolio\u2019s technology powers, charges, manages, and protects is assembled with the gold standard of torque control.",
          "TECHNOLOGY OVERVIEW",
          "Universal Range \u00b7 AI Torque Engine \u00b7 MES Integration \u00b7 Universal Head \u00b7 Standards"
        ]
      },
      {
        "title": "2.1  What is Sona Grip?",
        "content": [
          "Sona Grip is a universal torque controlled device where every word in the name carries precise technical meaning. \u2018Universal\u2019 means a single platform covering 0.1 Nm (micro-screw in electronics assembly) to 5,000+ Nm (structural bolts in wind turbine flanges) through a modular head system \u2014 the entire 50,000:1 torque range from a single certified controller. \u2018Torque Controlled\u2019 means closed-loop digital control: unlike a passive click wrench that provides only a signal at target torque, Sona Grip continuously measures torque at 10,000 samples per second and actively modulates the drive in real time. \u2018Device\u2019 means an intelligent platform \u2014 not just a tool but a connected quality system node that delivers MES-integrated fastening records, AI error prevention, and statistical process control output. The combination is the IP: no competitor offers a certified universal platform with AI closed-loop control and full MES integration across the complete manufacturing torque range."
        ]
      },
      {
        "title": "2.2  The Four Integrated Technology Layers",
        "content": [
          "COMPONENT",
          "FUNCTION",
          "KEY INNOVATION IN IP-12",
          "Universal Modular Head System",
          "Patented universal head adapter accepting hex, square drive, TORX, spline, and custom fastener heads. Auto-detection of head type via RFID tag in each head. Torque specification automatically pulled from MES database on head change.",
          "Single Sona Grip controller drives any fastener type. When the operator changes heads, the tool automatically downloads the correct torque specification from the MES \u2014 no manual parameter entry, no wrong-spec risk. Eliminates the need to stock, calibrate, and certify separate tools for each fastener type.",
          "AI Closed-Loop Torque Engine",
          "Strain gauge or reaction torque sensor measuring at 10,000 samples/second. AI algorithm monitoring the torque-angle signature in real time. Pre-fault detection: cross-threading identified in first 5\u00b0 of rotation; non-conforming fastener identified before damage; yield-point detection for stretch bolts.",
          "The patent-bearing element. The AI does not log failures \u2014 it prevents them. Cross-threading detected before the fastener is damaged, non-conforming fasteners identified before stripped threads occur, over-torque stopped before structural failure. Prevention, not documentation of failure.",
          "MES/ERP Integration Platform",
          "OPC-UA, Modbus TCP, REST API, and PROFINET connectivity. Every fastening result automatically uploaded: torque value, angle, date-time, operator ID (from login badge scan), tool ID, head ID, fastener ID, VIN/work order, SPC statistics. Supported: Siemens Opcenter, SAP ME, Oracle MES, FDA 21 CFR Part 11 DHR.",
          "Auto-logged fastening records with zero manual entry. The MES integration layer is the commercial differentiator for customers supplying global automotive Tier 1, aerospace, and medical export markets where electronic traceability records are a contractual and regulatory requirement.",
          "Application Variant Intelligence",
          "Seven distinct application variants sharing the common AI engine and MES integration: Automotive EV Battery (UN 38.3), Automotive Assembly (IATF 16949), Aerospace (AS9100D), Defence MRO (MIL-STD-810), Smart Factory (ISO 9001), Electronics (IPC-A-610), Medical (FDA 21 CFR Part 11).",
          "Same hardware platform, different intelligence modules. Variant selection changes the torque strategy, safety interlocks, certification outputs, and MES data schema appropriate for the application \u2014 without requiring a different physical tool or a new calibration certificate."
        ]
      },
      {
        "title": "2.3  AI Torque-Angle Engine \u2014 Pre-Fault Detection",
        "content": [
          "The fundamental innovation in Sona Grip is the transition from torque \u2018measurement\u2019 to torque \u2018control\u2019. A conventional digital torque tool measures the torque applied and records it. Sona Grip\u2019s AI engine monitors the real-time torque-angle curve against the expected signature for the specific fastener and application, and intervenes before a defect occurs. Cross-threading \u2014 where the screw enters the hole on the wrong thread \u2014 produces a characteristic abnormal torque rise in the first 5\u00b0 of rotation that is unmistakeable in the 10,000 sps data stream. Sona Grip stops the drive, sounds an alert, and logs the event as a \u2018CROSS-THREAD DETECTED \u2014 REWORK REQUIRED\u2019 record in the MES before the fastener or component is damaged. A click wrench applying incorrect technique cannot distinguish a cross-threaded fastener from a correctly engaged one until it produces the click signal \u2014 at which point the damage is done and the component requires rework or scrap.",
          "Figure 2.2 \u2014 AI torque-angle signature analysis (left): Sona Grip detects cross-threading in the first 5\u00b0 of rotation \u2014 stopping the drive before thread damage occurs. Conventional tools cannot make this distinction until the target torque is reached and the damage is already done. Universal head auto-detection (right): any head type instantly detected, correct torque specification automatically loaded, single calibration certificate covers all heads."
        ]
      }
    ],
    "totalParagraphs": 964
  }
];
