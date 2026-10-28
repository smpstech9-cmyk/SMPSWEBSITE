"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
  BookOpen,
  IndianRupee,
  Trash2,
  Globe,
  Link2,
  X,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { InternshipProgram, Batch } from "@/types";

export interface ExtendedInternshipProgram extends InternshipProgram {
  apply_portal_url?: string;
}

const STORAGE_KEY = "smps_admin_internships_catalog_v2";

const DEFAULT_PROGRAMS: ExtendedInternshipProgram[] = [
  {
    id: "d1000000-0000-0000-0000-000000000001",
    slug: "vtu-power-electronics-smps",
    title: "Power Electronics & High-Frequency SMPS Design",
    domain: "Power Electronics",
    target_branches: ["ECE", "EEE", "TE"],
    description: "Comprehensive hands-on internship covering topology selection (Buck, Boost, Flyback, LLC Resonant), magnetic transformer design, PCB layout for EMI/EMC compliance, and hardware debugging in our Bengaluru VTU-VRIF facility.",
    syllabus_json: {},
    eligibility_criteria: "3rd or 4th year B.E./B.Tech/M.Tech students",
    duration_weeks: 4,
    is_active: true,
    apply_portal_url: "",
    batches: [
      {
        id: "e1000000-0000-0000-0000-000000000001",
        program_id: "d1000000-0000-0000-0000-000000000001",
        batch_code: "VTU-PE-2026-B1",
        start_date: "2026-11-15",
        end_date: "2026-12-15",
        mode: "OFFLINE_BENGALURU_VTU",
        location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
        capacity: 30,
        enrolled_count: 14,
        price_inr: "6500.00",
        is_open: true,
      },
      {
        id: "e1000000-0000-0000-0000-000000000002",
        program_id: "d1000000-0000-0000-0000-000000000001",
        batch_code: "VTU-PE-2026-B2",
        start_date: "2026-12-20",
        end_date: "2027-01-20",
        mode: "OFFLINE_BENGALURU_VTU",
        location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
        capacity: 30,
        enrolled_count: 6,
        price_inr: "6500.00",
        is_open: true,
      },
    ],
  },
  {
    id: "d1000000-0000-0000-0000-000000000002",
    slug: "vtu-ev-bms-embedded",
    title: "EV Battery Management Systems (BMS) & Firmware",
    domain: "Electric Vehicles & Embedded",
    target_branches: ["ECE", "EEE", "CSE", "MECH"],
    description: "Hands-on engineering of smart BMS architecture, active/passive cell balancing, SoC estimation algorithms, CAN communication, and fault diagnosis following AIS-156 safety norms.",
    syllabus_json: {},
    eligibility_criteria: "Engineering students affiliated with VTU",
    duration_weeks: 4,
    is_active: true,
    apply_portal_url: "",
    batches: [
      {
        id: "e1000000-0000-0000-0000-000000000003",
        program_id: "d1000000-0000-0000-0000-000000000002",
        batch_code: "VTU-BMS-2026-B1",
        start_date: "2026-11-20",
        end_date: "2026-12-20",
        mode: "OFFLINE_BENGALURU_VTU",
        location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
        capacity: 25,
        enrolled_count: 18,
        price_inr: "7500.00",
        is_open: true,
      },
    ],
  },
  {
    id: "d1000000-0000-0000-0000-000000000003",
    slug: "saralachip-embedded-dsp",
    title: "SaralaChip™ Embedded DSP Firmware & Motor Control",
    domain: "Semiconductors & DSP",
    target_branches: ["ECE", "EEE", "CSE", "VLSI"],
    description: "Closed-loop space vector PWM generation, Clarke/Park transforms, hardware interrupt servicing, and real-time simulator validation on the indigenous SaralaChip™ development board.",
    syllabus_json: {},
    eligibility_criteria: "Pre-final & final year engineering students with C programming basics",
    duration_weeks: 4,
    is_active: true,
    apply_portal_url: "",
    batches: [
      {
        id: "e1000000-0000-0000-0000-000000000004",
        program_id: "d1000000-0000-0000-0000-000000000003",
        batch_code: "VTU-DSP-2026-B1",
        start_date: "2026-12-01",
        end_date: "2026-12-30",
        mode: "OFFLINE_BENGALURU_VTU",
        location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
        capacity: 20,
        enrolled_count: 9,
        price_inr: "8000.00",
        is_open: true,
      },
    ],
  },
];

export default function AdminInternshipsManagementPage() {
  const [programs, setPrograms] = useState<ExtendedInternshipProgram[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProgramForBatch, setSelectedProgramForBatch] = useState<ExtendedInternshipProgram | null>(null);
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);
  const [editingApplyUrlProgramId, setEditingApplyUrlProgramId] = useState<string | null>(null);
  const [applyUrlInput, setApplyUrlInput] = useState("");

  // New Program Form state
  const [newProgTitle, setNewProgTitle] = useState("");
  const [newProgDomain, setNewProgDomain] = useState("Power Electronics");
  const [newProgBranches, setNewProgBranches] = useState("ECE, EEE, CSE");
  const [newProgDuration, setNewProgDuration] = useState(4);
  const [newProgDescription, setNewProgDescription] = useState("");
  const [newProgEligibility, setNewProgEligibility] = useState("VTU affiliated engineering students");
  const [newProgApplyUrl, setNewProgApplyUrl] = useState("");

  // New Batch Form state
  const [newBatchCode, setNewBatchCode] = useState("");
  const [newStartDate, setNewStartDate] = useState("2027-01-15");
  const [newEndDate, setNewEndDate] = useState("2027-02-15");
  const [newCapacity, setNewCapacity] = useState(30);
  const [newPrice, setNewPrice] = useState("6500.00");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load programs from local storage or API
  useEffect(() => {
    function loadStored() {
      setIsLoading(true);
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPrograms(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fallback
      }
      setPrograms(DEFAULT_PROGRAMS);
      setIsLoading(false);
    }
    loadStored();
  }, []);

  const savePrograms = (updated: ExtendedInternshipProgram[]) => {
    setPrograms(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage error
    }
  };

  // Add a brand-new VTU internship program
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgTitle.trim()) return;

    const slug = newProgTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProg: ExtendedInternshipProgram = {
      id: "prog-" + Date.now(),
      slug: slug || `vtu-track-${Date.now()}`,
      title: newProgTitle,
      domain: newProgDomain,
      target_branches: newProgBranches.split(",").map((s) => s.trim()).filter(Boolean),
      description: newProgDescription || "Intensive hands-on engineering lab track at VTU-VRIF Center.",
      syllabus_json: {},
      eligibility_criteria: newProgEligibility,
      duration_weeks: Number(newProgDuration),
      is_active: true,
      apply_portal_url: newProgApplyUrl.trim(),
      batches: [
        {
          id: "batch-" + Date.now(),
          program_id: "prog-" + Date.now(),
          batch_code: `VTU-${newProgDomain.slice(0, 3).toUpperCase()}-2027-B1`,
          start_date: "2027-01-15",
          end_date: "2027-02-15",
          mode: "OFFLINE_BENGALURU_VTU",
          location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
          capacity: 30,
          enrolled_count: 0,
          price_inr: "6500.00",
          is_open: true,
        },
      ],
    };

    const updated = [newProg, ...programs];
    savePrograms(updated);
    showToast(`VTU Track "${newProg.title}" created successfully!`);

    // Reset Form
    setNewProgTitle("");
    setNewProgDescription("");
    setNewProgApplyUrl("");
    setIsAddProgramModalOpen(false);
  };

  // Delete a VTU internship track
  const handleDeleteProgram = (progId: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete the "${title}" internship track?`)) {
      const updated = programs.filter((p) => p.id !== progId);
      savePrograms(updated);
      showToast(`Track "${title}" deleted.`);
    }
  };

  // Save modified apply portal URL
  const handleSaveApplyUrl = (progId: string) => {
    const updated = programs.map((p) =>
      p.id === progId ? { ...p, apply_portal_url: applyUrlInput.trim() } : p
    );
    savePrograms(updated);
    setEditingApplyUrlProgramId(null);
    setApplyUrlInput("");
    showToast("Application portal URL updated!");
  };

  // Add Cohort Batch to Existing Track
  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgramForBatch) return;

    const newBatch: Batch = {
      id: "batch-" + Date.now(),
      program_id: selectedProgramForBatch.id,
      batch_code: newBatchCode || `VTU-${Date.now().toString().slice(-4)}`,
      start_date: newStartDate,
      end_date: newEndDate,
      mode: "OFFLINE_BENGALURU_VTU",
      location: "VTU-VRIF-TCOE Facility, Nagarbhavi, Bengaluru",
      capacity: Number(newCapacity),
      enrolled_count: 0,
      price_inr: newPrice,
      is_open: true,
    };

    const updated = programs.map((p) =>
      p.id === selectedProgramForBatch.id
        ? { ...p, batches: [...p.batches, newBatch] }
        : p
    );

    savePrograms(updated);
    showToast(`Cohort Batch ${newBatch.batch_code} scheduled successfully!`);
    setSelectedProgramForBatch(null);
    setNewBatchCode("");
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0071e3] text-white shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          {toastMessage}
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">Internship Programs & Cohorts</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Curriculum & Cohort Controller
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              VTU Internship Program Management
            </h1>
            <p className="text-sm text-[#6e6e73] mt-1">
              Add or delete VTU internship tracks, schedule physical lab cohorts, and configure external application portal URLs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddProgramModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add VTU Track
            </button>
            <Link
              href="/admin/applications"
              className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] text-xs font-semibold transition flex items-center gap-1.5"
            >
              Review Applications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Programs & Batches List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="p-12 text-center text-[#86868b] text-sm">
            Loading programs and cohort batches...
          </div>
        ) : programs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[28px] border border-[#e5e5ea]">
            <GraduationCap className="w-12 h-12 text-[#86868b] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1d1d1f]">No Internship Tracks Configured</h3>
            <p className="text-xs text-[#6e6e73] mt-1">Click "Add VTU Track" to create an engineering curriculum.</p>
            <button
              onClick={() => setIsAddProgramModalOpen(true)}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold"
            >
              Add First Track
            </button>
          </div>
        ) : (
          programs.map((prog) => (
            <div
              key={prog.id}
              className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs"
            >
              {/* Program Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#e5e5ea] pb-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-[#0071e3] border border-blue-200">
                      {prog.domain}
                    </span>
                    <span className="text-xs text-[#6e6e73]">
                      {prog.duration_weeks} Weeks Duration
                    </span>
                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Active Curriculum
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#1d1d1f]">{prog.title}</h2>
                  <p className="text-xs text-[#6e6e73] mt-1.5 max-w-3xl leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {prog.target_branches.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-[#fbfbfd] text-[#6e6e73] px-2 py-0.5 rounded-full border border-[#e5e5ea]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Configured Application Portal URL */}
                  <div className="mt-4 pt-3 border-t border-[#f5f5f7] flex items-center gap-3 text-xs">
                    <span className="text-[#86868b] flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-[#0071e3]" /> Apply Action:
                    </span>
                    {editingApplyUrlProgramId === prog.id ? (
                      <div className="flex items-center gap-2 flex-1 max-w-md">
                        <input
                          type="url"
                          value={applyUrlInput}
                          onChange={(e) => setApplyUrlInput(e.target.value)}
                          placeholder="e.g. https://vtu.ac.in/portal or leave empty for native"
                          className="px-3 py-1 text-xs border border-[#0071e3] rounded-lg flex-1 bg-white"
                        />
                        <button
                          onClick={() => handleSaveApplyUrl(prog.id)}
                          className="px-3 py-1 bg-[#0071e3] text-white rounded-lg text-xs font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingApplyUrlProgramId(null)}
                          className="px-2 py-1 text-[#86868b] text-xs hover:text-[#1d1d1f]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {prog.apply_portal_url ? (
                          <span className="font-mono text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 max-w-xs truncate">
                            {prog.apply_portal_url}
                          </span>
                        ) : (
                          <span className="text-[#6e6e73] italic">
                            Native SMPS Admission Portal (Default)
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setEditingApplyUrlProgramId(prog.id);
                            setApplyUrlInput(prog.apply_portal_url || "");
                          }}
                          className="text-[11px] font-semibold text-[#0071e3] hover:underline"
                        >
                          Change Apply Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProgramForBatch(prog);
                      setNewBatchCode(`VTU-${prog.domain.slice(0, 2).toUpperCase()}-2027-B1`);
                    }}
                    className="px-4 py-2 rounded-full bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#0071e3]" /> Add Batch
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteProgram(prog.id, prog.title)}
                    className="p-2 rounded-full text-[#86868b] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                    title={`Delete track ${prog.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Batches Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#0071e3]" /> Scheduled Cohorts ({prog.batches.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prog.batches.map((b) => {
                    const fillPct = Math.round((b.enrolled_count / b.capacity) * 100);
                    return (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] hover:border-[#0071e3]/40 transition space-y-3.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm text-[#0071e3] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                            {b.batch_code}
                          </span>
                          <span className="font-extrabold text-sm text-[#1d1d1f]">
                            ₹{b.price_inr}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-[#6e6e73]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#86868b]" />
                            <span>{b.start_date} to {b.end_date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#86868b]" />
                            <span className="truncate">{b.location || "VTU-VRIF Center, Nagarbhavi, Bengaluru"}</span>
                          </div>
                        </div>

                        {/* Capacity Bar */}
                        <div className="pt-3 border-t border-[#e5e5ea] space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#6e6e73] flex items-center gap-1 font-medium">
                              <Users className="w-3 h-3 text-[#0071e3]" /> Enrolled Seats
                            </span>
                            <span className="font-bold text-[#1d1d1f]">
                              {b.enrolled_count} / {b.capacity} ({fillPct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#e5e5ea] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                fillPct >= 90 ? "bg-rose-500" : "bg-[#0071e3]"
                              }`}
                              style={{ width: `${Math.min(fillPct, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL 1: ADD NEW VTU TRACK */}
      {isAddProgramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[28px] border border-[#e5e5ea] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddProgramModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-[#f5f5f7] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">
              Create New VTU Internship Track
            </h3>
            <p className="text-xs text-[#6e6e73] mb-6">
              Add a new university-affiliated hardware curriculum track to the public catalog.
            </p>

            <form onSubmit={handleCreateProgram} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#6e6e73] font-semibold mb-1">Curriculum Track Title</label>
                <input
                  type="text"
                  value={newProgTitle}
                  onChange={(e) => setNewProgTitle(e.target.value)}
                  placeholder="e.g. VLSI & FPGA Digital Chip Design"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">Domain Classification</label>
                  <select
                    value={newProgDomain}
                    onChange={(e) => setNewProgDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  >
                    <option value="Power Electronics">Power Electronics</option>
                    <option value="Electric Vehicles & Embedded">Electric Vehicles & Embedded</option>
                    <option value="Semiconductors & DSP">Semiconductors & DSP</option>
                    <option value="IoT & Smart Energy">IoT & Smart Energy</option>
                    <option value="Robotics & Automation">Robotics & Automation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    value={newProgDuration}
                    onChange={(e) => setNewProgDuration(Number(e.target.value))}
                    min={1}
                    max={12}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6e6e73] font-semibold mb-1">Target Engineering Branches</label>
                <input
                  type="text"
                  value={newProgBranches}
                  onChange={(e) => setNewProgBranches(e.target.value)}
                  placeholder="ECE, EEE, CSE, MECH"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#6e6e73] font-semibold mb-1">Syllabus Overview / Description</label>
                <textarea
                  value={newProgDescription}
                  onChange={(e) => setNewProgDescription(e.target.value)}
                  placeholder="Laboratory curriculum and project work overview..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#6e6e73] font-semibold mb-1">
                  Custom Apply Portal URL (Optional)
                </label>
                <input
                  type="url"
                  value={newProgApplyUrl}
                  onChange={(e) => setNewProgApplyUrl(e.target.value)}
                  placeholder="https://vtu.ac.in/apply (leave empty for native SMPS admission portal)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
                <span className="text-[10px] text-[#86868b] block mt-1">
                  Configure an external Google Form / VTU ERP link, or leave blank to use the built-in admission modal.
                </span>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={() => setIsAddProgramModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#e5e5ea] text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs transition"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD BATCH MODAL */}
      {selectedProgramForBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[28px] border border-[#e5e5ea] max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedProgramForBatch(null)}
              className="absolute top-5 right-5 p-2 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-[#f5f5f7] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">
              Add Cohort Batch to {selectedProgramForBatch.title}
            </h3>
            <p className="text-xs text-[#6e6e73] mb-6">
              Define the physical laboratory seat capacity, start dates, and tuition fee.
            </p>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#6e6e73] font-semibold mb-1">Batch Code</label>
                <input
                  type="text"
                  value={newBatchCode}
                  onChange={(e) => setNewBatchCode(e.target.value)}
                  placeholder="e.g. VTU-PE-2027-B1"
                  className="w-full px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">Lab Seat Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    min={1}
                    max={100}
                    className="w-full px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#6e6e73] font-semibold mb-1">Tuition Fee (₹)</label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={() => setSelectedProgramForBatch(null)}
                  className="px-4 py-2 rounded-full border border-[#e5e5ea] text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs transition"
                >
                  Publish Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
