"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Lock,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Building2,
  FileText,
  Eye,
  Zap,
  Award,
  BookOpen,
} from "lucide-react";
import { IP_ASSETS_REGISTRY, IPAssetItem } from "@/lib/ip-registry-data";
import { IPSecureReaderModal } from "./ip-secure-reader-modal";

export function IpDynamicView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalIP, setActiveModalIP] = useState<IPAssetItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    IP_ASSETS_REGISTRY.forEach((item) => set.add(item.category));
    return Array.from(set);
  }, []);

  const filteredAssets = useMemo(() => {
    return IP_ASSETS_REGISTRY.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sectors.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-[#fbfbfd] text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white min-h-screen">
      {/* 1. HERO SECTION (Apple White Clean Theme) */}
      <section className="relative w-full py-20 sm:py-28 bg-white border-b border-black/[0.06] overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-50/80 via-transparent to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold tracking-wide text-[#1d1d1f] shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
            <span>Strategic IP Asset Intelligence Registry • SIPAIR Series</span>
          </div>

          {/* Headline */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#1d1d1f] leading-[1.08]">
              Intellectual Property & <br />
              <span className="text-gradient-apple-blue font-black">
                Patent Portfolio
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#6e6e73] max-w-2xl mx-auto leading-relaxed font-normal">
              Explore 12 proprietary deep-tech hardware topologies, controller silicon architectures, and high-voltage power electronics filed and commercialized by SMPS Tech Lab.
            </p>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#0071e3] tracking-tight">12 Assets</div>
              <div className="text-xs font-bold text-[#1d1d1f] mt-0.5">Proprietary IP Designs</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#059669] tracking-tight">100%</div>
              <div className="text-xs font-bold text-[#1d1d1f] mt-0.5">Indigenous Ownership</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">2025 Filed</div>
              <div className="text-xs font-bold text-[#1d1d1f] mt-0.5">Novel Design Patents</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#b8860b] tracking-tight">Non-Dilutive</div>
              <div className="text-xs font-bold text-[#1d1d1f] mt-0.5">Commercial Licensing</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORY FILTER BAR */}
      <section className="py-6 bg-white/90 backdrop-blur-2xl border-b border-black/[0.06] sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patent title, IP code, or sector..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium focus:border-[#0071e3] focus:bg-white outline-none text-[#1d1d1f] placeholder-[#86868b] transition"
              />
            </div>

            <div className="text-xs font-mono text-[#6e6e73] self-center">
              Showing <span className="text-[#1d1d1f] font-bold">{filteredAssets.length}</span> of {IP_ASSETS_REGISTRY.length} IP Assets
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0071e3] text-white shadow-sm font-semibold"
                    : "bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#e8e8ed] border border-[#e5e5ea]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. IP ASSETS GRID (Clean White Cards) */}
      <section className="py-16 sm:py-20 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-[28px] bg-white border border-[#e5e5ea] shadow-sm space-y-3">
              <FileText className="w-10 h-10 text-[#86868b] mx-auto" />
              <h3 className="text-lg font-bold text-[#1d1d1f]">No IP Assets Found</h3>
              <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
                No matching intellectual property assets found for &quot;{searchQuery}&quot;. Try selecting another category or resetting the search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-full bg-[#0071e3] text-xs font-semibold text-white transition mt-2 cursor-pointer shadow-sm hover:bg-[#0077ed]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white rounded-[24px] border border-[#e5e5ea] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,113,227,0.1)] hover:border-[#0071e3]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Code Badge & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#0071e3] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                        {asset.code}
                      </span>
                      <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {asset.status}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider">
                        {asset.category}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] mt-1 group-hover:text-[#0071e3] transition-colors leading-snug">
                        {asset.title}
                      </h3>
                      <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed line-clamp-2">
                        {asset.subtitle}
                      </p>
                    </div>

                    {/* Target Application Sectors */}
                    <div className="pt-3 border-t border-black/[0.05] space-y-2">
                      <div className="text-[10px] font-bold uppercase text-[#86868b] tracking-wider">
                        Target Application Sectors
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {asset.sectors.slice(0, 3).map((sec, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea]"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Abstract Quote */}
                    <p className="text-xs text-[#6e6e73] leading-relaxed italic bg-[#f5f5f7] p-3 rounded-xl border border-[#e5e5ea] line-clamp-3">
                      &quot;{asset.abstract}&quot;
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-black/[0.05] space-y-3 mt-4">
                    <div className="flex items-center justify-between text-[11px] text-[#6e6e73]">
                      <span>Lead: <strong className="text-[#1d1d1f]">{asset.author}</strong></span>
                      <span className="font-mono text-[#86868b]">{asset.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalIP(asset)}
                      className="w-full py-3 px-4 rounded-xl bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white font-semibold text-xs border border-[#e5e5ea] hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0071e3] group-hover:text-white" />
                      <span>View Authentic Patent Document</span>
                      <Eye className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. COMMERCIAL LICENSING & TECH TRANSFER CTA */}
      <section className="py-20 bg-white border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-[#0071e3] via-[#0056b3] to-[#1e3a8a] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,113,227,0.25)] relative overflow-hidden">
            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Commercial Technology Transfer
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Interested in Commercializing or Licensing SMPS Tech Lab IP?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                We offer structured, non-dilutive licensing frameworks, joint venture manufacturing partnerships, and OEM technology transfer agreements for our filed patents.
              </p>
            </div>

            <Link
              href="/contact?inquiry=ip-licensing"
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#0071e3] font-bold text-xs shadow-lg transition shrink-0 inline-flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Building2 className="w-4 h-4 text-[#0071e3]" />
              <span>Discuss IP Licensing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECURE NON-DOWNLOADABLE MODAL VIEWER */}
      <IPSecureReaderModal
        ip={activeModalIP}
        isOpen={!!activeModalIP}
        onClose={() => setActiveModalIP(null)}
      />
    </div>
  );
}
