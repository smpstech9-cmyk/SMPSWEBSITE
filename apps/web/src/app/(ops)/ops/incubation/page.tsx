"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Rocket,
  Save,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  Cpu,
  Layers,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { CMS_IncubationContent } from "@/lib/cms-store";
import { FAQItem } from "@/components/ui/faq-accordion";

export default function IncubationEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<CMS_IncubationContent>(content.incubation);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (content.incubation) {
      setForm(content.incubation);
    }
  }, [content.incubation]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("incubation", form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePerkChange = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev.founderPerks];
      updated[index] = value;
      return { ...prev, founderPerks: updated };
    });
  };

  const handleAddPerk = () => {
    setForm((prev) => ({
      ...prev,
      founderPerks: [...prev.founderPerks, "New Founder Ecosystem Advantage or Facility Access"],
    }));
  };

  const handleRemovePerk = (index: number) => {
    setForm((prev) => ({
      ...prev,
      founderPerks: prev.founderPerks.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (id: string, field: keyof FAQItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    }));
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `inc-faq-${Date.now()}`,
      question: "New Incubation & Acceleration Question?",
      answer: "Detailed policy or laboratory access explanation for founders.",
      category: "Admissions",
    };
    setForm((prev) => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
  };

  const handleRemoveFaq = (id: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Entrepreneurship & Ventures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Hardware Entrepreneurship <span className="text-gradient-apple-blue">Center Editor</span>
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
            href="/entrepreneur"
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
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* 1. HERO HEADLINE & EYEBROW */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#e5e5ea] pb-4">
          <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#059669]" />
            Incubation Hero Keynote & Headline
          </h2>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            Configure the opening statement, accelerator eyebrow, and value proposition on the incubation portal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-1.5">
              Hero Eyebrow Badge
            </label>
            <input
              type="text"
              value={form.heroEyebrow}
              onChange={(e) => setForm({ ...form, heroEyebrow: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-1.5">
              Hero Title Headline
            </label>
            <input
              type="text"
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-1.5">
              Hero Subtitle & Hardware Mission Statement
            </label>
            <textarea
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>
        </div>
      </div>

      {/* 2. FACILITY & PROTOTYPING BENCH SECTION */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#e5e5ea] pb-4">
          <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#0071e3]" />
            Hardware Workbench & Equipment Section
          </h2>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            Describe the physical laboratory instruments, oscilloscopes, and load banks available to founders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-1.5">
              Facility Section Title
            </label>
            <input
              type="text"
              value={form.facilityTitle}
              onChange={(e) => setForm({ ...form, facilityTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-1.5">
              Facility Description
            </label>
            <textarea
              rows={3}
              value={form.facilityDesc}
              onChange={(e) => setForm({ ...form, facilityDesc: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>
        </div>
      </div>

      {/* 3. FOUNDER PERKS & ADVANTAGES */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Founder Ecosystem Perks ({form.founderPerks.length})
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Key incentives and institutional advantages provided to incubated teams.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddPerk}
            className="px-4 py-2 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Perk</span>
          </button>
        </div>

        <div className="space-y-3">
          {form.founderPerks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#6e6e73] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <input
                type="text"
                value={perk}
                onChange={(e) => handlePerkChange(idx, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
              <button
                type="button"
                onClick={() => handleRemovePerk(idx)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                title="Remove perk"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INCUBATION FREQUENTLY ASKED QUESTIONS */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Incubation & Prototyping FAQs ({form.faqs.length})
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Manage questions and official answers regarding IP ownership, zero equity terms, and lab access.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            className="px-4 py-2 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4">
          {form.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono font-bold text-[#86868b] uppercase">
                  FAQ #{index + 1}
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={faq.category || ""}
                    onChange={(e) => handleFaqChange(faq.id, "category", e.target.value)}
                    placeholder="Category (e.g. IP Rights, Equity, Facilities)"
                    className="px-3 py-1 rounded-lg border border-[#e5e5ea] text-xs font-semibold text-[#0071e3] bg-white w-48"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(faq.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6e6e73] uppercase mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(faq.id, "question", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] font-semibold bg-white focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6e6e73] uppercase mb-1">
                  Official Answer
                </label>
                <textarea
                  rows={3}
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(faq.id, "answer", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-sm text-[#1d1d1f] bg-white focus:outline-none focus:border-[#0071e3]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
