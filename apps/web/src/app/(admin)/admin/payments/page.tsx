"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  IndianRupee,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Receipt,
  Activity,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export interface PaymentRecord {
  id: string;
  order_id?: string | null;
  application_id?: string | null;
  reference_type: string;
  gateway_provider: string;
  gateway_order_id?: string | null;
  gateway_payment_id?: string | null;
  amount: number | string;
  currency: string;
  status: "INITIATED" | "SUCCESS" | "FAILED" | "REFUNDED";
  created_at: string;
  updated_at: string;
}

const INITIAL_DEMO_PAYMENTS: PaymentRecord[] = [];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/payments/admin/all");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPayments(data);
        } else {
          setPayments([]);
        }
      } else {
        setPayments([]);
      }
    } catch {
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const formatINR = (val: number | string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(val));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const metrics = useMemo(() => {
    const totalCount = payments.length;
    const successPayments = payments.filter((p) => p.status === "SUCCESS");
    const totalCollections = successPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    const successRate = totalCount > 0 ? Math.round((successPayments.length / totalCount) * 100) : 0;
    const pendingCount = payments.filter((p) => p.status === "INITIATED").length;

    return { totalCount, totalCollections, successRate, pendingCount };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      if (statusFilter !== "ALL" && payment.status !== statusFilter) {
        return false;
      }
      if (typeFilter !== "ALL" && payment.reference_type !== typeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchPid = (payment.gateway_payment_id || "").toLowerCase().includes(q);
        const matchOid = (payment.gateway_order_id || "").toLowerCase().includes(q);
        const matchRef = (payment.order_id || payment.application_id || "").toLowerCase().includes(q);
        if (!matchPid && !matchOid && !matchRef) return false;
      }
      return true;
    });
  }, [payments, statusFilter, typeFilter, searchQuery]);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">Payment Reconciliation</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              Razorpay Settlement Reconciliation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Payment Audits & Settlement Logs
            </h1>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Audit gateway payment IDs, HMAC-SHA256 signature verifications, and real-time bank settlements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPayments}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-white hover:bg-[#fbfbfd] text-[#6e6e73] border border-[#e5e5ea] transition shadow-xs"
              title="Refresh Settlements"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Webhook: Active (HMAC-SHA256)
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Gross Collections</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-3 block">
            {formatINR(metrics.totalCollections)}
          </span>
          <span className="text-xs text-[#86868b] mt-1 block">Verified settlements</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Total Transactions</span>
            <CreditCard className="w-5 h-5 text-[#0071e3]" />
          </div>
          <span className="text-3xl font-extrabold text-[#1d1d1f] mt-3 block">{metrics.totalCount}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Orders + Course intakes</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Gateway Success Rate</span>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-3xl font-extrabold text-purple-600 mt-3 block">{metrics.successRate}%</span>
          <span className="text-xs text-[#86868b] mt-1 block">Zero unauthorized chargebacks</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Awaiting Signature</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600 mt-3 block">{metrics.pendingCount}</span>
          <span className="text-xs text-amber-700/80 mt-1 block">Pending customer checkout</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="apple-card-elevated p-4 sm:p-5 rounded-[24px] border border-[#e5e5ea] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Payment ID (pay_...), Order ID (order_...), or Reference..."
            className="w-full pl-10 pr-4 py-2 bg-[#fbfbfd] text-[#1d1d1f] placeholder-[#86868b] text-xs sm:text-sm rounded-xl border border-[#e5e5ea] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">Success (Captured)</option>
            <option value="INITIATED">Initiated (Pending)</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="ALL">All Types</option>
            <option value="ORDER">Hardware / Store Orders</option>
            <option value="ENROLLMENT">Internship Enrollments</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#fbfbfd] text-[#86868b] uppercase font-semibold text-[11px] tracking-wider border-b border-[#e5e5ea]">
              <tr>
                <th className="py-3.5 px-5">Payment ID & Gateway</th>
                <th className="py-3.5 px-5">Gateway Order ID</th>
                <th className="py-3.5 px-5">Type & Reference</th>
                <th className="py-3.5 px-5">Amount (INR)</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-5 text-right">Tax Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea]">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#86868b]">
                    No payment reconciliation records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  const paymentTime = new Date(p.created_at).toLocaleString("en-IN", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={p.id} className="hover:bg-[#fbfbfd] transition">
                      {/* Payment ID & Provider */}
                      <td className="py-3.5 px-5">
                        {p.gateway_payment_id ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#0071e3] block">
                              {p.gateway_payment_id}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(p.gateway_payment_id!, p.id)}
                              className="text-[#86868b] hover:text-[#1d1d1f] transition p-1"
                              title="Copy ID"
                            >
                              {copiedId === p.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="font-mono text-[#86868b] italic">pay_awaiting_capture</span>
                        )}
                        <span className="text-[11px] text-[#6e6e73] font-semibold block mt-0.5">
                          {p.gateway_provider}
                        </span>
                      </td>

                      {/* Gateway Order ID */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono text-[#1d1d1f] block">
                          {p.gateway_order_id || "N/A"}
                        </span>
                      </td>

                      {/* Reference Type & ID */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            p.reference_type === "ORDER"
                              ? "bg-blue-50 text-[#0071e3] border border-blue-200"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}
                        >
                          {p.reference_type}
                        </span>
                        <span className="font-mono text-[10px] text-[#86868b] block mt-1 truncate max-w-[140px]">
                          {p.order_id || p.application_id || "N/A"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-5 font-mono font-bold text-[#1d1d1f] text-sm">
                        {formatINR(p.amount)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">
                        {p.status === "SUCCESS" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Success
                          </span>
                        ) : p.status === "INITIATED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            Initiated
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
                            <XCircle className="w-3.5 h-3.5" />
                            {p.status}
                          </span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-5 text-xs text-[#6e6e73] whitespace-nowrap">
                        {paymentTime}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-5 text-right">
                        {p.order_id ? (
                          <Link
                            href={`/receipts?order_id=${p.order_id}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fbfbfd] hover:bg-white text-[#1d1d1f] hover:text-[#0071e3] border border-[#e5e5ea] text-xs font-semibold transition shadow-xs"
                          >
                            <Receipt className="w-3.5 h-3.5 text-[#0071e3]" />
                            Invoice
                            <ArrowUpRight className="w-3 h-3 text-[#86868b]" />
                          </Link>
                        ) : (
                          <span className="text-xs text-[#86868b]">N/A</span>
                        )}
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
