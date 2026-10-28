"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Bell,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { GlobalSiteSettings } from "@/lib/cms-store";

export default function GlobalSettingsPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<GlobalSiteSettings>(content.global);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (content.global) {
      setForm(content.global);
    }
  }, [content.global]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("global", form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Global Coordinates & Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Global Settings <span className="text-gradient-apple-blue">& Banners</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live!</span>
            </div>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition active:scale-[0.98] inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#0071e3]" />
              Top Announcement Marquee Banner
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Pinned banner rendered at the very top of all public pages.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setForm({ ...form, announcementBarEnabled: !form.announcementBarEnabled })}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              form.announcementBarEnabled
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {form.announcementBarEnabled ? "Banner Active" : "Banner Disabled"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
              Announcement Message
            </label>
            <input
              type="text"
              value={form.announcementText}
              onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs text-[#1d1d1f]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
              Click Destination URL
            </label>
            <input
              type="text"
              value={form.announcementLink}
              onChange={(e) => setForm({ ...form, announcementLink: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* 2. CAMPUS COORDINATES & CONTACT */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#e5e5ea] pb-4">
          <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            Institutional Contact Coordinates
          </h2>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            Published in the footer, contact desk, and verification headers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
              Desk Phone Number
            </label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
            Physical Campus Address
          </label>
          <textarea
            rows={2}
            value={form.facilityAddress}
            onChange={(e) => setForm({ ...form, facilityAddress: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs text-[#1d1d1f] leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
}
