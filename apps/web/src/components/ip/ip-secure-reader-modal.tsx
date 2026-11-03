"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Lock,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Building2,
  ArrowRight,
  Loader2,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { IPAssetItem } from "@/lib/ip-registry-data";

interface IPSecureReaderModalProps {
  ip: IPAssetItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IPSecureReaderModal({ ip, isOpen, onClose }: IPSecureReaderModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState("Initializing secure document sandbox...");
  const [loadError, setLoadError] = useState<string | null>(null);

  const docContainerRef = useRef<HTMLDivElement>(null);
  const styleContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & security traps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      // Block save (Cmd+S / Ctrl+S) & print (Cmd+P / Ctrl+P)
      if ((e.metaKey || e.ctrlKey) && (e.key === "s" || e.key === "p" || e.key === "S" || e.key === "P")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  // Load and render authentic Word document via docx-preview
  useEffect(() => {
    let isCancelled = false;

    if (!isOpen || !ip) {
      setIsLoading(true);
      setLoadError(null);
      return;
    }

    const renderWordDocument = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        setZoomLevel(1);
        setLoadProgress("Connecting to authoritative SIPAIR repository...");

        // Fetch document ArrayBuffer from internal secure API
        const response = await fetch(`/api/ip/document/${ip.id}`);
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `Document file "${ip.file}" could not be located on the server.`
              : `Server returned error (${response.status}) fetching document.`
          );
        }

        if (isCancelled) return;
        setLoadProgress("Extracting embedded schematics, topologies & tables...");

        const arrayBuffer = await response.arrayBuffer();

        if (isCancelled) return;
        setLoadProgress("Rendering authentic paginated document sheets...");

        // Dynamically import docx-preview to ensure client-only browser DOM execution
        const docx = await import("docx-preview");

        if (isCancelled || !docContainerRef.current) return;

        // Clean container before render
        docContainerRef.current.innerHTML = "";
        if (styleContainerRef.current) {
          styleContainerRef.current.innerHTML = "";
        }

        // Render full document with authentic pagination, headers, footers, tables and media
        await docx.renderAsync(
          arrayBuffer,
          docContainerRef.current,
          styleContainerRef.current || undefined,
          {
            className: "docx",
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            breakPages: true,
            renderHeaders: true,
            renderFooters: true,
            renderFootnotes: true,
            renderEndnotes: true,
            useBase64URL: true,
            ignoreFonts: false,
          }
        );

        if (!isCancelled) {
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Error rendering authentic IP document:", err);
        if (!isCancelled) {
          setLoadError(err?.message || "Failed to render document.");
          setIsLoading(false);
        }
      }
    };

    renderWordDocument();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, ip]);

  if (!isOpen || !ip) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 md:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none print:hidden"
      onClick={() => {
        if (!isFullscreen) onClose();
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        className={`relative w-full bg-[#18181b] border border-[#27272a] shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden text-[#f4f4f5] transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 h-screen rounded-none z-50"
            : "max-w-7xl h-[94vh] rounded-[20px] sm:rounded-[28px]"
        }`}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Dynamic style sheet container for docx-preview */}
        <div ref={styleContainerRef} />

        {/* Custom CSS overrides for docx-preview to give it an Apple-grade authentic paper look */}
        <style jsx global>{`
          .docx-wrapper {
            background: transparent !important;
            padding: 32px 16px 80px 16px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 28px !important;
          }
          .docx-wrapper > section.docx {
            background: #ffffff !important;
            color: #1d1d1f !important;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.15) !important;
            border-radius: 4px !important;
            margin-bottom: 28px !important;
            box-sizing: border-box !important;
            max-width: 100% !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }
          .docx-wrapper > section.docx * {
            user-select: none !important;
            -webkit-user-select: none !important;
          }
          .docx-wrapper > section.docx img {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-drag: none !important;
            border-radius: 4px !important;
          }
          .docx-wrapper > section.docx table {
            border-collapse: collapse !important;
            margin: 12px 0 !important;
          }
          @media print {
            body {
              display: none !important;
            }
          }
        `}</style>

        {/* Anti-Screenshot Diagonal Watermark Overlay */}
        <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.035] flex items-center justify-center overflow-hidden">
          <div className="w-[200%] text-center text-white font-mono text-xs sm:text-sm font-black -rotate-25 tracking-[0.28em] leading-[4rem] whitespace-normal">
            {Array(35)
              .fill(
                `SMPS TECH LAB • PROPRIETARY IP ASSET • ${ip.code} • CONFIDENTIAL • SCREENSHOT PROHIBITED • VIEW ONLY • STRICTLY NON-DOWNLOADABLE • `
              )
              .join(" ")}
          </div>
        </div>

        {/* Top Professional Header Bar */}
        <header className="p-3.5 sm:p-4 px-5 sm:px-6 border-b border-[#27272a] bg-[#121215] flex items-center justify-between gap-4 z-40 shrink-0">
          {/* Document Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center border border-blue-500/20 shrink-0">
              <Lock className="w-4 h-4 text-[#38bdf8]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-wider uppercase">
                  {ip.code}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:inline-block" />
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {ip.status}
                </span>
                <span className="text-[10px] hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Protected True Document View
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl mt-0.5">
                {ip.title}
              </h2>
            </div>
          </div>

          {/* Controls: Zoom, Fullscreen, Close */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Zoom Widget */}
            <div className="flex items-center gap-1 bg-zinc-800/90 border border-zinc-700 rounded-full p-1 px-2 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.65, z - 0.1))}
                className="p-1 hover:text-[#38bdf8] transition cursor-pointer text-zinc-400 hover:bg-zinc-700/50 rounded-full"
                title="Zoom Out"
                disabled={isLoading}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 text-zinc-300 min-w-[38px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                className="p-1 hover:text-[#38bdf8] transition cursor-pointer text-zinc-400 hover:bg-zinc-700/50 rounded-full"
                title="Zoom In"
                disabled={isLoading}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-[#38bdf8] transition cursor-pointer ml-0.5 border-l border-zinc-700 pl-1.5 text-zinc-400"
                title="Reset to 100%"
                disabled={isLoading}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer border border-zinc-700 hidden sm:inline-flex"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Document View"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Commercial Licensing CTA */}
            <Link
              href={`/contact?inquiry=ip-licensing&ip=${encodeURIComponent(ip.code)}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs transition shadow-sm"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial Licensing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition cursor-pointer border border-zinc-700 hover:border-zinc-500"
              aria-label="Close document viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Document Reading Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-auto bg-[#232328] relative scroll-smooth">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#18181b]/95 backdrop-blur-sm text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-zinc-700 border-t-[#0071e3] animate-spin" />
                <FileText className="w-6 h-6 text-[#38bdf8] absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Opening Authentic Patent Document
                </h3>
                <p className="text-xs text-zinc-400 font-mono">{loadProgress}</p>
                <div className="pt-2 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                  <span>Parsing embedded high-resolution schematics, curves & tables</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {loadError && !isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#18181b] text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-base font-bold text-white">Document Loading Failed</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{loadError}</p>
                <button
                  type="button"
                  onClick={() => {
                    setLoadError(null);
                    setIsLoading(true);
                  }}
                  className="px-4 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold hover:bg-[#0077ed] transition mt-2 cursor-pointer shadow-sm"
                >
                  Retry Document Render
                </button>
              </div>
            </div>
          )}

          {/* Genuine Document Pages Container */}
          <div
            className="w-full min-h-full flex flex-col items-center justify-start transition-transform duration-150 origin-top"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top center",
            }}
          >
            {/* The rendered docx pages are mounted inside this element */}
            <div
              ref={docContainerRef}
              className="w-full flex flex-col items-center"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </main>

        {/* Bottom Security Footer */}
        <footer className="p-2.5 px-6 border-t border-[#27272a] bg-[#121215] flex items-center justify-between text-[11px] text-zinc-400 z-40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-zinc-300">
              Session Protected • Screen Capture Prohibited
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-500 font-mono text-[10px]">
            <span>AUTHOR: {ip.author}</span>
            <span>•</span>
            <span>ASSIGNEE: SMPS TECH LAB</span>
            <span>•</span>
            <span>REF: {ip.code}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
