"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Cpu,
  Radio,
  LogOut,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  BatteryCharging,
  Zap,
} from "lucide-react";
import { SHOW_NAVBAR_CART_BUTTON, SHOW_NAVBAR_SIGNIN_BUTTON } from "@/lib/store-config";
import { useSiteContent } from "@/context/content-context";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut, isAdmin, isStudent } = useAuth();
  const { content } = useSiteContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Sliding Indicator Animation (Option 4: Floating Sliding Pill + Glowing Bottom Notch)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const internshipTracks = [
    {
      title: "EV Powertrains & High-Voltage BMS",
      slug: "ev-powertrain-bms",
      desc: "LFP cell modeling, active balancing & CAN-FD",
      icon: BatteryCharging,
    },
    {
      title: "Industrial Power Electronics & Magnetics",
      slug: "vtu-power-electronics-smps",
      desc: "Transformer design, GaN/SiC half-bridge gate drivers",
      icon: Zap,
    },
    {
      title: "SaralaChip™ Embedded DSP Firmware",
      slug: "saralachip-embedded-dsp",
      desc: "Closed-loop PWM, space vector & hardware-in-the-loop",
      icon: Cpu,
    },
    {
      title: "IoT & Smart Energy Telemetry",
      slug: "iot-embedded-systems",
      desc: "Microcontrollers, Modbus telemetry & edge sensors",
      icon: Radio,
    },
  ];

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "R&D", href: "/rnd" },
    { label: "Entrepreneurship", href: "/entrepreneur" },
    { label: "Hardware Store", href: "/store" },
    { label: "VTU Internships", href: "/internships", hasDropdown: true },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Careers", href: "/careers" },
    { label: "ExCom", href: "/excom" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Active index calculation based on route
  const activeIndex = useMemo(() => {
    const exact = navLinks.findIndex((link) => link.href === pathname);
    if (exact !== -1) return exact;

    const sub = navLinks.findIndex((link) => {
      if (link.href === "/") return false;
      return pathname.startsWith(link.href);
    });
    if (sub !== -1) return sub;

    return 0;
  }, [pathname, navLinks]);

  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateIndicator = () => {
      const container = navRef.current;
      const target = itemRefs.current[targetIndex];
      if (!container || !target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    const raf = requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [targetIndex, mounted]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      {content.global.announcementBarEnabled && content.global.announcementText && (
        <div className="bg-[#0071e3] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>{content.global.announcementText}</span>
          {content.global.announcementLink && (
            <Link
              href={content.global.announcementLink}
              className="underline font-bold hover:text-white/80 inline-flex items-center gap-0.5"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Emblem & Logo - Large, Perfectly Centered */}
        <Link href="/" className="flex items-center shrink-0 group" aria-label="SMPS Electric Control Home">
          <Image
            src="/logos/SMPS.png"
            alt="SMPS Electric - Think Beyond Smart Powertronics"
            width={280}
            height={88}
            priority
            unoptimized
            className="h-10 sm:h-12 md:h-[52px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation - Option 4 Sliding Floating Pill with Glowing Bottom Notch */}
        <nav
          ref={navRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-black/[0.035] border border-black/[0.05] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
        >
          {/* Sliding Pill & Glowing Bottom Notch (Option 4) */}
          {mounted && (
            <div
              className={`absolute top-1 bottom-1 left-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-black/[0.06] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-end justify-center ${
                indicatorStyle.opacity > 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
              }}
              aria-hidden="true"
            >
              {/* Glowing bottom notch indicator */}
              <div className="mb-0.5 h-[2.5px] w-4.5 rounded-full bg-[#0071e3] shadow-[0_0_8px_rgba(0,113,227,0.55)] transition-all duration-300" />
            </div>
          )}

          {navLinks.map((link, index) => {
            const isRouteActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href);
            const isCurrent = (hoveredIndex !== null ? hoveredIndex : activeIndex) === index;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative shrink-0"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    href={link.href}
                    className={`relative z-10 whitespace-nowrap inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12.5px] tracking-tight transition-colors duration-200 ${
                      isCurrent
                        ? "text-[#0071e3] font-bold"
                        : "text-[#515154] hover:text-[#1d1d1f] font-medium"
                    } ${!mounted && isRouteActive ? "bg-white shadow-xs border border-black/[0.07] font-bold text-[#0071e3]" : ""}`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 shrink-0 ${
                        isCurrent ? "text-[#0071e3]" : "text-[#86868b]"
                      } ${isDropdownOpen ? "rotate-180 text-[#1d1d1f]" : ""}`}
                    />
                  </Link>

                  {/* Dropdown Menu - Frosted Light Popover */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-88 pt-2.5 z-50">
                      <div className="p-3 bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-[#e5e5ea] animate-in fade-in-50 slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#86868b] border-b border-[#f5f5f7] mb-2 flex items-center justify-between">
                          <span>VTU R&D Campus Bays</span>
                          <span className="text-[#0071e3] font-mono">Bengaluru</span>
                        </div>
                        <div className="space-y-1">
                          {internshipTracks.map((track) => {
                            const Icon = track.icon;
                            return (
                              <Link
                                key={track.title}
                                href={`/internships/${track.slug}`}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f5f5f7] transition group"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0071e3] border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0071e3] group-hover:text-white transition">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition">
                                    {track.title}
                                  </div>
                                  <div className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">
                                    {track.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-2 pt-2 border-t border-[#f5f5f7] text-center">
                          <Link
                            href="/internships"
                            className="text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] inline-flex items-center gap-1 py-1"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Explore All Tracks & Curriculum
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative z-10 whitespace-nowrap px-3 py-1.5 rounded-full text-[12.5px] tracking-tight transition-colors duration-200 shrink-0 ${
                  isCurrent
                    ? "text-[#0071e3] font-bold"
                    : "text-[#515154] hover:text-[#1d1d1f] font-medium"
                } ${!mounted && isRouteActive ? "bg-white shadow-xs border border-black/[0.07] font-bold text-[#0071e3]" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls (Strictly Single Line, never wraps) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Dedicated Corporate R&D Partnership CTA Pill */}
          <Link
            href="/partner"
            className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12.5px] font-bold shadow-[0_3px_12px_rgba(0,113,227,0.32)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-100 flex-shrink-0" />
            <span className="whitespace-nowrap">Partner with R&D</span>
          </Link>

          {/* Cart Icon (Toggleable) */}
          {SHOW_NAVBAR_CART_BUTTON && (
            <Link
              href="/cart"
              className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] rounded-full bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.06] transition relative shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0071e3] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-white">
                0
              </span>
            </Link>
          )}

          {/* User Profile / Portal Login (Toggleable) */}
          {SHOW_NAVBAR_SIGNIN_BUTTON && (
            isAuthenticated ? (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="whitespace-nowrap flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.06] text-[#1d1d1f] text-[12px] font-medium transition"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {user?.full_name?.charAt(0) || "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.full_name?.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[#86868b] shrink-0" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-[#e5e5ea] z-50 animate-in fade-in-50 duration-150">
                    <div className="px-3 py-2 border-b border-[#f5f5f7] mb-1">
                      <p className="text-[10px] uppercase font-bold text-[#86868b]">Signed in as</p>
                      <p className="text-xs font-semibold text-[#1d1d1f] truncate">{user?.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1d1d1f] hover:bg-blue-50 hover:text-[#0071e3] rounded-xl transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#0071e3]" />
                        Admin Control Center
                      </Link>
                    )}

                    {isStudent && (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1d1d1f] hover:bg-blue-50 hover:text-[#0071e3] rounded-xl transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#0071e3]" />
                        Student Portal
                      </Link>
                    )}

                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-xl transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#0071e3]" />
                      Hardware Orders
                    </Link>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition text-left mt-1 border-t border-[#f5f5f7] pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.06] text-[#1d1d1f] text-[12px] font-semibold transition"
              >
                Sign In
              </Link>
            )
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {SHOW_NAVBAR_CART_BUTTON && (
            <Link
              href="/cart"
              className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] rounded-full transition relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] rounded-xl hover:bg-black/[0.04] transition"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white/98 backdrop-blur-2xl px-5 pt-4 pb-8 shadow-2xl space-y-3 animate-in slide-in-from-top-4 duration-200">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Overview
          </Link>
          <Link
            href="/rnd"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            R&D
          </Link>
          <Link
            href="/entrepreneur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Entrepreneurship & Ventures
          </Link>
          <Link
            href="/store"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Hardware Store
          </Link>
          <Link
            href="/internships"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            VTU Internships
          </Link>
          <div className="pl-4 space-y-1.5 border-l border-blue-400/40 my-1">
            {internshipTracks.map((t) => (
              <Link
                key={t.title}
                href={`/internships/${t.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs text-[#6e6e73] hover:text-[#0071e3] py-1"
              >
                {t.title}
              </Link>
            ))}
          </div>
          <Link
            href="/events"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Events & Symposia
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Gallery Showcase
          </Link>
          <Link
            href="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f] flex items-center justify-between"
          >
            <span>Careers & Fellowships</span>
            <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Hiring</span>
          </Link>
          <Link
            href="/excom"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Executive Committee (ExCom)
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#1d1d1f]"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-black/[0.06]">
            <Link
              href="/partner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3 text-center text-xs font-bold rounded-full bg-[#0071e3] text-white shadow-sm mb-3"
            >
              Partner with R&D
            </Link>

            {SHOW_NAVBAR_SIGNIN_BUTTON && (
              isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-[#f5f5f7] text-[#1d1d1f]"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-gray-100 text-[#6e6e73]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 text-center text-xs font-semibold rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea]"
                >
                  Sign In to Portal
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
