"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  PackageCheck,
  Ban,
  ExternalLink,
  ChevronRight,
  X,
  RefreshCw,
  FileText,
  IndianRupee,
  MapPin,
  Calendar,
} from "lucide-react";

export interface OrderItem {
  id: string;
  sku_id: string;
  sku_code: string;
  title: string;
  quantity: number;
  unit_price: number | string;
  tax_rate_percent: number | string;
  tax_amount: number | string;
  total_price: number | string;
}

export interface Order {
  id: string;
  order_number: string;
  guest_email?: string | null;
  guest_phone?: string | null;
  status: "CREATED" | "PENDING_PAYMENT" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  currency: string;
  subtotal_amount: number | string;
  tax_amount: number | string;
  shipping_amount: number | string;
  discount_amount: number | string;
  total_amount: number | string;
  shipping_address?: {
    fullName?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  } | null;
  shipping_carrier?: string | null;
  tracking_number?: string | null;
  place_of_supply_state?: string | null;
  gstin?: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

const INITIAL_DEMO_ORDERS: Order[] = [];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Status update modal
  const [activeFulfillmentOrder, setActiveFulfillmentOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order["status"]>("PROCESSING");
  const [carrierInput, setCarrierInput] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/orders/admin/all");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatINR = (val: number | string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(val));

  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const pendingFulfillment = orders.filter((o) => o.status === "PAID" || o.status === "PROCESSING").length;
    const totalRevenue = orders
      .filter((o) => o.status !== "CANCELLED" && o.status !== "REFUNDED")
      .reduce((sum, o) => sum + Number(o.total_amount), 0);
    const deliveredCount = orders.filter((o) => o.status === "DELIVERED").length;
    const deliveryRate = totalOrders > 0 ? Math.round((deliveredCount / totalOrders) * 100) : 100;

    return { totalOrders, pendingFulfillment, totalRevenue, deliveredCount, deliveryRate };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== "ALL" && order.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = order.order_number.toLowerCase().includes(q);
        const matchesEmail = order.guest_email?.toLowerCase().includes(q);
        const matchesCust = order.shipping_address?.fullName?.toLowerCase().includes(q);
        const matchesCity = order.shipping_address?.city?.toLowerCase().includes(q);
        const matchesTrack = order.tracking_number?.toLowerCase().includes(q);
        if (!matchesNum && !matchesEmail && !matchesCust && !matchesCity && !matchesTrack) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const openFulfillment = (order: Order) => {
    setActiveFulfillmentOrder(order);
    setNewStatus(order.status);
    setCarrierInput(order.shipping_carrier || "Blue Dart Express");
    setTrackingInput(order.tracking_number || "");
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFulfillmentOrder) return;

    setIsUpdating(true);
    try {
      await fetch(`/api/v1/orders/admin/${activeFulfillmentOrder.id}/fulfillment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          shipping_carrier: carrierInput || null,
          tracking_number: trackingInput || null,
        }),
      });
    } catch {
      // fallback
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === activeFulfillmentOrder.id
          ? {
              ...o,
              status: newStatus,
              shipping_carrier: carrierInput || null,
              tracking_number: trackingInput || null,
              updated_at: new Date().toISOString(),
            }
          : o
      )
    );
    showToast(`Order ${activeFulfillmentOrder.order_number} status updated to ${newStatus}.`);
    setIsUpdating(false);
    setActiveFulfillmentOrder(null);
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            Processing
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-200 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            In Transit
          </span>
        );
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
            <PackageCheck className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
            <Ban className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
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

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">Store Orders & Logistics</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              Order Fulfillment Subsystem
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Orders & Shipments Management
            </h1>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Track customer checkouts, dispatch consignments, generate GST tax invoices, and monitor pan-India deliveries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-white hover:bg-[#fbfbfd] text-[#6e6e73] border border-[#e5e5ea] transition shadow-xs"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold transition shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-[#0071e3]" />
              Test Public Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-[#0071e3]" />
          </div>
          <span className="text-3xl font-extrabold text-[#1d1d1f] mt-3 block">{metrics.totalOrders}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Customer checkouts</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Pending Dispatch</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600 mt-3 block">{metrics.pendingFulfillment}</span>
          <span className="text-xs text-amber-700/80 mt-1 block">Awaiting warehouse packaging</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Order Revenue</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-700 mt-3 block">{formatINR(metrics.totalRevenue)}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Gross GST-inclusive billing</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Delivery Rate</span>
            <PackageCheck className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-3xl font-extrabold text-purple-600 mt-3 block">{metrics.deliveryRate}%</span>
          <span className="text-xs text-[#86868b] mt-1 block">{metrics.deliveredCount} parcels delivered</span>
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
            placeholder="Search by Order #, Customer, Email, City or Tracking Number..."
            className="w-full pl-10 pr-4 py-2 bg-[#fbfbfd] text-[#1d1d1f] placeholder-[#86868b] text-xs sm:text-sm rounded-xl border border-[#e5e5ea] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-[#86868b]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid (Ready to Pack)</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped (In Transit)</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CREATED">Created (Awaiting Payment)</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#fbfbfd] text-[#86868b] uppercase font-semibold text-[11px] tracking-wider border-b border-[#e5e5ea]">
              <tr>
                <th className="py-3.5 px-5">Order Number & Date</th>
                <th className="py-3.5 px-5">Customer & Destination</th>
                <th className="py-3.5 px-5">Items Ordered</th>
                <th className="py-3.5 px-5">Total Amount</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Carrier & Tracking</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#86868b]">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const customerName = order.shipping_address?.fullName || "Guest Customer";
                  const destination = order.shipping_address
                    ? `${order.shipping_address.city}, ${order.shipping_address.state}`
                    : order.place_of_supply_state || "India";
                  const orderDate = new Date(order.created_at).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={order.id} className="hover:bg-[#fbfbfd] transition">
                      {/* Order Number & Date */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-bold text-[#0071e3] block">{order.order_number}</span>
                        <div className="flex items-center gap-1 text-[11px] text-[#6e6e73] mt-0.5">
                          <Calendar className="w-3 h-3 text-[#86868b]" />
                          <span>{orderDate}</span>
                        </div>
                      </td>

                      {/* Customer & Destination */}
                      <td className="py-3.5 px-5">
                        <span className="font-semibold text-[#1d1d1f] block">{customerName}</span>
                        <div className="flex items-center gap-1 text-[11px] text-[#6e6e73]">
                          <MapPin className="w-3 h-3 text-[#86868b]" />
                          <span>{destination}</span>
                        </div>
                        {order.guest_email && (
                          <span className="text-[11px] text-[#0071e3] block truncate max-w-[180px]">
                            {order.guest_email}
                          </span>
                        )}
                      </td>

                      {/* Items Ordered */}
                      <td className="py-3.5 px-5">
                        <span className="text-xs text-[#1d1d1f] font-medium block">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </span>
                        <span className="text-[11px] text-[#6e6e73] block truncate max-w-[200px]">
                          {order.items.map((i) => `${i.quantity}x ${i.title}`).join(", ")}
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-bold text-[#1d1d1f] block">
                          {formatINR(order.total_amount)}
                        </span>
                        <span className="text-[11px] text-[#6e6e73] block">
                          incl. {formatINR(order.tax_amount)} GST
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">{getStatusBadge(order.status)}</td>

                      {/* Carrier & Tracking */}
                      <td className="py-3.5 px-5">
                        {order.tracking_number ? (
                          <div>
                            <span className="text-xs text-[#1d1d1f] font-medium block">
                              {order.shipping_carrier || "Standard Carrier"}
                            </span>
                            <span className="text-[11px] font-mono text-[#0071e3] block">
                              {order.tracking_number}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#86868b] italic">Not assigned yet</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/receipts?order_number=${order.order_number}`}
                            target="_blank"
                            title="Print Tax Invoice"
                            className="p-1.5 rounded-full bg-[#fbfbfd] hover:bg-white text-[#6e6e73] hover:text-[#0071e3] transition border border-[#e5e5ea] shadow-xs"
                          >
                            <FileText className="w-4 h-4 text-[#0071e3]" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openFulfillment(order)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0071e3] border border-blue-200 text-xs font-semibold transition"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fulfillment & Status Modal */}
      {activeFulfillmentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="apple-card-elevated bg-white border border-[#e5e5ea] rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#1d1d1f]">
            <button
              onClick={() => setActiveFulfillmentOrder(null)}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#fbfbfd] hover:bg-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center text-xs font-bold transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-[#0071e3]" />
              <h2 className="text-lg font-bold text-[#1d1d1f]">Update Order Fulfillment</h2>
            </div>

            <div className="bg-[#fbfbfd] p-4 rounded-2xl border border-[#e5e5ea] mb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0071e3]">
                  {activeFulfillmentOrder.order_number}
                </span>
                <span className="text-xs font-bold text-emerald-600 font-mono">
                  {formatINR(activeFulfillmentOrder.total_amount)}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#1d1d1f] block mt-1">
                {activeFulfillmentOrder.shipping_address?.fullName || "Guest Customer"}
              </span>
              <span className="text-xs text-[#6e6e73] block mt-0.5">
                {activeFulfillmentOrder.shipping_address?.addressLine1},{" "}
                {activeFulfillmentOrder.shipping_address?.city},{" "}
                {activeFulfillmentOrder.shipping_address?.state} -{" "}
                {activeFulfillmentOrder.shipping_address?.pincode}
              </span>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                  Order Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Order["status"])}
                  className="w-full px-3.5 py-2.5 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                >
                  <option value="CREATED">CREATED (Pending Checkout)</option>
                  <option value="PAID">PAID (Payment Verified)</option>
                  <option value="PROCESSING">PROCESSING (Packaging / QC)</option>
                  <option value="SHIPPED">SHIPPED (In Transit)</option>
                  <option value="DELIVERED">DELIVERED (Fulfilled)</option>
                  <option value="CANCELLED">CANCELLED (Restock items)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                  Shipping Logistics Carrier
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blue Dart Express, Delhivery Surface, DTDC"
                  value={carrierInput}
                  onChange={(e) => setCarrierInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                  Air Waybill (AWB) / Tracking Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. BLUEDART-BLR-892182"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={() => setActiveFulfillmentOrder(null)}
                  className="px-4 py-2 rounded-full border border-[#e5e5ea] text-[#6e6e73] text-xs font-semibold hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  {isUpdating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  Save Fulfillment Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
