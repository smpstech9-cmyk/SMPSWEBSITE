"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Eye,
  UserCheck,
  AlertCircle,
  Loader2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import { Application, Enrollment } from "@/types";

export default function AdminApplicationsPage() {
  const { user, isAdmin } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Applications state (clean zero state, populated from live database)
  const defaultApps: Application[] = [];

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const endpoint = filterStatus !== "ALL"
        ? `/internships/admin/applications?status=${filterStatus}`
        : `/internships/admin/applications`;
      const data = await apiClient<Application[]>(endpoint);
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
      }
    } catch {
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const handleUpdateStatus = async (appId: string, newStatus: "APPROVED" | "REJECTED") => {
    setActionLoadingId(appId);
    try {
      await apiClient<Application>(`/internships/admin/applications/${appId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setSuccessBanner(`Application status successfully updated to ${newStatus}`);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
    } catch (err: unknown) {
      alert("Failed to update status: " + (err instanceof Error ? err.message : "Error"));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleIssueEnrollment = async (appId: string) => {
    setActionLoadingId(appId);
    try {
      const enr = await apiClient<Enrollment>(`/internships/admin/applications/${appId}/enroll`, {
        method: "POST",
      });
      setSuccessBanner(`Enrollment Confirmed! Sequential VTU ID: ${enr.enrollment_number}`);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: "ENROLLED" } : a))
      );
    } catch (err: unknown) {
      alert("Failed to confirm enrollment: " + (err instanceof Error ? err.message : "Error"));
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter query
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.usn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.branch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">VTU Internship Applications</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Screening Subsystem
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              VTU Internship Applications Review
            </h1>
            <p className="text-sm text-[#6e6e73] mt-1">
              University Seat Number (USN) validation, academic eligibility screening, and batch seat assignment.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/internships"
              className="px-4 py-2.5 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold shadow-xs transition"
            >
              Manage Cohorts
            </Link>
          </div>
        </div>
      </div>

      {/* Success Alert Banner */}
      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs font-bold px-2 py-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="apple-card-elevated p-4 sm:p-5 rounded-[24px] border border-[#e5e5ea] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by VTU USN (e.g. 1BM22EC045), College, Branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-xs text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-mono"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6e6e73] flex items-center gap-1.5 font-medium shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#fbfbfd] border border-[#e5e5ea] text-xs text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-semibold"
          >
            <option value="ALL">All Applications ({applications.length})</option>
            <option value="PENDING">Pending Review</option>
            <option value="APPROVED">Approved (Awaiting Enrollment)</option>
            <option value="ENROLLED">Enrolled (Sequential ID Issued)</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbfbfd] text-[#86868b] uppercase tracking-wider font-semibold border-b border-[#e5e5ea]">
              <tr>
                <th className="py-3.5 px-5">Student USN & College</th>
                <th className="py-3.5 px-5">Branch / Sem</th>
                <th className="py-3.5 px-5">CGPA</th>
                <th className="py-3.5 px-5">Batch Code</th>
                <th className="py-3.5 px-5">Applied Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#86868b]">
                    Loading student applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#86868b]">
                    No student applications match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#fbfbfd] transition">
                    {/* USN & College */}
                    <td className="py-3.5 px-5">
                      <div className="font-mono font-bold text-[#0071e3] text-sm tracking-wider">
                        {app.usn}
                      </div>
                      <div className="text-[11px] text-[#6e6e73] truncate max-w-xs mt-0.5">
                        {app.college_name}
                      </div>
                    </td>

                    {/* Branch & Sem */}
                    <td className="py-3.5 px-5">
                      <span className="font-semibold text-[#1d1d1f]">{app.branch}</span>
                      <span className="text-[11px] text-[#6e6e73] block">Semester {app.semester}</span>
                    </td>

                    {/* CGPA */}
                    <td className="py-3.5 px-5 font-mono font-bold text-[#1d1d1f]">
                      {app.cgpa || "N/A"}
                    </td>

                    {/* Batch */}
                    <td className="py-3.5 px-5">
                      <span className="font-mono text-[#0071e3] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                        {app.batch?.batch_code || "VTU-2026-B1"}
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td className="py-3.5 px-5 text-[#6e6e73]">
                      {new Date(app.applied_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === "ENROLLED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : app.status === "APPROVED"
                            ? "bg-blue-50 text-[#0071e3] border border-blue-200"
                            : app.status === "REJECTED"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f] transition shadow-xs"
                          title="View Full Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {app.status === "PENDING" && (
                          <>
                            <button
                              type="button"
                              disabled={actionLoadingId === app.id}
                              onClick={() => handleUpdateStatus(app.id, "APPROVED")}
                              className="px-3 py-1 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-[11px] transition shadow-xs disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={actionLoadingId === app.id}
                              onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                              className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-[11px] transition disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {app.status === "APPROVED" && (
                          <button
                            type="button"
                            disabled={actionLoadingId === app.id}
                            onClick={() => handleIssueEnrollment(app.id)}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition flex items-center gap-1 shadow-xs disabled:opacity-50"
                          >
                            {actionLoadingId === app.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                            Issue Enrollment ID
                          </button>
                        )}

                        {app.status === "ENROLLED" && (
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active Scholar
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Application Modal Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="apple-card-elevated bg-white border border-[#e5e5ea] rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-6 text-[#1d1d1f] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1d1d1f]">VTU Verification Dossier</h3>
                  <p className="text-xs text-[#6e6e73]">Academic credentials and cohort eligibility</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="w-7 h-7 rounded-full bg-[#fbfbfd] hover:bg-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center text-xs font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] flex justify-between items-center">
                <span className="text-[#6e6e73]">VTU Seat Number (USN):</span>
                <span className="font-mono font-bold text-[#0071e3] text-sm">{selectedApp.usn}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] flex justify-between items-center">
                <span className="text-[#6e6e73]">Engineering College:</span>
                <span className="font-semibold text-[#1d1d1f] text-right max-w-xs">{selectedApp.college_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
                  <span className="text-[#6e6e73] block mb-0.5">Branch:</span>
                  <span className="font-bold text-[#1d1d1f]">{selectedApp.branch}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
                  <span className="text-[#6e6e73] block mb-0.5">Semester:</span>
                  <span className="font-bold text-[#1d1d1f]">Semester {selectedApp.semester}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
                  <span className="text-[#6e6e73] block mb-0.5">Cumulative CGPA:</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">{selectedApp.cgpa || "N/A"}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
                  <span className="text-[#6e6e73] block mb-0.5">Cohort Batch:</span>
                  <span className="font-bold text-[#0071e3] font-mono">{selectedApp.batch?.batch_code || "VTU-2026-B1"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#e5e5ea]">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 rounded-full border border-[#e5e5ea] text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#fbfbfd] transition"
              >
                Close
              </button>
              {selectedApp.status === "APPROVED" && (
                <button
                  type="button"
                  onClick={() => {
                    handleIssueEnrollment(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition flex items-center gap-1.5 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Confirm Enrollment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
