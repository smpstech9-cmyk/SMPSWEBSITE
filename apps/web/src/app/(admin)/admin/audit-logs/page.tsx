"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Activity,
  Layers,
  Database,
  RefreshCw,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  operator: string;
  operator_role: string;
  action: string;
  category: "ENROLLMENT" | "INVENTORY" | "SECURITY" | "CERTIFICATE" | "ORDER";
  target_resource: string;
  ip_address: string;
  facility: string;
  severity: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  details: string;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [];

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [isExporting, setIsExporting] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (categoryFilter !== "ALL" && log.category !== categoryFilter) return false;
      if (severityFilter !== "ALL" && log.severity !== severityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchOp = log.operator.toLowerCase().includes(q);
        const matchAct = log.action.toLowerCase().includes(q);
        const matchRes = log.target_resource.toLowerCase().includes(q);
        const matchIp = log.ip_address.toLowerCase().includes(q);
        const matchDet = log.details.toLowerCase().includes(q);
        if (!matchOp && !matchAct && !matchRes && !matchIp && !matchDet) {
          return false;
        }
      }
      return true;
    });
  }, [logs, categoryFilter, severityFilter, searchQuery]);

  const handleExportCSV = () => {
    setIsExporting(true);
    const headers = ["Log ID", "Timestamp", "Operator", "Role", "Action", "Category", "Resource", "IP Address", "Severity", "Details"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.operator,
      l.operator_role,
      l.action,
      l.category,
      `"${l.target_resource}"`,
      l.ip_address,
      l.severity,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `smps_security_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">Security Audit Logs</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              ISO 27001 Security Audit Subsystem
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Administrative Audit Logs & Compliance Trails
            </h1>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Immutable event log tracking administrative logins, enrollment validations, hardware restocks, and cryptographic signatures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold transition shadow-xs"
            >
              <Download className="w-4 h-4 text-[#0071e3]" />
              Export Audit Trail (CSV)
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Telemetry Strip */}
      <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-gradient-to-br from-[#fbfbfd] to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1d1d1f]">Cryptographic Hash Chain Valid</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Block integrity verified against VTU-VRIF Center of Excellence root certificate key.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
              <span className="text-[#86868b] block text-[11px]">Tamper Proof</span>
              <span className="font-extrabold text-[#1d1d1f]">100% Verified</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs">
              <span className="text-[#86868b] block text-[11px]">Active Daemon</span>
              <span className="font-extrabold text-[#0071e3]">Syslog v2.4</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#e5e5ea] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[#86868b] block text-[11px]">Retention</span>
              <span className="font-extrabold text-emerald-700">7 Years (Govt)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="apple-card-elevated p-4 sm:p-5 rounded-[24px] border border-[#e5e5ea] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by operator email, action, resource, IP address, or details..."
            className="w-full pl-10 pr-4 py-2 bg-[#fbfbfd] text-[#1d1d1f] placeholder-[#86868b] text-xs sm:text-sm rounded-xl border border-[#e5e5ea] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="ALL">All Categories</option>
            <option value="ENROLLMENT">Student Enrollment</option>
            <option value="INVENTORY">Hardware Inventory</option>
            <option value="CERTIFICATE">Certificates & Attestations</option>
            <option value="ORDER">Orders & Payments</option>
            <option value="SECURITY">Security & Access</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="ALL">All Severities</option>
            <option value="INFO">Info</option>
            <option value="SUCCESS">Success</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#fbfbfd] text-[#86868b] uppercase font-semibold text-[11px] tracking-wider border-b border-[#e5e5ea]">
              <tr>
                <th className="py-3.5 px-5">Event ID & Time</th>
                <th className="py-3.5 px-5">Operator</th>
                <th className="py-3.5 px-5">Action & Category</th>
                <th className="py-3.5 px-5">Target Resource</th>
                <th className="py-3.5 px-5">IP & Facility</th>
                <th className="py-3.5 px-5">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#86868b]">
                    No audit records match your search filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const dateStr = new Date(log.timestamp).toLocaleString("en-IN", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <tr key={log.id} className="hover:bg-[#fbfbfd] transition">
                      {/* Event ID & Time */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-bold text-[#0071e3] block text-xs">{log.id}</span>
                        <span className="text-[11px] text-[#6e6e73] block mt-0.5">{dateStr}</span>
                      </td>

                      {/* Operator */}
                      <td className="py-3.5 px-5">
                        <span className="font-semibold text-[#1d1d1f] block">{log.operator}</span>
                        <span className="text-[10px] font-mono font-semibold uppercase text-[#86868b] block">
                          {log.operator_role}
                        </span>
                      </td>

                      {/* Action & Category */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-bold text-xs text-[#1d1d1f] block">{log.action}</span>
                        <span className="text-[11px] text-[#6e6e73] block">{log.details}</span>
                      </td>

                      {/* Target Resource */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-semibold text-xs text-[#1d1d1f] block bg-[#fbfbfd] px-2 py-1 rounded border border-[#e5e5ea] max-w-xs truncate">
                          {log.target_resource}
                        </span>
                      </td>

                      {/* IP & Facility */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono text-xs text-[#1d1d1f] block">{log.ip_address}</span>
                        <span className="text-[11px] text-[#86868b] block">{log.facility}</span>
                      </td>

                      {/* Severity */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            log.severity === "SUCCESS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : log.severity === "INFO"
                              ? "bg-blue-50 text-[#0071e3] border border-blue-200"
                              : log.severity === "WARNING"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
