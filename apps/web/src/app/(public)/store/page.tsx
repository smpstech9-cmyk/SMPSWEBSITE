"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  BatteryCharging,
  Zap,
  Cpu,
  Power,
  Bot,
  Layers,
  CheckCircle2,
  AlertCircle,
  X,
  Package,
  Clock,
  Sparkles,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";

import { FALLBACK_PRODUCTS, type Product, type SKU } from "@/lib/products-data";

const CATEGORY_TABS = [
  { label: "All Products (28)", slug: "all", icon: Layers },
  { label: "EV Fast Chargers", slug: "ev-chargers", icon: Power },
  { label: "Surge Protection (SPD)", slug: "surge-protection", icon: ShieldCheck },
  { label: "SMPS & Converters", slug: "power-supplies", icon: Zap },
  { label: "Solar & Renewables", slug: "solar-renewables", icon: Sparkles },
  { label: "BESS & Batteries", slug: "energy-storage", icon: BatteryCharging },
  { label: "Cables & Lugs", slug: "cables-lugs", icon: Package },
  { label: "Silicon & Telecom", slug: "semiconductors-telecom", icon: Cpu },
  { label: "Academic Kits", slug: "iot-robotics", icon: Bot },
];

export default function StorePage() {
  const { content } = useSiteContent();
  const IS_HARDWARE_ORDERING_ENABLED = content.hardware.isOrderingEnabled;
  const SHOW_HARDWARE_PRICES = content.hardware.showPricing;
  const HARDWARE_STORE_NOTICE = content.hardware.storeNotice;

  const upcomingProductsList =
    content.hardware.upcomingProducts && content.hardware.upcomingProducts.length > 0
      ? content.hardware.upcomingProducts
      : content.home.upcomingProducts || [];

  const storeFaqsList =
    content.hardware.storeFaqs && content.hardware.storeFaqs.length > 0
      ? content.hardware.storeFaqs
      : [
          {
            id: "store-faq-1",
            question: "How do institutional and enterprise clients order commercial hardware?",
            answer: "For commercial BESS containers, high-voltage EV fast chargers, and institutional developer kit batches, submit an inquiry via our contact or partner portal. Our technical sales team provides custom project quotations, electrical single-line diagrams (SLD), and delivery schedules.",
            category: "Ordering",
          },
          {
            id: "store-faq-2",
            question: "What is the status of Quantum BESS™ and SmartLink™?",
            answer: "Quantum BESS™ and SmartLink™ are in active R&D validation inside the SMPS Tech Lab Engineering Center. Early access evaluation units and technical datasheets are available upon request for qualifying industrial test partners.",
            category: "Upcoming Products",
          },
          {
            id: "store-faq-3",
            question: "Are academic lab kits and SaralaChip™ modules available for universities?",
            answer: "Yes. Educational institutions and engineering colleges can procure bulk kits with specialized laboratory manuals, firmware SDKs, and instructor onboarding packages directly from our hardware catalog.",
            category: "Academic",
          },
          {
            id: "store-faq-4",
            question: "What warranty and compliance certifications come with the hardware?",
            answer: "All commercial hardware includes a standard 3-to-5-year industrial warranty with optional SLA extensions. Units undergo stringent pre-compliance testing covering BIS, ARAI, CE, and CISPR EMI/EMC standards.",
            category: "Warranty & Support",
          },
        ];

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "under5k" | "5k-50k" | "industrial">("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "stock">("featured");
  const [selectedIndiaMartProduct, setSelectedIndiaMartProduct] = useState<Product | null>(null);

  // Fetch live products from backend
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch("/api/v1/store/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          }
        }
      } catch {
        // Retain fallback products if network or backend is unreachable
      }
    }
    loadCatalog();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategorySlug !== "all") {
          if (p.category?.slug !== selectedCategorySlug) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand_line.toLowerCase().includes(q);
          const matchDesc = p.short_description.toLowerCase().includes(q);
          const matchSku = p.skus.some((s) => s.sku_code.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchDesc && !matchSku) {
            return false;
          }
        }

        // Price filter
        const lowestPrice = Math.min(...p.skus.map((s) => Number(s.price_inr)));
        if (priceFilter === "under5k" && lowestPrice >= 5000) return false;
        if (priceFilter === "5k-50k" && (lowestPrice < 5000 || lowestPrice > 50000)) return false;
        if (priceFilter === "industrial" && lowestPrice <= 50000) return false;

        // In-stock only filter
        if (inStockOnly) {
          const totalStock = p.skus.reduce((sum, s) => sum + s.quantity_available, 0);
          if (totalStock <= 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const minPriceA = Math.min(...a.skus.map((s) => Number(s.price_inr)));
        const minPriceB = Math.min(...b.skus.map((s) => Number(s.price_inr)));
        if (sortBy === "price-asc") return minPriceA - minPriceB;
        if (sortBy === "price-desc") return minPriceB - minPriceA;
        if (sortBy === "stock") {
          const stockA = a.skus.reduce((s, item) => s + item.quantity_available, 0);
          const stockB = b.skus.reduce((s, item) => s + item.quantity_available, 0);
          return stockB - stockA;
        }
        return 0; // featured default
      });
  }, [products, selectedCategorySlug, searchQuery, priceFilter, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      {/* Hero Banner - Apple Light Mode */}
      <section className="bg-[#fbfbfd] border-b border-[#e5e5ea] pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Package className="w-3.5 h-3.5" />
            SMPS Hardware Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] max-w-3xl leading-tight">
            Industrial Energy Hardware & Developer Kits
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
            Direct laboratory access to PURNA BESS™ storage systems, SaralaChip™ DSP controllers, EV DC fast chargers,
            and VTU-accredited engineering robotics suites.
          </p>

          {!IS_HARDWARE_ORDERING_ENABLED && (
            <div className="mt-6 max-w-3xl p-4 sm:p-5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 text-[#1d1d1f] flex items-start gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Institutional Catalog Notice
                  </span>
                  <span className="text-xs text-[#86868b]">•</span>
                  <span className="text-xs font-semibold text-amber-700">Online Ordering Notice</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-[#48484a] leading-relaxed">
                  {HARDWARE_STORE_NOTICE}
                </p>
              </div>
            </div>
          )}

          {/* Search Bar - Crisp Apple Light Search */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#86868b] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, SKUs (e.g. PURNA, ESP32, BESS-50KWH, SaralaChip)..."
                className="w-full pl-12 pr-10 py-3.5 bg-white text-[#1d1d1f] placeholder-[#86868b] text-sm rounded-full border border-[#e5e5ea] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 text-[#86868b] hover:text-[#1d1d1f] transition"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Horizontal Filter Pills */}
        {products.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#e5e5ea] mb-8">
            {CATEGORY_TABS.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategorySlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#0071e3] text-white shadow-sm"
                      : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] border border-[#e5e5ea]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Filter & Sort Controls Row */}
        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e5ea] shadow-sm">
            {/* Price Range Pills (when prices enabled) or Catalog Status */}
            {SHOW_HARDWARE_PRICES ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b] flex items-center gap-1.5 mr-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0071e3]" />
                  Price:
                </span>
                {[
                  { id: "all", label: "All" },
                  { id: "under5k", label: "< ₹5,000" },
                  { id: "5k-50k", label: "₹5,000 - ₹50,000" },
                  { id: "industrial", label: "Industrial (> ₹50k)" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                      priceFilter === p.id
                        ? "bg-[#1d1d1f] text-white"
                        : "bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] border border-[#e5e5ea]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold">
                  <Package className="w-3.5 h-3.5" />
                  Technical Catalog & Datasheets Active
                </span>
              </div>
            )}

            {/* In-Stock Toggle & Sort */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-medium text-[#1d1d1f]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-[#0071e3] rounded border-[#e5e5ea] focus:ring-[#0071e3]"
                />
                In-Stock Only
              </label>

              <div className="flex items-center gap-1.5">
                <label htmlFor="store-sort-select" className="text-xs text-[#86868b] font-medium whitespace-nowrap">Sort:</label>
                <select
                  id="store-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-full px-3.5 py-1.5 focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="featured">Featured</option>
                  {SHOW_HARDWARE_PRICES && (
                    <>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </>
                  )}
                  <option value="stock">Highest Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid or Enterprise Showroom */}
        {products.length === 0 ? (
          <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                SMPS Tech Lab Hardware Prototyping & Energy Systems Lab
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                Enterprise Hardware & Modular Systems Showroom
              </h2>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                All grid-scale energy storage systems, SaralaChip™ CCU embedded controller boards, and EV fast charging stations are custom-engineered and fabricated on-demand for institutional and enterprise partners. Direct online checkout is restricted while client delivery batches are being fulfilled.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] hover:border-[#0071e3]/40 transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0071e3]">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">PURNA & Quantum BESS™</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  50kWh to 1MWh containerized LFP energy storage systems with dual-loop liquid thermal management.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#0071e3] flex items-center gap-1">
                  1500V DC Bus • Turnkey EPC
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] hover:border-[#0071e3]/40 transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0071e3]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">SaralaChip™ CCU DSC</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Sub-2.5µs hardware fault isolation digital signal controller with dual CAN-FD and space-vector PWM.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#0071e3] flex items-center gap-1">
                  Proprietary Silicon Core
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] hover:border-[#0071e3]/40 transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0071e3]">
                  <Power className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">SWARNALI™ EV Chargers</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  60kW – 240kW liquid-cooled dual-gun DC fast charging infrastructure with OCPP 2.0.1 cloud sync.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#0071e3] flex items-center gap-1">
                  Dual CCS2 • 96.5% Efficiency
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] hover:border-[#0071e3]/40 transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0071e3]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">SmartLink™ IoT Gateways</h3>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  DIN-rail industrial edge computer with isolated RS485, CAN 2.0B, and 4G LTE-M cloud telemetry.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#0071e3] flex items-center gap-1">
                  IEC 60870-5-104 / MQTT
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e5e5ea] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                >
                  Request Technical Quotation & SLD
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/rnd"
                  className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition"
                >
                  View R&D Bay Facilities
                </Link>
              </div>
              <Link
                href="/ops/hardware"
                className="text-xs font-semibold text-[#86868b] hover:text-[#0071e3] transition flex items-center gap-1"
              >
                Operations Portal
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border border-[#e5e5ea] p-8 shadow-sm">
            <Package className="w-12 h-12 text-[#86868b] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#1d1d1f]">No matching products found</h2>
            <p className="text-sm text-[#6e6e73] mt-1 max-w-sm mx-auto font-normal">
              Try relaxing your search terms or clearing price and stock filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategorySlug("all");
                setSearchQuery("");
                setPriceFilter("all");
                setInStockOnly(false);
              }}
              className="mt-5 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full transition shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const primarySku = product.skus[0];
              const totalStock = product.skus.reduce((s, item) => s + item.quantity_available, 0);
              const hasMultipleSkus = product.skus.length > 1;
              const formattedPrice = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(Number(primarySku.price_inr));

              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-[28px] border border-[#e5e5ea] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Product Image Frame - Framed Aspect Ratio with full contain */}
                    <Link
                      href={`/store/${product.slug}`}
                      className="block relative w-full aspect-[4/3] bg-gradient-to-b from-[#fbfbfd] to-[#f4f4f7] overflow-hidden cursor-pointer p-5 border-b border-black/[0.04] flex items-center justify-center"
                    >
                      {product.primary_image_url ? (
                        <Image
                          src={product.primary_image_url}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#86868b]">
                          <Package className="w-12 h-12" />
                        </div>
                      )}

                      {/* Stock Pill Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        {totalStock > 5 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-semibold backdrop-blur-sm shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            In Stock ({totalStock})
                          </span>
                        ) : totalStock > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/90 text-white text-[11px] font-semibold backdrop-blur-sm shadow-sm">
                            <AlertCircle className="w-3 h-3" />
                            Low Stock ({totalStock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-semibold backdrop-blur-sm shadow-sm">
                            Backorder
                          </span>
                        )}
                      </div>

                      {/* Brand Line Chip */}
                      <div className="absolute bottom-3 left-3.5 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium tracking-wide">
                          {product.brand_line}
                        </span>
                      </div>
                    </Link>

                    {/* Card Content Body - Vertically Uniform Grid Alignment */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0071e3] mb-1.5">
                        {product.category?.name || "Hardware"}
                      </div>
                      <Link href={`/store/${product.slug}`} className="block">
                        <h2 className="text-base sm:text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition line-clamp-2 hover:underline min-h-[3.25rem] leading-snug">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="mt-2 text-xs sm:text-sm text-[#6e6e73] line-clamp-2 leading-relaxed font-normal min-h-[2.5rem]">
                        {product.short_description}
                      </p>

                      {/* Configurations Badge with guaranteed alignment */}
                      <div className="mt-4 min-h-[1.75rem] flex items-center">
                        {hasMultipleSkus ? (
                          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-[#0071e3] border border-blue-100">
                            {product.skus.length} Configurations Available
                          </div>
                        ) : (
                          <div className="inline-block px-3 py-1 text-[11px] font-medium text-transparent select-none">
                            Single Configuration
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer / Pricing & CTA - Pinned to bottom of all cards */}
                  <div className="px-6 pb-6 pt-4 border-t border-[#e5e5ea] flex items-center justify-between mt-auto bg-white">
                    <div>
                      {SHOW_HARDWARE_PRICES ? (
                        <>
                          <span className="text-[11px] text-[#86868b] block">
                            {hasMultipleSkus ? "Starts at" : "Price (Excl. GST)"}
                          </span>
                          <span className="text-xl font-black text-[#1d1d1f]">
                            {formattedPrice}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[11px] text-[#86868b] block uppercase tracking-wider font-semibold">
                            Commercial
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#0071e3]">
                            Price on Request
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {product.indiamart_url && (
                        <button
                          type="button"
                          onClick={() => setSelectedIndiaMartProduct(product)}
                          className="px-3 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>IndiaMART</span>
                        </button>
                      )}

                      <Link
                        href={`/store/${product.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition shadow-[0_4px_14px_rgba(0,113,227,0.3)] group/btn"
                      >
                        <span>{IS_HARDWARE_ORDERING_ENABLED ? "Configure" : "Specs"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* IndiaMART Procurement Modal Popup */}
        {selectedIndiaMartProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e5e5ea] space-y-5">
              <button
                type="button"
                onClick={() => setSelectedIndiaMartProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm font-bold text-sm">
                  IM
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Verified IndiaMART Partner
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1d1d1f]">
                    Procure via IndiaMART
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] space-y-2">
                <div className="text-xs font-bold text-[#1d1d1f]">{selectedIndiaMartProduct.name}</div>
                <div className="text-[11px] text-[#6e6e73] leading-relaxed">
                  {selectedIndiaMartProduct.short_description}
                </div>
                <div className="text-[10px] text-[#0071e3] font-semibold">
                  Seller: SMPS Electric Control Pvt Ltd • GST & ISO Certified
                </div>
              </div>

              <p className="text-xs text-[#6e6e73] leading-relaxed">
                You are proceeding to our verified IndiaMART catalog to request institutional price quotations, bulk supply availability, and direct dispatch agreements.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedIndiaMartProduct(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <a
                  href={selectedIndiaMartProduct.indiamart_url || "https://www.indiamart.com/smpselectriccontrol/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md inline-flex items-center gap-1.5"
                >
                  <span>Open IndiaMART Listing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* UPCOMING PRODUCTS - R&D IN PROGRESS SECTION */}
        {upcomingProductsList.length > 0 && (
          <section className="mt-24 pt-16 border-t border-[#e5e5ea]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Next-Gen Hardware Pipeline
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                  Upcoming Products & R&D in Progress
                </h2>
                <p className="mt-2 text-sm text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
                  Platforms currently undergoing thermal stress trials and firmware bring-up inside the SMPS Tech Lab Engineering Center.
                </p>
              </div>
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] transition"
              >
                <span>Join Pilot Testing Program</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingProductsList.map((prod) => (
                <div
                  key={prod.id}
                  className="apple-card p-6 flex flex-col justify-between group hover:border-[#0071e3]/30 transition-all duration-300"
                >
                  <div className="flex-1 flex flex-col">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fbfbfd] to-[#f4f4f7] mb-6 border border-black/[0.06] flex items-center justify-center p-3">
                      <Image
                        src={prod.imageUrl}
                        alt={prod.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0071e3] border border-blue-100 shadow-sm z-10">
                        {prod.status}
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-wider">
                      {prod.brand}
                    </span>
                    <h3 className="text-lg font-bold text-[#1d1d1f] mt-1 line-clamp-2 min-h-[3rem] leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {prod.tagline}
                    </p>

                    <ul className="mt-4 space-y-1.5 text-xs text-[#1d1d1f] min-h-[4.5rem]">
                      {prod.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0" />
                          <span className="line-clamp-1">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#86868b]">{prod.availability}</span>
                    <Link
                      href={prod.link}
                      className="text-xs font-bold text-[#0071e3] hover:text-[#0056b3] inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* STORE & PROCUREMENT FAQS */}
        <section className="mt-24 pt-16 border-t border-[#e5e5ea]">
          <FAQAccordion
            items={storeFaqsList}
            title="Hardware & Procurement FAQs"
            subtitle="Guidance on commercial ordering, university bulk procurements, warranty terms, and upcoming hardware."
            badge="Procurement Knowledge Base"
            showCategories={false}
          />
        </section>
      </main>
    </div>
  );
}
