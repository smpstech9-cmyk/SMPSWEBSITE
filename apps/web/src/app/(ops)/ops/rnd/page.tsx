"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { RnDPageContent, ResearchBayItem, PublicationItem } from "@/lib/cms-store";

export default function RnDEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<RnDPageContent>(content.rnd);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (content.rnd) {
      setForm(content.rnd);
    }
  }, [content.rnd]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("rnd", form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleBayChange = (id: string, field: keyof ResearchBayItem, value: any) => {
    setForm((prev) => ({
      ...prev,
      bays: prev.bays.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  };

  const handleAddBay = () => {
    const newBay: ResearchBayItem = {
      id: `bay-${Date.now()}`,
      name: "New Research Laboratory Bay",
      focusArea: "High-Frequency Conversion & Thermal Dissipation",
      equipment: ["Precision Power Quality Analyzer", "High-Bandwidth Current Probe"],
      leadInvestigator: "Dr. Faculty Lead",
      description: "Dedicated experimental bay investigating novel magnetics and topology efficiency curves.",
    };
    setForm((prev) => ({ ...prev, bays: [...prev.bays, newBay] }));
  };

  const handleRemoveBay = (id: string) => {
    setForm((prev) => {
      const next = { ...prev, bays: prev.bays.filter((b) => b.id !== id) };
      updateSection("rnd", next);
      return next;
    });
  };

  const handlePubChange = (id: string, field: keyof PublicationItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      publications: prev.publications.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleAddPub = () => {
    const newPub: PublicationItem = {
      id: `pub-${Date.now()}`,
      title: "Novel Modulation Scheme for Grid-Tied High-Efficiency Central Inverters",
      authors: "SMPS Research Team",
      venue: "IEEE Conference on Power Electronics & Renewable Energy",
      year: "2026",
      doiOrUrl: "https://doi.org/10.1109/sample",
    };
    setForm((prev) => {
      const next = { ...prev, publications: [...prev.publications, newPub] };
      updateSection("rnd", next);
      return next;
    });
  };

  const handleRemovePub = (id: string) => {
    setForm((prev) => {
      const next = { ...prev, publications: prev.publications.filter((p) => p.id !== id) };
      updateSection("rnd", next);
      return next;
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">R&D & Testbeds Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Research & Development <span className="text-gradient-apple-blue">Manager</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live!</span>
            </div>
          )}
          <Link
            href="/rnd"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Page</span>
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition active:scale-[0.98] inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Changes</span>
          </button>
        </div>
      </div>

      {/* 1. HEADLINES & SUMMARY METRICS */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-5 shadow-xs">
        <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-purple-600" />
          R&D Header & Global Impact Metrics
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1">
              Headline
            </label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1">
              Subheadline Narrative
            </label>
            <textarea
              rows={2}
              value={form.subheadline}
              onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1">
                Patents Published Counter
              </label>
              <input
                type="text"
                value={form.patentsCount}
                onChange={(e) => setForm({ ...form, patentsCount: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-bold text-[#1d1d1f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1">
                Grants & Funding Metric
              </label>
              <input
                type="text"
                value={form.grantsAmount}
                onChange={(e) => setForm({ ...form, grantsAmount: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-bold text-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. RESEARCH BAYS & FACILITIES */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f]">Campus Research Bays & Equipment</h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Physical engineering testbenches inside the VTU-VRIF Center.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddBay}
            className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] hover:bg-blue-100 text-xs font-semibold transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Research Bay</span>
          </button>
        </div>

        <div className="space-y-4">
          {form.bays.map((bay, idx) => (
            <div
              key={bay.id}
              className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-600">
                  Bay #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveBay(bay.id)}
                  className="text-gray-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Bay Name
                  </label>
                  <input
                    type="text"
                    value={bay.name}
                    onChange={(e) => handleBayChange(bay.id, "name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Core Focus Area
                  </label>
                  <input
                    type="text"
                    value={bay.focusArea}
                    onChange={(e) => handleBayChange(bay.id, "focusArea", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={bay.description}
                  onChange={(e) => handleBayChange(bay.id, "description", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Lead Investigator / In-Charge
                  </label>
                  <input
                    type="text"
                    value={bay.leadInvestigator}
                    onChange={(e) => handleBayChange(bay.id, "leadInvestigator", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Key Equipment List (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={bay.equipment.join(", ")}
                    onChange={(e) =>
                      handleBayChange(
                        bay.id,
                        "equipment",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PUBLICATIONS & PATENTS */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f]">Publications & Technical Papers</h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Journal publications, IEEE conference proceedings, and whitepapers.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddPub}
            className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] hover:bg-blue-100 text-xs font-semibold transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Publication</span>
          </button>
        </div>

        <div className="space-y-4">
          {form.publications.map((pub, idx) => (
            <div
              key={pub.id}
              className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#0071e3]">
                  Paper #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePub(pub.id)}
                  className="text-gray-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                  Paper Title
                </label>
                <input
                  type="text"
                  value={pub.title}
                  onChange={(e) => handlePubChange(pub.id, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Authors
                  </label>
                  <input
                    type="text"
                    value={pub.authors}
                    onChange={(e) => handlePubChange(pub.id, "authors", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={pub.year}
                    onChange={(e) => handlePubChange(pub.id, "year", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Venue / Journal
                  </label>
                  <input
                    type="text"
                    value={pub.venue}
                    onChange={(e) => handlePubChange(pub.id, "venue", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    DOI / Reference Link
                  </label>
                  <input
                    type="text"
                    value={pub.doiOrUrl}
                    onChange={(e) => handlePubChange(pub.id, "doiOrUrl", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
