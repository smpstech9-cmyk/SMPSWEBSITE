"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Award,
  FileCheck2,
  Lock,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react";

interface VerifiedDoc {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  authority: string;
  regStatus: string;
  pages: string[];
}

const VERIFIED_DOCUMENTS: VerifiedDoc[] = [
  {
    id: "msme",
    tabLabel: "MSME Certificate",
    badge: "Govt. of India Accredited",
    title: "Udyam MSME Registration Certificate",
    subtitle: "Official Ministry of Micro, Small & Medium Enterprises accreditation for SMPS Tech Lab.",
    authority: "Ministry of MSME, Government of India",
    regStatus: "Verified Active",
    pages: [
      "/documents/verified/msme_page_1.webp",
      "/documents/verified/msme_page_2.webp",
    ],
  },
  {
    id: "iso_qms",
    tabLabel: "ISO 9001 QMS",
    badge: "Quality Certified",
    title: "ISO 9001:2015 Quality Management System",
    subtitle: "Certified international standard for design, assembly, and testing of power electronics & BESS.",
    authority: "International Organization for Standardization",
    regStatus: "Accredited Active",
    pages: ["/documents/verified/iso_qms_page_1.webp"],
  },
  {
    id: "iso_ems",
    tabLabel: "ISO 14001 EMS",
    badge: "Eco Compliance",
    title: "ISO 14001:2015 Environmental System",
    subtitle: "Certified compliance for zero-hazard battery testing, eco-safe manufacturing & energy efficiency.",
    authority: "International Organization for Standardization",
    regStatus: "Accredited Active",
    pages: ["/documents/verified/iso_ems_page_1.webp"],
  },
];

export function VerifiedCredentialsViewer() {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeDoc = VERIFIED_DOCUMENTS[activeDocIndex];
  const currentPageUrl = activeDoc.pages[activePageIndex] || activeDoc.pages[0];
  const totalPages = activeDoc.pages.length;

  const handleSelectDoc = (index: number) => {
    setActiveDocIndex(index);
    setActivePageIndex(0);
    setZoomLevel(1);
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePageIndex < totalPages - 1) {
      setActivePageIndex((prev) => prev + 1);
    } else {
      setActivePageIndex(0);
    }
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePageIndex > 0) {
      setActivePageIndex((prev) => prev - 1);
    } else {
      setActivePageIndex(totalPages - 1);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Document Tab Selector */}
      <div className="flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] shadow-xs">
        {VERIFIED_DOCUMENTS.map((doc, idx) => {
          const isActive = idx === activeDocIndex;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => handleSelectDoc(idx)}
              className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer text-center truncate ${
                isActive
                  ? "bg-white text-[#1d1d1f] shadow-xs border border-black/[0.06]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.02]"
              }`}
            >
              {doc.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Document Viewer Container (Replacing the previous photo) */}
      <div
        className="relative rounded-[28px] overflow-hidden apple-card-elevated aspect-[4/3] group shadow-xl border border-black/[0.08] bg-[#fbfbfd] flex flex-col justify-between select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Document Render Area with Anti-Theft / Anti-Download Guard */}
        <div
          className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-[#f2f2f7] to-[#e5e5ea]/50 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          title="Click to inspect verified document in full view"
        >
          {/* Subtle Ambient Drop-Shadow Paper Frame */}
          <div className="relative w-full h-full max-h-[92%] rounded-xl overflow-hidden shadow-2xl border border-black/[0.1] bg-white">
            <Image
              src={currentPageUrl}
              alt={activeDoc.title}
              fill
              priority
              draggable={false}
              className="object-contain pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Transparent click overlay ensuring raw image cannot be dragged or saved */}
            <div className="absolute inset-0 z-10 pointer-events-none" />
          </div>

          {/* Top Floating Security Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[10px] sm:text-xs font-semibold text-[#059669] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>{activeDoc.badge}</span>
          </div>

          {/* Top Right "Inspect" Fullscreen Trigger Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] backdrop-blur-md border border-black/[0.08] shadow-sm transition hover:scale-105 cursor-pointer flex items-center gap-1 text-[11px] font-semibold px-3"
            aria-label="Inspect document fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect</span>
          </button>

          {/* Multi-Page Controls (If document has 2+ pages) */}
          {totalPages > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={handlePrevPage}
                className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] shadow-md border border-black/[0.08] transition pointer-events-auto cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] shadow-md border border-black/[0.08] transition pointer-events-auto cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Diagnostics & Verification Overlay Bar */}
        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border-t border-black/[0.06] shadow-sm z-20 mx-3 mb-3">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-gray-100">
            <span className="font-bold text-[#1d1d1f] flex items-center gap-1.5 truncate max-w-[220px]">
              <FileCheck2 className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0" />
              <span className="truncate">{activeDoc.title}</span>
            </span>
            <div className="flex items-center gap-2">
              {totalPages > 1 && (
                <span className="text-[10px] font-semibold text-[#86868b] bg-[#f5f5f7] px-2 py-0.5 rounded-full">
                  Page {activePageIndex + 1} of {totalPages}
                </span>
              )}
              <span className="text-[#059669] font-mono text-[11px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                {activeDoc.regStatus}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#6e6e73] mt-1.5 font-normal leading-relaxed line-clamp-1">
            {activeDoc.subtitle}
          </p>
        </div>
      </div>

      {/* FULLSCREEN INSPECTION MODAL (Download Disabled & Protected) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onClick={() => setIsModalOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className="relative w-full max-w-4xl max-h-[94vh] bg-[#1d1d1f] rounded-[28px] overflow-hidden shadow-2xl border border-white/15 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#34d399] flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {activeDoc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                    <span>{activeDoc.authority}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Protected View (Download Disabled)
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.2))}
                    className="p-1.5 hover:bg-white/15 rounded-full text-white transition"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-[11px] font-mono text-gray-300">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.2))}
                    className="p-1.5 hover:bg-white/15 rounded-full text-white transition"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Page Viewer */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#121216] relative min-h-[450px]">
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white transition-transform duration-200"
                style={{
                  width: `${Math.round(620 * zoomLevel)}px`,
                  maxWidth: "100%",
                  aspectRatio: "1 / 1.414", // Standard A4 certificate proportions
                }}
              >
                <Image
                  src={currentPageUrl}
                  alt={activeDoc.title}
                  fill
                  priority
                  draggable={false}
                  className="object-contain pointer-events-none"
                />
                {/* Security Watermark Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="text-black/[0.04] font-black text-4xl sm:text-6xl -rotate-45 uppercase select-none tracking-widest">
                    SMPS Tech Lab
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer / Multi-Page Navigation */}
            <div className="p-3 sm:p-4 border-t border-white/10 flex items-center justify-between bg-black/40 text-xs text-gray-300">
              <span className="text-[11px] text-gray-400">
                Official Corporate Registry • SMPS Electric Control Pvt Ltd
              </span>

              {totalPages > 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                  <span className="font-mono text-gray-300 px-1">
                    {activePageIndex + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-emerald-400 font-medium">
                  Single-Page Accredited Certificate
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
