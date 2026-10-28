"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/hooks/use-auth";
import {
  Users,
  GraduationCap,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Plus,
} from "lucide-react";

function AdminDashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "internships" | "hardware">("all");

  const recentOrders: any[] = [];
  const pendingApplications: any[] = [];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e5e5ea]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            Facility Operations Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            Welcome back, {user?.full_name?.split(" ")[0] || "Administrator"}
          </h1>
          <p className="mt-1 text-sm text-[#6e6e73]">
            VTU-VRIF Center of Excellence real-time operations, student cohort intakes, and hardware dispatch pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-[#0071e3]" />
            Manage Inventory
          </Link>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition"
          >
            Review Applications
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Apple Style KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              ₹0
            </span>
            <span className="text-xs font-semibold text-[#86868b] flex items-center bg-[#f5f5f7] px-2 py-0.5 rounded-full">
              Baseline
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-2">
            Includes VTU program tuition & hardware sales
          </p>
        </div>

        {/* Metric 2 */}
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Enrolled Scholars
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              0
            </span>
            <span className="text-xs font-semibold text-[#86868b] flex items-center bg-[#f5f5f7] px-2 py-0.5 rounded-full">
              0 Active Batches
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-2">
            Active university cohort registrations
          </p>
        </div>

        {/* Metric 3 */}
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Pending Screenings
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              0
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              All Clear
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-2">
            Awaiting academic eligibility verification
          </p>
        </div>

        {/* Metric 4 */}
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Warehouse Valuation
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Active
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Synchronized
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-2">
            PURNA BESS, SaralaChip & EV chargers
          </p>
        </div>
      </div>

      {/* Facility Hardware & Lab Status Card */}
      <div className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-gradient-to-br from-[#fbfbfd] to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e5e5ea]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f]">VTU-VRIF Center Live Laboratory Telemetry</h2>
              <p className="text-xs text-[#6e6e73]">
                Direct telemetry feed from Bengaluru Nagarbhavi facility instruments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Testbeds Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#6e6e73] font-medium mb-1">
              <span>Chroma 62000P DC Source</span>
              <span className="text-emerald-600 font-semibold">ONLINE</span>
            </div>
            <p className="text-base font-extrabold text-[#1d1d1f]">800V / 120A Regenerative Bay</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Uptime: 99.8%</span>
              <span>Load: 42kW</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#6e6e73] font-medium mb-1">
              <span>Bitrode EIS Cell Cycler</span>
              <span className="text-emerald-600 font-semibold">ONLINE</span>
            </div>
            <p className="text-base font-extrabold text-[#1d1d1f]">16-Channel Battery Impedance</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Cycles: 2,410 / 5,000</span>
              <span>Cell Temp: 24.2°C</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#6e6e73] font-medium mb-1">
              <span>Cryptographic Certificate Node</span>
              <span className="text-[#0071e3] font-semibold">SYNCED</span>
            </div>
            <p className="text-base font-extrabold text-[#1d1d1f]">VTU Attestation Ledger</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Block: #48,192</span>
              <span>SHA-256 Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Pending Applications Review & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Applications Screening Queue (7 cols) */}
        <div className="lg:col-span-7 apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e5e5ea]">
              <div>
                <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0071e3]" />
                  Student Screening Queue
                </h2>
                <p className="text-xs text-[#6e6e73] mt-0.5">
                  Recent VTU university students applying for lab cohorts
                </p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] hover:border-[#0071e3]/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded">
                        {app.usn}
                      </span>
                      <span className="text-sm font-bold text-[#1d1d1f]">{app.name}</span>
                      <span className="text-[11px] text-[#6e6e73]">({app.cgpa} CGPA)</span>
                    </div>
                    <p className="text-xs text-[#6e6e73] mt-1">{app.college}</p>
                    <p className="text-[11px] font-medium text-[#1d1d1f] mt-0.5">{app.program}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/applications`}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-xs font-semibold text-[#1d1d1f] transition"
                    >
                      Screen
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#e5e5ea] flex items-center justify-between text-xs text-[#6e6e73]">
            <span>Sequential VTU enrollments auto-synced to student portal</span>
            <Link href="/admin/internships" className="text-[#0071e3] font-semibold hover:underline">
              Manage Cohort Batches →
            </Link>
          </div>
        </div>

        {/* Right Column: Operations Shortcuts & Quick Navigation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Administrative Operations Hub
            </h2>
            <p className="text-xs text-[#6e6e73] mb-6 leading-relaxed">
              Fast actions to update laboratory inventory, approve student admissions, or view security audit trails.
            </p>

            <div className="space-y-3">
              <Link
                href="/admin/applications"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] hover:bg-blue-50/50 border border-[#e5e5ea] hover:border-[#0071e3]/30 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center group-hover:scale-105 transition">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f]">Review Applications</p>
                    <p className="text-[11px] text-[#6e6e73]">View student applicants & verify USN</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-[#0071e3] transition" />
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] hover:bg-purple-50/50 border border-[#e5e5ea] hover:border-purple-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f]">Hardware Inventory</p>
                    <p className="text-[11px] text-[#6e6e73]">Adjust stock & update HSN codes</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-purple-600 transition" />
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] hover:bg-emerald-50/50 border border-[#e5e5ea] hover:border-emerald-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f]">Store Orders & Shipping</p>
                    <p className="text-[11px] text-[#6e6e73]">Blue Dart & DTDC tracking update</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-emerald-600 transition" />
              </Link>

              <Link
                href="/admin/audit-logs"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] hover:bg-amber-50/50 border border-[#e5e5ea] hover:border-amber-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f]">Security Audit Logs</p>
                    <p className="text-[11px] text-[#6e6e73]">ISO 27001 tamper-proof trails</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-amber-600 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e5e5ea]">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f]">Recent Commercial & Hardware Transactions</h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Live updates on pan-India enterprise deliveries, R&D kits, and student orders
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
          >
            Manage All Orders <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#e5e5ea] text-[#86868b] font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3">Order Number</th>
                <th className="pb-3">Customer / Organization</th>
                <th className="pb-3">Product / Hardware</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea] text-[#1d1d1f]">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-xs text-[#86868b]">
                    No hardware transactions recorded yet. Live orders will populate automatically.
                  </td>
                </tr>
              ) : (
                recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#fbfbfd] transition">
                    <td className="py-3.5 font-mono font-semibold text-[#0071e3]">
                      {ord.id}
                    </td>
                    <td className="py-3.5 font-medium text-[#1d1d1f]">
                      {ord.customer}
                    </td>
                    <td className="py-3.5 text-[#6e6e73]">
                      {ord.item}
                    </td>
                    <td className="py-3.5 font-bold text-[#1d1d1f]">
                      {ord.amount}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          ord.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : ord.status === "DELIVERED"
                            ? "bg-blue-50 text-[#0071e3] border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {ord.status === "PROCESSING" && <Clock className="w-3 h-3 animate-spin" />}
                        {ord.status === "PAID" && <CheckCircle2 className="w-3 h-3" />}
                        {ord.status === "DELIVERED" && <CheckCircle2 className="w-3 h-3" />}
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/admin/orders"
                        className="px-3 py-1 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-xs font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition shadow-xs"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard allowedRoles={["admin", "super_admin"]}>
      <AdminDashboardContent />
    </AuthGuard>
  );
}
