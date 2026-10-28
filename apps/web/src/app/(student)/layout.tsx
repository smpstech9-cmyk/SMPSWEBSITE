"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  GraduationCap,
  FileCode2,
  Award,
  ShoppingBag,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      label: "Overview Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "My Internships & LMS",
      href: "/my-courses",
      icon: GraduationCap,
      badge: "Active",
    },
    {
      label: "Hardware Orders",
      href: "/orders",
      icon: ShoppingBag,
      badge: null,
    },
    {
      label: "GST Tax Receipts",
      href: "/receipts",
      icon: FileText,
      badge: null,
    },
    {
      label: "Account Settings",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3] flex flex-col md:flex-row relative">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-xl border-b border-[#e5e5ea] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/SMPS.png"
            alt="SMPS Electric"
            width={100}
            height={36}
            unoptimized
            className="h-7 w-auto object-contain"
          />
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#0071e3]/10 text-[#0071e3]">
            Student
          </span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl border border-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f]"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop & Mobile Collapsible Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-50 w-72 bg-[#fbfbfd] border-r border-[#e5e5ea] p-5 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Portal Telemetry */}
          <div className="pb-5 border-b border-[#e5e5ea]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logos/SMPS.png"
                alt="SMPS Electric"
                width={130}
                height={46}
                unoptimized
                className="h-8 w-auto object-contain group-hover:scale-105 transition duration-200"
              />
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20">
                Student
              </span>
            </Link>

            {/* University Facility Eyebrow Badge */}
            <div className="mt-4 px-3 py-1.5 rounded-xl bg-white border border-[#e5e5ea] flex items-center justify-between text-[11px] shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="font-semibold text-[#1d1d1f]">VTU-VRIF Center</span>
              </div>
              <span className="font-mono text-[10px] text-[#0071e3] font-bold">
                Scholar Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#0071e3] text-white shadow-[0_4px_14px_rgba(0,113,227,0.25)]"
                      : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-50 text-[#0071e3] border border-blue-100"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Academic Hub Links */}
          <div className="pt-4 border-t border-[#e5e5ea] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] px-3 block">
              University Services
            </span>
            <Link
              href="/verify"
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#0071e3] hover:bg-black/[0.02] rounded-xl transition"
            >
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Verify VTU Certificate</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
            </Link>
            <Link
              href="/store"
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#0071e3] hover:bg-black/[0.02] rounded-xl transition"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-[#059669]" />
                <span>Hardware Student Kits</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#0071e3] hover:bg-black/[0.02] rounded-xl transition"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Public Website</span>
              </div>
            </Link>
          </div>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-[#e5e5ea] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0071e3] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
              {user?.full_name?.charAt(0) || "S"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1d1d1f] truncate leading-tight">
                {user?.full_name || "Student Scholar"}
              </p>
              <p className="text-[10px] text-[#6e6e73] truncate font-mono">
                {user?.email || "scholar@vtu.ac.in"}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="p-2 text-[#86868b] hover:text-rose-600 rounded-full hover:bg-black/[0.04] transition"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-white relative overflow-hidden flex flex-col">
        {/* Ambient Radial Backlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-gradient-to-b from-blue-500/[0.05] via-indigo-500/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <main className="flex-1 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
