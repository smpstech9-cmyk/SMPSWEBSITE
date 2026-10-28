"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface OrderItem {
  id: string;
  sku_id: string;
  quantity: number;
  unit_price_inr: string | number;
  tax_rate_percent: string | number;
  total_price_inr: string | number;
  sku_code?: string;
  title?: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal_inr: string | number;
  tax_inr: string | number;
  shipping_fee_inr: string | number;
  total_inr: string | number;
  tracking_number?: string | null;
  carrier_name?: string | null;
  created_at: string;
  items: OrderItem[];
}

const DEMO_ORDERS: Order[] = [];

export default function StudentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/v1/orders/me");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setOrders(data);
          }
        }
      } catch {
        // demo fallback
      }
    }
    loadOrders();
  }, []);

  const formatINR = (val: string | number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(val));

  return (
    <div className="w-full p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#e5e5ea] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-3">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[#6e6e73]">SMPS Warehouse</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">Laboratory Equipment Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            My Hardware <span className="text-gradient-apple-blue">Orders</span>
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#6e6e73]">
            Track delivery consignments, check transit milestones, and download official Indian GST invoices.
          </p>
        </div>

        <Link
          href="/store"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition self-start sm:self-center"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Store</span>
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-12 text-center space-y-4 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto shadow-sm">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">No Orders Placed Yet</h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed max-w-sm mx-auto">
              You haven&apos;t placed any hardware or component orders yet. When you order equipment, your fulfillment and dispatch tracking will appear here.
            </p>
            <div className="pt-2">
              <Link
                href="/store"
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Browse Hardware Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          orders.map((order) => {
          const isDelivered = order.status === "DELIVERED";
          return (
            <div
              key={order.id}
              className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Top Order Metadata Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e5ea] text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1d1d1f] text-sm">{order.order_number}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        isDelivered
                          ? "bg-emerald-50 text-[#059669] border border-emerald-200"
                          : "bg-blue-50 text-[#0071e3] border border-blue-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <span className="text-[#6e6e73] block">
                    Placed on: {new Date(order.created_at).toLocaleDateString("en-IN", { dateStyle: "long" })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/receipts?orderId=${order.id}&orderNumber=${order.order_number}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Download GST Invoice</span>
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-[#e5e5ea]">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center text-[#0071e3] flex-shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1d1d1f]">{item.title || "Hardware Component"}</h4>
                        <span className="text-[#6e6e73] font-mono block mt-0.5">
                          SKU: {item.sku_code || "SMPS-DEV-KIT"} • Quantity: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#1d1d1f] whitespace-nowrap">
                      {formatINR(item.total_price_inr)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Courier & Tracking Ribbon */}
              {order.tracking_number && (
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#0071e3]" />
                    <span className="text-[#6e6e73]">
                      Carrier: <strong className="text-[#1d1d1f]">{order.carrier_name}</strong>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[#0071e3] font-semibold">
                      AWB: {order.tracking_number}
                    </span>
                  </div>
                  <span className="text-[#059669] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tracking Verified
                  </span>
                </div>
              )}

              {/* Order Financial Summary */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6e6e73] border-t border-[#e5e5ea]">
                <span>Includes 18% Indian GST (CGST + SGST compliant)</span>
                <span className="text-sm font-extrabold text-[#1d1d1f] mt-1 sm:mt-0">
                  Total Paid: {formatINR(order.total_inr)}
                </span>
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
}
