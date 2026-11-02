"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  FileCheck,
} from "lucide-react";

interface VerifiedDoc {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  authority: string;
  regStatus: string;
  regNumber?: string;
  pages: string[];
}

const VERIFIED_DOCUMENTS: VerifiedDoc[] = [
  {
    id: "msme",
    tabLabel: "MSME Certificate",
    badge: "Govt. of India",
    title: "Udyam MSME Registration Certificate",
    authority: "Ministry of MSME, Government of India",
    regStatus: "Verified Active",
    regNumber: "UDYAM-KR-03-0713154",
    pages: [
      "/documents/verified/msme_page_1.webp",
      "/documents/verified/msme_page_2.webp",
    ],
  },
  {
    id: "iso_qms",
    tabLabel: "ISO 9001 QMS",
    badge: "Quality System",
    title: "ISO 9001:2015 Quality Management",
    authority: "Standardization & Quality System Certification",
    regStatus: "Accredited Active",
    regNumber: "Certificate No: QMS-2026-9001",
    pages: ["/documents/verified/iso_qms_page_1.webp"],
  },
  {
    id: "iso_ems",
    tabLabel: "ISO 14001 EMS",
    badge: "Eco Compliance",
    title: "ISO 14001:2015 Environmental System",
    authority: "Environmental & Safe Manufacturing Standards",
    regStatus: "Accredited Active",
    regNumber: "Certificate No: EMS-2026-14001",
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

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
      {/* 1. DOCUMENT SWITCHER TABS */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] shadow-xs">
        {VERIFIED_DOCUMENTS.map((doc, idx) => {
          const isActive = idx === activeDocIndex;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => handleSelectDoc(idx)}
              className={`flex-1 py-2 px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer text-center truncate ${
                isActive
                  ? "bg-white text-[#1d1d1f] shadow-xs border border-black/[0.08]"
                  : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.02]"
              }`}
            >
              {doc.tabLabel}
            </button>
          );
        })}
      </div>

      {/* 2. MAIN DOCUMENT PREVIEW CARD (Replaces previous static photo) */}
      <div
        className="relative rounded-[28px] overflow-hidden apple-card-elevated border border-black/[0.08] bg-gradient-to-b from-[#fcfcfe] via-[#f7f7f9] to-[#eeeff3] shadow-xl select-none group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        onContextMenu={(e) => e.preventDefault()}
        style={{ minHeight: "440px" }}
      >
        {/* Top Floating Badge Pill */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-xs text-[10px] sm:text-[11px] font-semibold text-[#1d1d1f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span>{activeDoc.badge}</span>
        </div>

        {/* Top Floating Expand Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-xs text-[#1d1d1f] hover:bg-white hover:scale-110 transition cursor-pointer flex items-center gap-1 text-[11px] font-medium px-3"
          title="Inspect Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#0071e3]" />
          <span>Inspect</span>
        </button>

        {/* Certificate Display Area */}
        <div className="relative w-full h-[360px] sm:h-[370px] pt-14 pb-4 px-4 sm:px-6 flex items-center justify-center">
          {/* Realistic A4 Document Paper with Depth Shadow */}
          <div className="relative h-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-2xl border border-black/[0.12] bg-white group-hover:scale-[1.02] transition-transform duration-500">
            <Image
              src={currentPageUrl}
              alt={activeDoc.title}
              fill
              priority
              draggable={false}
              className="object-contain select-none pointer-events-none"
            />
            {/* Protection shield to block right-click saving */}
            <div className="absolute inset-0 z-10" />

            {/* Subtle Hover Action Pill */}
            <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
              <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to View Full Size</span>
              </span>
            </div>
          </div>

          {/* Multi-page Navigation Arrows for 2-page documents */}
          {totalPages > 1 && (
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
              <button
                type="button"
                onClick={handlePrevPage}
                className="p-2 rounded-full bg-white/95 hover:bg-white text-[#1d1d1f] border border-black/[0.1] shadow-lg pointer-events-auto transition hover:scale-105 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                className="p-2 rounded-full bg-white/95 hover:bg-white text-[#1d1d1f] border border-black/[0.1] shadow-lg pointer-events-auto transition hover:scale-105 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Clean Telemetry Bar */}
        <div className="p-3.5 px-4 sm:px-5 bg-white/90 backdrop-blur-md border-t border-black/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate max-w-[70%]">
            <FileCheck className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
            <div className="truncate">
              <div className="font-bold text-[#1d1d1f] truncate">{activeDoc.title}</div>
              <div className="text-[11px] text-[#6e6e73] truncate">{activeDoc.authority}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {totalPages > 1 && (
              <span className="font-mono text-[11px] font-semibold text-[#0071e3] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                Page {activePageIndex + 1} of {totalPages}
              </span>
            )}
            <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
              {activeDoc.regStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 3. LIGHTBOX FULLSCREEN INSPECT MODAL (Z-INDEX 99999 TO SIT SAFELY ABOVE NAVBAR) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none overflow-hidden"
          onClick={() => setIsModalOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Modal Header Bar */}
          <div
            className="w-full max-w-4xl bg-[#1a1a22] border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-2xl text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {activeDoc.title}
                </h3>
                <div className="text-xs text-gray-400 mt-0.5 truncate">
                  <span className="truncate">{activeDoc.authority}</span>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 pl-3">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
                  className="p-1.5 hover:bg-white/15 rounded-full text-white transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono text-gray-300 min-w-[40px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(1.7, prev + 0.15))}
                  className="p-1.5 hover:bg-white/15 rounded-full text-white transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:bg-white/15 rounded-full text-white transition cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span>Close (Esc)</span>
              </button>
            </div>
          </div>

          {/* Modal Center Document Viewing Area */}
          <div
            className="flex-1 w-full max-w-4xl flex items-center justify-center my-3 sm:my-4 overflow-auto rounded-2xl p-2 sm:p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-white transition-all duration-200"
              style={{
                width: `${Math.round(520 * zoomLevel)}px`,
                maxWidth: "95vw",
                maxHeight: "72vh",
                aspectRatio: "1 / 1.414", // Exact standard A4 document proportions
              }}
            >
              <Image
                src={currentPageUrl}
                alt={activeDoc.title}
                fill
                priority
                draggable={false}
                className="object-contain pointer-events-none select-none"
              />
              {/* Security Watermark Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="text-black/[0.04] font-black text-4xl sm:text-6xl -rotate-45 uppercase select-none tracking-widest">
                  SMPS Tech Lab
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div
            className="w-full max-w-4xl bg-[#1a1a22] border border-white/15 rounded-2xl p-3 px-4 flex items-center justify-between text-xs text-gray-300 shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] text-gray-400 truncate">
              {activeDoc.regNumber || "Official Institutional Accreditation • SMPS Electric Control Pvt Ltd"}
            </span>

            {totalPages > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <span className="font-mono text-gray-200 px-1 font-semibold">
                  Page {activePageIndex + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition flex items-center gap-1 cursor-pointer"
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
      )}
    </div>
  );
}
