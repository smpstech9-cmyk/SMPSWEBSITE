"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  FileText,
  Package,
  Tag,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { IS_HARDWARE_ORDERING_ENABLED, SHOW_HARDWARE_PRICES } from "@/lib/store-config";

export default function CartPage() {
  const {
    items,
    mounted,
    totalCount,
    subtotal,
    taxAmount,
    shippingFee,
    grandTotal,
    updateQuantity,
    removeItem,
    clear,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "VTU10") {
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      setPromoMessage("VTU Student 10% educational grant applied!");
    } else {
      setPromoMessage("Invalid or expired promotional code.");
      setPromoDiscount(0);
    }
  };

  const finalPayable = Math.max(0, grandTotal - promoDiscount);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-10 sm:py-16 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow & Keynote Typography */}
        <div className="border-b border-[#e5e5ea] pb-8 mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-3">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[#6e6e73]">SMPS Hardware Portal</span>
            <span className="text-[#86868b]">•</span>
            <span className="text-[#0071e3] font-semibold">Procurement Review</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            Hardware <span className="text-gradient-apple-blue">Shopping Cart</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#6e6e73] font-normal">
            {totalCount > 0
              ? `You have ${totalCount} item${totalCount > 1 ? "s" : ""} in your laboratory order.`
              : "Your cart is currently empty."}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#0071e3] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1d1d1f] tracking-tight">Your cart is empty</h2>
            <p className="text-sm text-[#6e6e73] mt-2 max-w-md mx-auto leading-relaxed font-normal">
              Explore our laboratory hardware catalog including PURNA BESS™ storage systems, SaralaChip™ DSP modules, and robotics dev kits.
            </p>
            <Link
              href="/store"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-full text-sm transition shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01]"
            >
              <span>Browse Hardware Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Two-Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="apple-card rounded-[28px] border border-[#e5e5ea] bg-white divide-y divide-[#e5e5ea] shadow-sm overflow-hidden">
                {items.map((item) => {
                  const itemTotal = item.price_inr * item.quantity;
                  return (
                    <div
                      key={item.sku_id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Image & Title */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] flex-shrink-0">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.product_name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-[#86868b] m-auto mt-6" />
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/store/${item.product_slug}`}
                            className="font-bold text-[#1d1d1f] hover:text-[#0071e3] text-sm sm:text-base line-clamp-1 transition"
                          >
                            {item.product_name}
                          </Link>
                          <span className="text-xs text-[#6e6e73] block mt-0.5">
                            {item.sku_title}
                          </span>
                          <span className="text-[11px] font-mono text-[#0071e3] block mt-0.5">
                            SKU: {item.sku_code} &bull; GST {item.tax_rate_percent}%
                          </span>
                          <span className="text-xs font-bold text-[#1d1d1f] mt-1 block sm:hidden">
                            {formatINR(item.price_inr)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e5e5ea]">
                        {/* Quantity Spinner */}
                        <div className="inline-flex items-center rounded-full border border-[#e5e5ea] bg-white">
                          <button
                            onClick={() => updateQuantity(item.sku_id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] disabled:opacity-30 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#1d1d1f]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.sku_id, item.quantity + 1)}
                            disabled={item.quantity >= item.max_stock}
                            className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] disabled:opacity-30 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Subtotal */}
                        <div className="text-right min-w-[90px]">
                          {SHOW_HARDWARE_PRICES ? (
                            <>
                              <span className="text-sm font-extrabold text-[#1d1d1f] block">
                                {formatINR(itemTotal)}
                              </span>
                              <span className="text-[10px] text-[#6e6e73] block">
                                {formatINR(item.price_inr)} each
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-semibold text-[#0071e3] block">
                              Quote on Request
                            </span>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.sku_id)}
                          className="p-2 text-[#86868b] hover:text-rose-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between text-xs sm:text-sm pt-2">
                <Link
                  href="/store"
                  className="font-semibold text-[#0071e3] hover:underline transition"
                >
                  &larr; Continue Shopping
                </Link>
                <button
                  onClick={clear}
                  className="text-[#6e6e73] hover:text-rose-600 transition font-medium"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Card */}
            <div className="lg:col-span-4">
              <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.04)] sticky top-24 space-y-6">
                <h2 className="text-base font-bold text-[#1d1d1f] border-b border-[#e5e5ea] pb-3">
                  Order Summary
                </h2>

                {/* Sub-itemization */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  {SHOW_HARDWARE_PRICES ? (
                    <>
                      <div className="flex justify-between text-[#6e6e73]">
                        <span>Taxable Subtotal:</span>
                        <span className="font-semibold text-[#1d1d1f]">{formatINR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[#6e6e73]">
                        <span>Estimated Indian GST:</span>
                        <span className="font-semibold text-[#1d1d1f]">{formatINR(taxAmount)}</span>
                      </div>
                      <div className="flex justify-between text-[#6e6e73]">
                        <span>Freight / Courier Delivery:</span>
                        <span className="font-semibold text-[#1d1d1f]">
                          {shippingFee === 0 ? (
                            <span className="text-[#059669] font-bold">FREE</span>
                          ) : (
                            formatINR(shippingFee)
                          )}
                        </span>
                      </div>

                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-[#059669] font-semibold">
                          <span>Educational Grant (10%):</span>
                          <span>-{formatINR(promoDiscount)}</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-[#e5e5ea] flex items-baseline justify-between">
                        <div>
                          <span className="text-xs uppercase font-bold text-[#1d1d1f] block">
                            Grand Total
                          </span>
                          <span className="text-[11px] text-[#6e6e73]">Inclusive of all taxes</span>
                        </div>
                        <span className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                          {formatINR(finalPayable)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="py-2 space-y-2 text-xs text-[#6e6e73]">
                      <div className="flex justify-between font-semibold text-[#1d1d1f]">
                        <span>Pricing:</span>
                        <span className="text-[#0071e3]">Provided on Formal Inquiry</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Tax invoices, institutional discounts, and freight quotes are furnished upon submission of institutional requirements.
                      </p>
                    </div>
                  )}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="space-y-2 pt-2 border-t border-[#e5e5ea]">
                  <label htmlFor="promo-code-input" className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#0071e3]" />
                    Student / Grant Coupon:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promo-code-input"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. VTU10"
                      className="flex-1 px-3.5 py-2.5 bg-[#fbfbfd] border border-[#e5e5ea] rounded-full text-xs font-mono uppercase focus:outline-none focus:border-[#0071e3]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1d1d1f] hover:bg-black text-white rounded-full text-xs font-semibold transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <span
                      className={`text-[11px] block mt-1 font-medium ${
                        promoDiscount > 0 ? "text-[#059669]" : "text-rose-600"
                      }`}
                    >
                      {promoMessage}
                    </span>
                  )}
                </form>

                {/* Checkout CTA or Ordering Disabled Notice */}
                {IS_HARDWARE_ORDERING_ENABLED ? (
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-sm font-semibold shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01] active:scale-[0.99] transition"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 text-xs text-[#48484a]">
                      <div className="flex items-center gap-2 font-bold text-amber-800">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Online Checkout Disabled (Preview Mode)</span>
                      </div>
                      <p className="mt-1 leading-relaxed text-[11px]">
                        Online checkout for hardware products is currently paused for upcoming catalog updates. For academic batches or institutional orders, contact our laboratory desk.
                      </p>
                    </div>
                    <Link
                      href="/contact?subject=Hardware%20Procurement%20Inquiry"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1d1d1f] hover:bg-black text-white rounded-full text-xs sm:text-sm font-semibold transition"
                    >
                      <span>Submit Institutional Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* Security & Invoicing Highlights */}
                <div className="pt-2 border-t border-[#e5e5ea] space-y-2 text-[11px] text-[#6e6e73]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#059669] flex-shrink-0" />
                    <span>256-bit Encrypted Razorpay Gateway (UPI, Cards, NetBanking)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                    <span>Input Tax Credit (ITC) compliant GST invoice issued upon delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#86868b] flex-shrink-0" />
                    <span>Free shipping on all laboratory orders above ₹2,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
