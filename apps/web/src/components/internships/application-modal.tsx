"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, Building2, GraduationCap, Calendar, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { apiClient, ApiError } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import { Application, Batch } from "@/types";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  batches: Batch[];
}

export function ApplicationModal({ isOpen, onClose, programTitle, batches }: ApplicationModalProps) {
  const { user, isAuthenticated, setDevToken } = useAuth();

  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || "");
  const [collegeName, setCollegeName] = useState<string>("");
  const [usn, setUsn] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [semester, setSemester] = useState<number>(6);
  const [cgpa, setCgpa] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  if (!isOpen) return null;

  // Real-time VTU USN format validation
  const vtuUsnRegex = /^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
  const isUsnValid = vtuUsnRegex.test(usn.trim().toUpperCase());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUsn = usn.trim().toUpperCase();
    if (!vtuUsnRegex.test(cleanUsn)) {
      setErrorMessage("Please enter a valid VTU University Seat Number (e.g. 1MS21EC045 or 1BM22CS010).");
      return;
    }

    if (!selectedBatchId) {
      setErrorMessage("Please select an available internship batch.");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure we have a valid student token (dev fallback if not logged in)
      if (!isAuthenticated) {
        const tokenRes = await apiClient<{ access_token: string }>("/auth/dev-token", {
          method: "POST",
          body: JSON.stringify({ email: "student@vtu.ac.in", role: "student" }),
        });
        await setDevToken(tokenRes.access_token);
      }

      const payload = {
        batch_id: selectedBatchId,
        college_name: collegeName.trim(),
        usn: cleanUsn,
        branch: branch.trim().toUpperCase(),
        semester: Number(semester),
        cgpa: cgpa ? Number(cgpa) : undefined,
      };

      const response = await apiClient<Application>("/internships/applications", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSubmittedApp(response);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || "Failed to submit application. Please check your inputs.");
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred while submitting your application.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white text-[#1d1d1f] w-full max-w-xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        {/* Header - Apple Clean Surface */}
        <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-[#e5e5ea] bg-[#fbfbfd] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide mb-1.5 shadow-sm">
              <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0071e3] font-semibold">University Accredited</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] tracking-tight">Apply for Internship</h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] truncate max-w-md mt-0.5">{programTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center border border-[#e5e5ea] transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedApp ? (
            /* Success confirmation */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-[#10b981] border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#1d1d1f] tracking-tight">Application Submitted!</h3>
                <p className="text-sm text-[#6e6e73] mt-1.5 max-w-md mx-auto font-normal">
                  Your VTU internship application has been officially registered with SMPS Electric Control R&D.
                </p>
              </div>

              <div className="bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl p-4 text-left space-y-2 text-xs text-[#1d1d1f]">
                <div className="flex justify-between">
                  <span className="text-[#6e6e73] font-medium">Application ID:</span>
                  <span className="font-mono font-semibold text-[#1d1d1f]">{submittedApp.id.slice(0, 13)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73] font-medium">VTU USN:</span>
                  <span className="font-mono font-semibold text-[#1d1d1f]">{submittedApp.usn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73] font-medium">College:</span>
                  <span className="font-semibold text-[#1d1d1f]">{submittedApp.college_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73] font-medium">Initial Status:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100">
                    {submittedApp.status}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/my-courses"
                  className="flex-1 py-3 px-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.3)]"
                >
                  Track in My Internships <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-6 rounded-full border border-[#e5e5ea] hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-sm transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Batch selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5 uppercase tracking-wider">
                  Select Cohort Batch *
                </label>
                <div className="space-y-2">
                  {batches.length > 0 ? (
                    batches.map((b) => (
                      <label
                        key={b.id}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition text-xs ${
                          selectedBatchId === b.id
                            ? "border-[#0071e3] bg-[#f5f5f7] ring-2 ring-[#0071e3]/30 text-[#1d1d1f] font-medium shadow-sm"
                            : "border-[#e5e5ea] bg-white hover:border-[#86868b] text-[#6e6e73]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="batch"
                            value={b.id}
                            checked={selectedBatchId === b.id}
                            onChange={() => setSelectedBatchId(b.id)}
                            className="text-[#0071e3] focus:ring-[#0071e3]"
                          />
                          <div>
                            <div className="font-bold text-[#1d1d1f]">{b.batch_code}</div>
                            <div className="text-[11px] text-[#6e6e73] mt-0.5">
                              {b.start_date} to {b.end_date} • {b.mode === "OFFLINE_BENGALURU_VTU" ? "Bengaluru VTU Facility" : "Hybrid Mode"}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#1d1d1f]">₹{b.price_inr}</span>
                          <span className="block text-[10px] text-[#059669] font-semibold">
                            {b.capacity - b.enrolled_count} seats open
                          </span>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-2xl border border-[#e5e5ea] text-xs text-[#6e6e73] bg-[#fbfbfd]">
                      Standard Batch VTU-2026-B1 (₹6,500)
                    </div>
                  )}
                </div>
              </div>

              {/* College & USN grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    VTU Seat Number (USN) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      placeholder="1MS21EC045"
                      className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-mono tracking-wider focus:outline-none uppercase transition ${
                        usn.length > 0 && !isUsnValid
                          ? "border-amber-400 bg-amber-50/20"
                          : "border-[#e5e5ea] bg-[#fbfbfd] text-[#1d1d1f] focus:border-[#0071e3] focus:bg-white"
                      }`}
                    />
                    {isUsnValid && (
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] absolute right-3 top-3" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#6e6e73] mt-1 block">
                    e.g. 1RV22CS010, 1BM22EC045
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Branch / Department *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#e5e5ea] text-sm focus:outline-none focus:border-[#0071e3] bg-[#fbfbfd] text-[#1d1d1f] transition"
                  >
                    <option value="ECE">Electronics & Communication (ECE)</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                    <option value="CSE">Computer Science & Eng (CSE)</option>
                    <option value="ISE">Information Science (ISE)</option>
                    <option value="MECH">Mechanical Engineering (MECH)</option>
                    <option value="TE">Telecommunication Eng (TE)</option>
                    <option value="AI_ML">Artificial Intelligence & ML</option>
                  </select>
                </div>
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                  Engineering College Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. BMS College of Engineering"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#e5e5ea] text-sm focus:outline-none focus:border-[#0071e3] bg-[#fbfbfd] text-[#1d1d1f] transition"
                  />
                  <Building2 className="w-4 h-4 text-[#86868b] absolute left-3 top-3" />
                </div>
              </div>

              {/* Semester & CGPA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Current Semester *
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#e5e5ea] text-sm focus:outline-none focus:border-[#0071e3] bg-[#fbfbfd] text-[#1d1d1f] transition"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Cumulative CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="8.50"
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#e5e5ea] text-sm focus:outline-none focus:border-[#0071e3] bg-[#fbfbfd] text-[#1d1d1f] transition"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#e5e5ea] text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-7 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-xs font-semibold text-white shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition flex items-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying VTU Records...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
