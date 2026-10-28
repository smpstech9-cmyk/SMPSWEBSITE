"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { addToCart } from "@/lib/cart";

import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  ArrowRight,
  Package,
  Clock,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

interface SKU {
  id: string;
  sku_code: string;
  title: string;
  price_inr: string | number;
  hsn_code: string;
  tax_rate_percent: string | number;
  weight_kg?: number | null;
  quantity_available: number;
  is_active: boolean;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  brand_line: string;
  short_description: string;
  description: string;
  primary_image_url?: string | null;
  datasheet_url?: string | null;
  specifications_json?: Record<string, any>;
  is_published: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  skus: SKU[];
}

const CATALOG_DATA: Record<string, Product> = {};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "purna-bess-commercial";
  const { content } = useSiteContent();

  const IS_HARDWARE_ORDERING_ENABLED = content.hardware.isOrderingEnabled;
  const SHOW_HARDWARE_PRICES = content.hardware.showPricing;
  const HARDWARE_STORE_NOTICE = {
    badge: "Institutional Procurement Only",
    inquiryButtonText: "Inquire for Quotation & Datasheet",
  };

  const [product, setProduct] = useState<Product | null>(CATALOG_DATA[slug] || null);
  const [selectedSkuId, setSelectedSkuId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "warranty">("specs");
  const [cartSuccessNotice, setCartSuccessNotice] = useState(false);

  // Fetch live product from API
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/v1/store/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            setProduct(data);
          }
        }
      } catch {
        // Fallback remains active
      }
    }
    fetchDetail();
  }, [slug]);

  // Set default active SKU when product loads
  useEffect(() => {
    if (product && product.skus.length > 0 && !selectedSkuId) {
      setSelectedSkuId(product.skus[0].id);
    }
  }, [product, selectedSkuId]);

  const activeSku = useMemo(() => {
    if (!product || product.skus.length === 0) return null;
    return product.skus.find((s) => s.id === selectedSkuId) || product.skus[0];
  }, [product, selectedSkuId]);

  if (!product || !activeSku) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Package className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800">Product Not Found</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-sm">
          The requested hardware unit or developer kit is not listed in our catalog.
        </p>
        <Link
          href="/store"
          className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  const basePrice = Number(activeSku.price_inr);
  const taxRate = Number(activeSku.tax_rate_percent);
  const gstAmount = (basePrice * taxRate) / 100;
  const totalPricePerUnit = basePrice + gstAmount;
  const totalPriceTotal = totalPricePerUnit * quantity;

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleAddToCart = () => {
    addToCart({
      sku_id: activeSku.id,
      product_id: product.id,
      product_slug: product.slug,
      product_name: product.name,
      sku_code: activeSku.sku_code,
      sku_title: activeSku.title,
      price_inr: Number(activeSku.price_inr),
      tax_rate_percent: Number(activeSku.tax_rate_percent),
      image_url: product.primary_image_url || "/images/products/iot-kit.jpg",
      quantity: quantity,
      max_stock: activeSku.quantity_available || 50,
    });
    setCartSuccessNotice(true);
    setTimeout(() => setCartSuccessNotice(false), 4000);
  };


  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] py-8 sm:py-12 selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-[#0071e3] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <Link href="/store" className="hover:text-[#0071e3] transition">
            Hardware Store
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Product Image Frame */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-80 sm:h-[460px] bg-[#f5f5f7] rounded-2xl overflow-hidden border border-[#e5e5ea]">
              {product.primary_image_url ? (
                <Image
                  src={product.primary_image_url}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#86868b]">
                  <Package className="w-16 h-16" />
                </div>
              )}

              {/* Stock Status Pill */}
              <div className="absolute top-4 right-4">
                {activeSku.quantity_available > 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    In Stock ({activeSku.quantity_available} units)
                  </span>
                ) : activeSku.quantity_available > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/90 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Low Stock ({activeSku.quantity_available} units left)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                    Backorder Available
                  </span>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#fbfbfd] p-3.5 rounded-2xl border border-[#e5e5ea]">
                <ShieldCheck className="w-5 h-5 text-[#0071e3] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#1d1d1f] block">1-Year Warranty</span>
                <span className="text-[10px] text-[#6e6e73]">SMPS Lab certified</span>
              </div>
              <div className="bg-[#fbfbfd] p-3.5 rounded-2xl border border-[#e5e5ea]">
                <Truck className="w-5 h-5 text-[#0071e3] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#1d1d1f] block">Pan-India Freight</span>
                <span className="text-[10px] text-[#6e6e73]">Insured road & air</span>
              </div>
              <div className="bg-[#fbfbfd] p-3.5 rounded-2xl border border-[#e5e5ea]">
                <FileText className="w-5 h-5 text-[#0071e3] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#1d1d1f] block">GST Input Credit</span>
                <span className="text-[10px] text-[#6e6e73]">Tax invoice provided</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand Line & Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-xs font-bold border border-blue-100">
                  {product.brand_line}
                </span>
                <span className="text-xs text-[#6e6e73] font-medium">
                  {product.category?.name}
                </span>
              </div>

              {/* Title & Short Description */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#6e6e73] leading-relaxed font-normal">
                {product.short_description}
              </p>

              {/* SKU / Variant Selector */}
              {product.skus.length > 1 && (
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block mb-2.5">
                    Select Configuration / Variant:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.skus.map((sku) => {
                      const isSelected = sku.id === activeSku.id;
                      return (
                        <button
                          key={sku.id}
                          type="button"
                          onClick={() => {
                            setSelectedSkuId(sku.id);
                            setQuantity(1);
                          }}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            isSelected
                              ? "border-[#0071e3] bg-[#f5f5f7] ring-2 ring-[#0071e3]/30 shadow-sm"
                              : "border-[#e5e5ea] hover:border-[#86868b] bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1d1d1f]">{sku.title}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0071e3]" />}
                          </div>
                          {SHOW_HARDWARE_PRICES ? (
                            <span className="text-xs font-extrabold text-[#0071e3] mt-1 block">
                              {formatINR(Number(sku.price_inr))}
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-[#0071e3] mt-1 block">
                              Standard Specs
                            </span>
                          )}
                          <span className="text-[10px] text-[#6e6e73] block mt-0.5">
                            SKU: {sku.sku_code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price / Commercial Quote Card */}
              <div className="mt-6 p-5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#86868b] uppercase tracking-wider font-semibold block">
                      {SHOW_HARDWARE_PRICES
                        ? `Total Payable (Incl. ${taxRate}% GST)`
                        : "Commercial & Institutional Pricing"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                      {SHOW_HARDWARE_PRICES ? formatINR(totalPriceTotal) : "Price on Request"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#86868b] block">HSN Code</span>
                    <span className="text-xs font-mono font-bold text-[#1d1d1f]">{activeSku.hsn_code}</span>
                  </div>
                </div>

                {SHOW_HARDWARE_PRICES ? (
                  <div className="mt-3 pt-3 border-t border-[#e5e5ea] text-xs text-[#6e6e73] space-y-1">
                    <div className="flex justify-between">
                      <span>Base Price ({quantity} unit{quantity > 1 ? "s" : ""}):</span>
                      <span className="font-semibold text-[#1d1d1f]">{formatINR(basePrice * quantity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applicable GST ({taxRate}%):</span>
                      <span className="font-semibold text-[#1d1d1f]">{formatINR(gstAmount * quantity)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-[#e5e5ea] text-xs text-[#6e6e73]">
                    <span>Institutional discounts and project bill of materials (BOM) quotations provided upon inquiry.</span>
                  </div>
                )}
              </div>
            </div>

              {/* Ordering Controls or Preview Mode */}
              {IS_HARDWARE_ORDERING_ENABLED ? (
                <>
                  {/* Quantity Counter */}
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">Quantity:</span>
                    <div className="inline-flex items-center rounded-full border border-[#e5e5ea] bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="p-2.5 text-[#6e6e73] hover:text-[#1d1d1f] disabled:opacity-30 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-[#1d1d1f]">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(activeSku.quantity_available || 10, q + 1))}
                        disabled={activeSku.quantity_available > 0 && quantity >= activeSku.quantity_available}
                        className="p-2.5 text-[#6e6e73] hover:text-[#1d1d1f] disabled:opacity-30 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-[#6e6e73]">
                      SKU Code: <span className="font-mono font-semibold text-[#1d1d1f]">{activeSku.sku_code}</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 space-y-3">
                    {cartSuccessNotice && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                          <span>{quantity}x {activeSku.title} added to procurement cart!</span>
                        </div>
                        <Link
                          href="/cart"
                          className="px-4 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-bold transition flex-shrink-0 shadow-sm"
                        >
                          View Cart &rarr;
                        </Link>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-sm font-semibold shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01] active:scale-[0.99] transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart ({formatINR(totalPriceTotal)})
                      </button>

                      {basePrice > 50000 && (
                        <Link
                          href={`/partner?proposal=bess`}
                          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-sm font-semibold transition"
                        >
                          Request Enterprise Quote
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* Online Ordering Disabled - Preview Mode & Technical Inquiry */
                <div className="mt-6 space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/[0.07] via-[#fbfbfd] to-blue-500/[0.04] border border-amber-500/25 shadow-sm space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                            {HARDWARE_STORE_NOTICE.badge}
                          </h4>
                          <span className="text-xs text-[#86868b]">•</span>
                          <span className="text-xs font-semibold text-amber-700">Online Ordering Opening Soon</span>
                        </div>
                        <p className="text-[11px] text-[#6e6e73] font-mono mt-0.5">
                          SKU: <span className="font-semibold text-[#1d1d1f]">{activeSku.sku_code}</span> • HSN: {activeSku.hsn_code}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#48484a] leading-relaxed">
                      Direct online purchasing for this hardware unit is temporarily disabled while manufacturing allocations and logistics are calibrated. All engineering specifications, schematic pinouts, and test parameters remain openly accessible below.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/contact?subject=Technical%20Inquiry:%20${encodeURIComponent(product.name)}%20(${activeSku.sku_code})`}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs sm:text-sm font-semibold shadow-sm transition"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{HARDWARE_STORE_NOTICE.inquiryButtonText}</span>
                      </Link>

                      {basePrice > 50000 ? (
                        <Link
                          href={`/partner?proposal=bess`}
                          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-xs sm:text-sm font-semibold transition"
                        >
                          Enterprise Proposal
                        </Link>
                      ) : product.datasheet_url ? (
                        <a
                          href={product.datasheet_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e5e5ea] rounded-full text-xs sm:text-sm font-semibold transition"
                        >
                          View Datasheet
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Description, Warranty */}
        <section className="mt-12 apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-[#e5e5ea] gap-8">
            {[
              { id: "specs", label: "Technical Specifications" },
              { id: "description", label: "Engineering Overview" },
              { id: "warranty", label: "Compliance & Warranty" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-bold transition border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "specs" && (
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f] mb-4">Laboratory Specifications Table</h3>
                {product.specifications_json && Object.keys(product.specifications_json).length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-[#e5e5ea]">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody className="divide-y divide-[#e5e5ea]">
                        {Object.entries(product.specifications_json).map(([k, v]) => (
                          <tr key={k} className="hover:bg-[#fbfbfd] transition">
                            <td className="py-3.5 px-5 font-semibold text-[#1d1d1f] bg-[#fbfbfd] w-1/3">
                              {k}
                            </td>
                            <td className="py-3.5 px-5 text-[#6e6e73] font-mono">
                              {typeof v === "object" ? JSON.stringify(v) : String(v)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-[#6e6e73]">Standard specifications apply.</p>
                )}
              </div>
            )}

            {activeTab === "description" && (
              <div className="prose prose-slate max-w-none text-sm text-[#6e6e73] leading-relaxed font-normal">
                <p>{product.description}</p>
                <div className="mt-5 p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0071e3] mb-1">
                    Quality Guarantee from SMPS Tech Lab
                  </h4>
                  <p className="text-xs text-[#1d1d1f]/80">
                    Each unit is individually tested on our automated power hardware-in-the-loop (HIL) testbed prior to packaging.
                    Firmware binaries and calibration data are logged to the SMPS enterprise registry.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="space-y-4 text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                <p>
                  <strong className="text-[#1d1d1f]">Warranty Coverage:</strong> All SMPS hardware products carry an authoritative 12-month limited warranty covering manufacturing defects, PCB faults, and component failures during normal laboratory or commercial operation.
                </p>
                <p>
                  <strong className="text-[#1d1d1f]">Input Tax Credit (ITC):</strong> Registered GST businesses and academic institutions can claim full 18% (or 5% on apparel) GST input credit. Our invoicing includes valid GSTIN, HSN classification, and state tax itemization.
                </p>
                <p>
                  <strong className="text-[#1d1d1f]">Academic Bulk Orders:</strong> For university departments purchasing laboratory batches (&gt;10 units), contact our institutional desk for educational grant discounts.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
