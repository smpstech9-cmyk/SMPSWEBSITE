"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare,
  Trash2,
  ExternalLink,
  Download,
  RefreshCw,
  Eye,
  X,
  FileText,
} from "lucide-react";

interface RecordItem {
  id: string;
  type: "contact" | "career" | "event" | "internship" | "hardware_inquiry";
  title: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  name: string;
  email: string;
  phone?: string;
  submittedAt: string;
  data: Record<string, any>;
  notes?: string;
}

export default function OperationsRecordsPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);
  const [recordNotes, setRecordNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/records");
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
      }
    } catch (err) {
      console.error("Error loading records:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleStatusChange = async (id: string, newStatus: RecordItem["status"]) => {
    setIsUpdatingStatus(id);
    try {
      const res = await fetch("/api/records", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setRecords((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRecord) return;
    try {
      await fetch("/api/records", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRecord.id, notes: recordNotes }),
      });
      setRecords((prev) =>
        prev.map((r) => (r.id === selectedRecord.id ? { ...r, notes: recordNotes } : r))
      );
      setSelectedRecord((prev) => (prev ? { ...prev, notes: recordNotes } : null));
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api/records?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  const handleExportCsv = () => {
    if (records.length === 0) return;
    const headers = ["ID", "Type", "Title", "Name", "Email", "Phone", "Status", "Date", "Notes"];
    const rows = records.map((r) => [
      r.id,
      r.type,
      `"${(r.title || "").replace(/"/g, '""')}"`,
      `"${(r.name || "").replace(/"/g, '""')}"`,
      r.email,
      r.phone || "",
      r.status,
      new Date(r.submittedAt).toLocaleString(),
      `"${(r.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `smps_operations_records_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter((r) => {
    if (activeTypeFilter !== "all" && r.type !== activeTypeFilter) return false;
    if (activeStatusFilter !== "all" && r.status !== activeStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name?.toLowerCase().includes(q);
      const matchEmail = r.email?.toLowerCase().includes(q);
      const matchTitle = r.title?.toLowerCase().includes(q);
      const matchPhone = r.phone?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchTitle && !matchPhone) return false;
    }
    return true;
  });

  const counts = {
    total: records.length,
    new: records.filter((r) => r.status === "new").length,
    contact: records.filter((r) => r.type === "contact").length,
    career: records.filter((r) => r.type === "career").length,
    event: records.filter((r) => r.type === "event").length,
    internship: records.filter((r) => r.type === "internship").length,
  };

  const getTypeBadge = (type: RecordItem["type"]) => {
    switch (type) {
      case "contact":
        return { label: "Contact Inquiry", bg: "bg-blue-50 text-blue-700 border-blue-200", icon: MessageSquare };
      case "career":
        return { label: "Job Candidate", bg: "bg-purple-50 text-purple-700 border-purple-200", icon: Briefcase };
      case "event":
        return { label: "Event Pass", bg: "bg-amber-50 text-amber-700 border-amber-200", icon: Calendar };
      case "internship":
        return { label: "VTU Internship", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: GraduationCap };
      default:
        return { label: "General Lead", bg: "bg-gray-50 text-gray-700 border-gray-200", icon: Inbox };
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 lg:p-10 text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
              <Inbox className="w-3.5 h-3.5" />
              Live Inbound Telemetry
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Operations Records & Inbound Hub
            </h1>
            <p className="text-sm text-[#6e6e73] mt-1 font-normal">
              Unified inbox for client inquiries, job candidates, event registrations, and VTU student internships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRecords}
              className="p-2.5 rounded-full bg-white border border-[#e5e5ea] hover:bg-[#fbfbfd] text-[#1d1d1f] shadow-sm transition"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportCsv}
              disabled={records.length === 0}
              className="px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV ({records.length})</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-[#86868b] uppercase">Total Inbound</div>
            <div className="text-2xl font-black text-[#1d1d1f] mt-1">{counts.total}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-rose-600 uppercase">Unreviewed</div>
            <div className="text-2xl font-black text-rose-600 mt-1">{counts.new}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-blue-600 uppercase">Contact Leads</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{counts.contact}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-purple-600 uppercase">Careers</div>
            <div className="text-2xl font-black text-purple-600 mt-1">{counts.career}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-amber-600 uppercase">Event Passes</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{counts.event}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#e5e5ea] shadow-xs">
            <div className="text-xs font-semibold text-emerald-600 uppercase">Internships</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{counts.internship}</div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e5ea] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: `All (${counts.total})` },
                { id: "contact", label: `Contact (${counts.contact})` },
                { id: "career", label: `Careers (${counts.career})` },
                { id: "event", label: `Events (${counts.event})` },
                { id: "internship", label: `Internships (${counts.internship})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTypeFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    activeTypeFilter === tab.id
                      ? "bg-[#1d1d1f] text-white"
                      : "bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#86868b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, email, USN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-full text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>
        </div>

        {/* Main Records List / Table */}
        <div className="bg-white rounded-3xl border border-[#e5e5ea] overflow-hidden shadow-xs">
          {isLoading ? (
            <div className="p-16 text-center text-[#86868b] text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading operations records...
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <Inbox className="w-10 h-10 text-[#86868b] mx-auto" />
              <h3 className="text-base font-bold text-[#1d1d1f]">No Records Found</h3>
              <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
                No inbound leads or applications match your current search/filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e5e5ea] bg-[#fbfbfd] text-[11px] font-bold text-[#86868b] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Source / Type</th>
                    <th className="py-3.5 px-6">Subject / Headline</th>
                    <th className="py-3.5 px-6">Name & Contact</th>
                    <th className="py-3.5 px-6">Date Received</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e5ea] text-xs">
                  {filteredRecords.map((item) => {
                    const badge = getTypeBadge(item.type);
                    const Icon = badge.icon;
                    return (
                      <tr key={item.id} className="hover:bg-[#fbfbfd] transition">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                            <Icon className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#1d1d1f] line-clamp-1">{item.title}</div>
                          {item.data?.message && (
                            <div className="text-[11px] text-[#6e6e73] line-clamp-1 mt-0.5 font-normal">
                              {item.data.message}
                            </div>
                          )}
                          {item.data?.usn && (
                            <div className="text-[11px] font-mono text-[#0071e3] mt-0.5">
                              USN: {item.data.usn} • {item.data.collegeName || "VTU Affiliate"}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-[#1d1d1f]">{item.name}</div>
                          <div className="text-[11px] text-[#6e6e73] flex items-center gap-2 mt-0.5">
                            <span className="truncate max-w-[160px]">{item.email}</span>
                            {item.phone && <span>• {item.phone}</span>}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-[#6e6e73] font-mono text-[11px]">
                          {new Date(item.submittedAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <select
                            value={item.status}
                            disabled={isUpdatingStatus === item.id}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                            className={`text-[11px] font-bold rounded-full px-3 py-1 border transition focus:outline-none cursor-pointer ${
                              item.status === "new"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : item.status === "reviewed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : item.status === "contacted"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedRecord(item);
                                setRecordNotes(item.notes || "");
                              }}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-[#0071e3] transition"
                              title="Inspect Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecord(item.id)}
                              className="p-1.5 rounded-full hover:bg-rose-50 text-[#86868b] hover:text-rose-600 transition"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Record Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e5e5ea] space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${getTypeBadge(selectedRecord.type).bg}`}>
                  {getTypeBadge(selectedRecord.type).label}
                </span>
                <h3 className="text-xl font-bold text-[#1d1d1f]">{selectedRecord.title}</h3>
                <p className="text-xs text-[#86868b] font-mono">
                  Received: {new Date(selectedRecord.submittedAt).toLocaleString()} • ID: {selectedRecord.id}
                </p>
              </div>

              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#86868b] block text-[10px] uppercase font-bold">Sender Name</span>
                  <span className="font-bold text-[#1d1d1f] text-sm">{selectedRecord.name}</span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[10px] uppercase font-bold">Email Address</span>
                  <a href={`mailto:${selectedRecord.email}`} className="text-[#0071e3] hover:underline font-semibold">
                    {selectedRecord.email}
                  </a>
                </div>
                {selectedRecord.phone && (
                  <div>
                    <span className="text-[#86868b] block text-[10px] uppercase font-bold">Mobile Phone</span>
                    <a href={`tel:${selectedRecord.phone}`} className="font-semibold text-[#1d1d1f]">
                      {selectedRecord.phone}
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-[#86868b] block text-[10px] uppercase font-bold">Current Status</span>
                  <span className="font-bold capitalize">{selectedRecord.status}</span>
                </div>
              </div>

              {/* Payload Data Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                  Submission Details & Payload
                </h4>
                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-2 text-xs">
                  {Object.entries(selectedRecord.data || {}).map(([key, val]) => {
                    if (!val) return null;
                    const isUrl = typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://"));
                    return (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 py-1 border-b border-black/[0.04] last:border-0">
                        <span className="w-36 font-semibold text-[#86868b] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <div className="flex-1 text-[#1d1d1f]">
                          {isUrl ? (
                            <a href={val} target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline inline-flex items-center gap-1 font-semibold break-all">
                              <span>{val}</span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>
                          ) : (
                            <span className="whitespace-pre-wrap">{String(val)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Internal Operator Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                  Internal Operations Notes
                </label>
                <textarea
                  rows={3}
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  placeholder="Add notes for your team (e.g. called candidate, dispatched quotation on email)..."
                  className="w-full p-3 rounded-xl border border-[#e5e5ea] text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
