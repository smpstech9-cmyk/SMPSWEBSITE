"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  QrCode,
  Download,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Send,
  X,
  FileCode2,
  Layers,
  Cpu,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import { Enrollment, Application } from "@/types";

interface LabAssignment {
  id: string;
  title: string;
  week: string;
  dueDate: string;
  status: "GRADED" | "SUBMITTED" | "PENDING";
  score?: string;
  feedback?: string;
  githubUrl?: string;
  reportUrl?: string;
}

export default function StudentCoursesPage() {
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<"curriculum" | "assignments" | "certificate">("curriculum");
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Assignment submission modal state
  const [submittingAssignment, setSubmittingAssignment] = useState<LabAssignment | null>(null);
  const [githubRepoUrl, setGithubRepoUrl] = useState<string>("");
  const [demoVideoUrl, setDemoVideoUrl] = useState<string>("");
  const [submissionNotes, setSubmissionNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Practical assignments state (clean zero state, populated from live cohort)
  const [assignments, setAssignments] = useState<LabAssignment[]>([]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        if (isAuthenticated) {
          const enrData = await apiClient<Enrollment[]>("/internships/my-enrollments").catch(() => []);
          setEnrollments(enrData || []);
        } else {
          setEnrollments([]);
        }
      } catch {
        setEnrollments([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [isAuthenticated]);

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (submittingAssignment) {
        setAssignments((prev) =>
          prev.map((a) =>
            a.id === submittingAssignment.id
              ? {
                  ...a,
                  status: "SUBMITTED",
                  score: "Under Review by Mentor",
                  githubUrl: githubRepoUrl,
                }
              : a
          )
        );
      }
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmittingAssignment(null);
        setGithubRepoUrl("");
        setDemoVideoUrl("");
        setSubmissionNotes("");
      }, 1200);
    }, 700);
  };

  const weeklyCurriculum = [
    {
      weekNumber: 1,
      title: "High-Voltage Topologies & GaN/SiC Gate Drivers",
      summary: "Double-pulse test methodology, parasitic inductance mitigation, and isolated gate driver layout.",
      topics: [
        "1500V DC bus architecture and creepage/clearance IPC-2221 standards",
        "Gallium Nitride (GaN) vs Silicon Carbide (SiC) switching loss comparative curves",
        "Isolated optical & magnetic gate driver topologies with Miller clamp integration",
        "Practical double-pulse circuit breadboarding and high-bandwidth differential measurement",
      ],
      labBay: "High-Voltage Power Electronics Bay (VTU-VRIF Room 204)",
      equipment: ["Chroma 62150H DC Source (1500V/15kW)", "1GHz Oscilloscope with Rogowski probes"],
      downloads: [
        { name: "SiC_Double_Pulse_Test_Bench_Schematic.pdf", size: "1.8 MB" },
        { name: "Gate_Driver_Layout_Guidelines_VTU.pdf", size: "2.4 MB" },
      ],
    },
    {
      weekNumber: 2,
      title: "PURNA BESS™ Pack Architecture & Impedance Spectroscopy",
      summary: "Lithium iron phosphate cell modeling, thermal runaway protection, and active BMS balancing.",
      topics: [
        "LFP cell equivalent circuit modeling (Thevenin R-C networks) and state-of-charge Kalman filters",
        "Impedance spectroscopy measurement across 0.1Hz to 10kHz frequency sweeps",
        "Liquid cooling channel design and rack-level thermal CFD analysis",
        "CAN-FD protocol implementation for battery cluster telemetry and fault signaling",
      ],
      labBay: "Battery Energy Storage Systems Laboratory (VTU-VRIF Bay B)",
      equipment: ["Chroma 17020 Regenerative Battery Pack Cycler", "Thermal Environmental Chamber (-40°C to +85°C)"],
      downloads: [
        { name: "PURNA_BESS_Cluster_Wiring_Diagram.pdf", size: "3.2 MB" },
        { name: "LFP_Impedance_Characterization_Guide.pdf", size: "1.5 MB" },
      ],
    },
    {
      weekNumber: 3,
      title: "SaralaChip™ DSP Microcontroller & Fast Fault Protection",
      summary: "Real-time firmware architecture, closed-loop PWM generation, and hardware fault interrupts.",
      topics: [
        "SaralaChip™ CCU core architecture: Dual high-speed CAN-FD and configurable logic blocks",
        "Sub-2.5 microsecond hardware analog comparator tripping for SiC desaturation",
        "Space vector PWM (SVPWM) state machine implementation in embedded C",
        "Hardware-in-the-Loop (HIL) closed-loop inverter simulation",
      ],
      labBay: "Embedded Silicon & Microcontroller Bench (VTU-VRIF Room 208)",
      equipment: ["SaralaChip™ DSP Development Boards", "CAN-FD Bus Analyzers & JTAG Debuggers"],
      downloads: [
        { name: "SaralaChip_CCU_Technical_Reference_Manual.pdf", size: "4.8 MB" },
        { name: "Fast_Trip_Firmware_Driver_Source.zip", size: "820 KB" },
      ],
    },
    {
      weekNumber: 4,
      title: "Grid Islanding, Microgrid Synchronization & Capstone",
      summary: "Autonomous grid synchronization, zero-crossing phase-locked loops, and final capstone testing.",
      topics: [
        "Second-order generalized integrator (SOGI) PLL for rapid grid phase detection",
        "Anti-islanding detection under IEEE 1547 and UL 1741 standards",
        "Bidirectional inverter 4-quadrant P-Q control under regenerative loads",
        "Final capstone project verification and presentation to SMPS R&D mentors",
      ],
      labBay: "Regenerative Grid Integration Bay (VTU-VRIF High-Bay)",
      equipment: ["Chroma 61860 Regenerative Grid Simulator (60kVA)", "Precision Power Quality Analyzers"],
      downloads: [
        { name: "Grid_Synchronization_Capstone_Specification.pdf", size: "2.1 MB" },
        { name: "IEEE_1547_Compliance_Checklist.pdf", size: "950 KB" },
      ],
    },
  ];

  if (enrollments.length === 0) {
    return (
      <div className="w-full p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
        <div className="border-b border-[#e5e5ea] pb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium shadow-sm">
              <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0071e3] font-semibold">Learning Management System</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            My Internships & <span className="text-gradient-apple-blue">Curriculum LMS</span>
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-[#6e6e73] font-normal">
            Track and submit your laboratory engineering reports and access VTU course modules.
          </p>
        </div>

        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-12 text-center space-y-4 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#1d1d1f]">No Active Cohort Enrolled</h2>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed max-w-md mx-auto">
            You are not currently enrolled in any VTU internship track. Explore available hardware tracks, apply for an intake, and your syllabus will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/internships"
              className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
            >
              <span>Explore Internship Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Eyebrow & Keynote Title */}
      <div className="border-b border-[#e5e5ea] pb-6">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium shadow-sm">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">Learning Management System</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-mono font-bold">
            <span>Enrolled: VTU-PE-2026-B1</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          My Internships & <span className="text-gradient-apple-blue">Curriculum LMS</span>
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-[#6e6e73] font-normal">
          Industrial Power Electronics & High-Frequency Magnetics (Accredited by Visvesvaraya Technological University).
        </p>
      </div>

      {/* Program Summary Card */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#e5e5ea]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-bold font-mono">
                ENROLLED & ACTIVE
              </span>
              <span className="text-xs text-[#6e6e73] font-mono">ID: SMPS-VTU-2026-09A3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] tracking-tight">
              Industrial Power Electronics & High-Frequency Magnetics
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e6e73]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#059669]" />
                Cohort Batch: 15-Nov-2026 to 15-Dec-2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#eab308]" />
                4 Weeks (160 Lab Hours)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-center min-w-[110px]">
              <span className="text-[10px] font-bold text-[#6e6e73] uppercase block">Attendance</span>
              <span className="text-xl font-extrabold text-[#10b981] block mt-0.5">92.5%</span>
              <span className="text-[9px] text-[#059669] font-medium block">Threshold &ge;85%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center min-w-[110px]">
              <span className="text-[10px] font-bold text-[#0071e3] uppercase block">Practicals</span>
              <span className="text-xl font-extrabold text-[#0071e3] block mt-0.5">3 / 4</span>
              <span className="text-[9px] text-[#0071e3] font-medium block">Avg: 94/100</span>
            </div>
          </div>
        </div>

        {/* 3 LMS Navigation Tabs */}
        <div className="pt-6 flex flex-wrap items-center gap-2">
          {[
            { id: "curriculum", label: "Weekly Syllabus & Lab Guides", icon: BookOpen },
            { id: "assignments", label: "Practical Lab Submissions (4)", icon: FileCode2 },
            { id: "certificate", label: "Official VTU Certificate", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isCurrent
                    ? "bg-[#0071e3] text-white shadow-[0_4px_14px_rgba(0,113,227,0.25)]"
                    : "bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CURRICULUM & WEEKLY MODULES */}
      {activeTab === "curriculum" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Week Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {weeklyCurriculum.map((w) => (
              <button
                key={w.weekNumber}
                onClick={() => setSelectedWeek(w.weekNumber)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                  selectedWeek === w.weekNumber
                    ? "bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-sm"
                    : "bg-white text-[#6e6e73] border-[#e5e5ea] hover:border-[#86868b]"
                }`}
              >
                Week {w.weekNumber}: {w.title.split(" & ")[0]}
              </button>
            ))}
          </div>

          {/* Detailed Week Module Card */}
          {(() => {
            const mod = weeklyCurriculum.find((w) => w.weekNumber === selectedWeek) || weeklyCurriculum[0];
            return (
              <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0071e3] uppercase mb-1">
                    <span>Module 0{mod.weekNumber}</span>
                    <span>•</span>
                    <span>Week {mod.weekNumber} Curriculum</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                    {mod.summary}
                  </p>
                </div>

                {/* Practical Lab Bay Telemetry */}
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#86868b] uppercase block">Designated Laboratory Bay</span>
                    <span className="font-semibold text-[#1d1d1f] block mt-0.5">{mod.labBay}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#86868b] uppercase block">Laboratory Test Hardware</span>
                    <span className="text-[#6e6e73] block mt-0.5">{mod.equipment.join(" • ")}</span>
                  </div>
                </div>

                {/* Core Topics Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] mb-3">
                    Hands-On Technical Competencies:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mod.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea] text-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1d1d1f] font-medium leading-relaxed">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Downloadable Circuit Schematics & Notes */}
                <div className="pt-4 border-t border-[#e5e5ea]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] mb-3">
                    Laboratory Resources & Firmware Downloads:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mod.downloads.map((d) => (
                      <div
                        key={d.name}
                        className="p-3.5 rounded-2xl border border-[#e5e5ea] bg-white hover:border-[#0071e3] transition flex items-center justify-between group cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center flex-shrink-0">
                            <Download className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-[#1d1d1f] truncate block group-hover:text-[#0071e3] transition">
                              {d.name}
                            </span>
                            <span className="text-[10px] text-[#6e6e73] font-mono">{d.size} • Verified PDF</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#0071e3] group-hover:underline">
                          Download
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: PRACTICAL LAB ASSIGNMENTS & SUBMISSION */}
      {activeTab === "assignments" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">Practical Engineering Submissions</h3>
              <p className="text-xs text-[#6e6e73]">Submit GitHub firmware repositories and laboratory test reports for VTU academic grading.</p>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
              3 Graded • 1 Pending
            </div>
          </div>

          <div className="space-y-4">
            {assignments.map((lab) => (
              <div
                key={lab.id}
                className="apple-card-elevated rounded-[24px] border border-[#e5e5ea] bg-white p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-[#e5e5ea]">
                        {lab.week}
                      </span>
                      <span className="text-xs text-[#6e6e73]">Due: {lab.dueDate}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#1d1d1f] mt-1">{lab.title}</h4>
                  </div>

                  <div className="shrink-0">
                    {lab.status === "GRADED" ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Graded: {lab.score}</span>
                      </div>
                    ) : lab.status === "SUBMITTED" ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0071e3] text-xs font-bold font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Under Review</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSubmittingAssignment(lab)}
                        className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit Work</span>
                      </button>
                    )}
                  </div>
                </div>

                {lab.feedback && (
                  <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] text-xs text-[#6e6e73] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1d1d1f] block mb-0.5">Mentor Evaluation:</span>
                      <span>{lab.feedback}</span>
                    </div>
                  </div>
                )}

                {lab.githubUrl && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#6e6e73]">Submitted Repository:</span>
                    <a
                      href={lab.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#0071e3] hover:underline inline-flex items-center gap-1"
                    >
                      {lab.githubUrl}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL VTU CERTIFICATE & VERIFICATION */}
      {activeTab === "certificate" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5ea]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified by VTU-VRIF Center
                </div>
                <h3 className="text-2xl font-extrabold text-[#1d1d1f] tracking-tight">
                  Official Completion Credential
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] mt-0.5">
                  Conferred under Visvesvaraya Technological University Research & Innovation Foundation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/verify"
                  className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Public Verification Ledger</span>
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Certificate Visual Canvas */}
            <div className="p-8 sm:p-12 rounded-[28px] border-2 border-[#e5e5ea] bg-gradient-to-br from-white via-[#fbfbfd] to-[#f5f5f7] relative overflow-hidden shadow-inner text-center space-y-6">
              {/* Gold seal & Header */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#eab308] via-[#fef08a] to-[#ca8a04] flex items-center justify-center text-white shadow-md border-2 border-white">
                  <Award className="w-8 h-8 text-amber-900" />
                </div>
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#0071e3]">
                  Visvesvaraya Technological University • VRIF Center
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                  Certificate of Internship Excellence
                </h4>
              </div>

              <div className="max-w-2xl mx-auto space-y-3 text-sm text-[#6e6e73] leading-relaxed">
                <p>This is to certify that</p>
                <p className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f]">
                  {user?.full_name || "Enrolled Scholar"}
                </p>
                <p className="font-mono text-xs text-[#0071e3] font-bold">
                  University Seat Number (USN): Verified
                </p>
                <p className="text-xs text-[#6e6e73]">
                  Has successfully fulfilled the engineering laboratory syllabus requirements in
                </p>
                <p className="text-base sm:text-lg font-bold text-[#1d1d1f]">
                  Industrial Power Electronics & High-Frequency Magnetics
                </p>
                <p className="text-xs text-[#6e6e73]">
                  conducted inside the <span className="font-semibold text-[#1d1d1f]">VTU-VRIF-TCOE Campus Facility</span>, Bengaluru.
                </p>
              </div>

              {/* Signatures & Security Hash */}
              <div className="pt-8 border-t border-[#e5e5ea] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-center items-center">
                <div>
                  <div className="font-serif italic text-base text-[#1d1d1f]">Dr. K. S. Narayanaswamy</div>
                  <span className="text-[11px] text-[#6e6e73] block mt-0.5">Director of Research, VTU-VRIF</span>
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white border border-[#e5e5ea] shadow-sm">
                    <QrCode className="w-12 h-12 text-[#1d1d1f]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#6e6e73] block">
                    Verified Digital Record
                  </span>
                </div>
                <div>
                  <div className="font-serif italic text-base text-[#1d1d1f]">Er. Shiv Bhalke</div>
                  <span className="text-[11px] text-[#6e6e73] block mt-0.5">Managing Director, SMPS Electric Control</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e5ea] text-[10px] font-mono text-[#86868b]">
                Cryptographic Ledger Signature: SHA256:7b4942b9c06b3252...2c28add3f36d49a3 • Verified Immutable
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Submission Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e5ea]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0071e3] uppercase">
                  {submittingAssignment.week} Submission
                </span>
                <h3 className="text-base font-bold text-[#1d1d1f] truncate max-w-sm mt-0.5">
                  {submittingAssignment.title}
                </h3>
              </div>
              <button
                onClick={() => setSubmittingAssignment(null)}
                className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-[#86868b] hover:text-[#1d1d1f]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#10b981] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#1d1d1f]">Lab Work Submitted!</h4>
                <p className="text-xs text-[#6e6e73] max-w-xs mx-auto">
                  Your project code and laboratory report have been delivered to your VTU-VRIF mentor for evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    GitHub Code Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={githubRepoUrl}
                    onChange={(e) => setGithubRepoUrl(e.target.value)}
                    placeholder="https://github.com/your-username/vtu-lab-capstone"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Hardware Demo Video / Cloud Drive Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoVideoUrl}
                    onChange={(e) => setDemoVideoUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Engineering Notes & Key Findings
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Briefly describe your hardware test bench results, waveforms observed, and any encountered anomalies..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittingAssignment(null)}
                    className="px-5 py-2.5 rounded-full border border-[#e5e5ea] text-xs font-semibold text-[#6e6e73] hover:bg-[#f5f5f7]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition disabled:opacity-60 inline-flex items-center gap-1.5"
                  >
                    {isSubmitting ? "Uploading..." : "Confirm & Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
