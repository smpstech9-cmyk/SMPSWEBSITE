"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Save,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar,
  Layers,
  Cpu,
  HelpCircle,
  Activity,
  Zap,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import {
  HomePageContent,
  MetricStat,
  TechnologyHighlight,
  CMS_MilestoneItem,
  CMS_DomainPillar,
  CMS_UpcomingProduct,
} from "@/lib/cms-store";
import { FAQItem } from "@/components/ui/faq-accordion";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function HomeEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<HomePageContent>(content.home);

  useEffect(() => {
    if (content.home) {
      setForm(content.home);
    }
  }, [content.home]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "hero" | "stats" | "technologies" | "milestones" | "domains" | "upcoming" | "faqs" | "cta"
  >("hero");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("home", form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // 1. Stats Handlers
  const handleStatChange = (id: string, field: keyof MetricStat, value: string) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const handleAddStat = () => {
    const newStat: MetricStat = {
      id: `stat-${Date.now()}`,
      value: "99%",
      label: "New Keynote Metric",
      subtext: "Operational milestone verification",
    };
    setForm((prev) => ({ ...prev, stats: [...prev.stats, newStat] }));
  };

  const handleRemoveStat = (id: string) => {
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((s) => s.id !== id) }));
  };

  // 2. Tech Handlers
  const handleTechChange = (id: string, field: keyof TechnologyHighlight, value: any) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    }));
  };

  const handleAddTech = () => {
    const newTech: TechnologyHighlight = {
      id: `tech-${Date.now()}`,
      badge: "Clean Tech Innovation",
      title: "New Indigenous System",
      description: "Description of the new engineering system developed at SMPS Tech Lab.",
      specs: ["Industrial grade reliability", "High-efficiency switching"],
      linkUrl: "/store",
    };
    setForm((prev) => ({ ...prev, technologies: [...prev.technologies, newTech] }));
  };

  const handleRemoveTech = (id: string) => {
    setForm((prev) => ({ ...prev, technologies: prev.technologies.filter((t) => t.id !== id) }));
  };

  // 3. Milestones Handlers
  const handleMilestoneChange = (id: string, field: keyof CMS_MilestoneItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      milestones: (prev.milestones || []).map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  const handleAddMilestone = () => {
    const newM: CMS_MilestoneItem = {
      id: `m-${Date.now()}`,
      year: "2027",
      quarter: "Q1 - Q2",
      badge: "New Milestone",
      title: "Phase Expansion & Advanced Testing",
      desc: "Detailed description of the university-industry roadmap progress.",
      metrics: "Commercial Target • Performance Verified",
    };
    setForm((prev) => ({
      ...prev,
      milestones: [...(prev.milestones || []), newM],
    }));
  };

  const handleRemoveMilestone = (id: string) => {
    setForm((prev) => ({
      ...prev,
      milestones: (prev.milestones || []).filter((m) => m.id !== id),
    }));
  };

  // 4. Domains Handlers
  const handleDomainChange = (id: string, field: keyof CMS_DomainPillar, value: any) => {
    setForm((prev) => ({
      ...prev,
      domains: (prev.domains || []).map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    }));
  };

  const handleAddDomain = () => {
    const newD: CMS_DomainPillar = {
      id: `domain-${Date.now()}`,
      title: "New Technology Pillar",
      badge: "DeepTech",
      desc: "Advanced engineering research focus area.",
      features: ["Laboratory Workbench", "DFM Advisory", "Pre-Compliance Testing"],
      link: "/rnd",
    };
    setForm((prev) => ({
      ...prev,
      domains: [...(prev.domains || []), newD],
    }));
  };

  const handleRemoveDomain = (id: string) => {
    setForm((prev) => ({
      ...prev,
      domains: (prev.domains || []).filter((d) => d.id !== id),
    }));
  };

  // 5. Upcoming Products Handlers
  const handleUpcomingChange = (id: string, field: keyof CMS_UpcomingProduct, value: any) => {
    setForm((prev) => ({
      ...prev,
      upcomingProducts: (prev.upcomingProducts || []).map((u) =>
        u.id === id ? { ...u, [field]: value } : u
      ),
    }));
  };

  const handleAddUpcoming = () => {
    const newU: CMS_UpcomingProduct = {
      id: `up-${Date.now()}`,
      name: "New Upcoming System",
      brand: "SMPS R&D™",
      tagline: "Next-generation energy hardware",
      stage: "R&D in Progress • Validation Bay",
      imageUrl: "/images/products/quantum-bess.jpg",
      status: "Upcoming R&D",
      specs: ["1500V DC Compatible", "CAN-FD Telemetry", "Liquid Thermal Loop"],
      availability: "Trials: Q4 2027",
      link: "/store",
    };
    setForm((prev) => ({
      ...prev,
      upcomingProducts: [...(prev.upcomingProducts || []), newU],
    }));
  };

  const handleRemoveUpcoming = (id: string) => {
    setForm((prev) => ({
      ...prev,
      upcomingProducts: (prev.upcomingProducts || []).filter((u) => u.id !== id),
    }));
  };

  // 6. FAQ Handlers
  const handleFaqChange = (id: string, field: keyof FAQItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    }));
  };

  const handleAddFaq = () => {
    const newF: FAQItem = {
      id: `faq-${Date.now()}`,
      question: "New Homepage Question?",
      answer: "Detailed official response for students, clients, and partners.",
      category: "General",
    };
    setForm((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), newF],
    }));
  };

  const handleRemoveFaq = (id: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((f) => f.id !== id),
    }));
  };

  const tabs = [
    { key: "hero", label: "Hero Keynote" },
    { key: "stats", label: `Stats (${form.stats.length})` },
    { key: "technologies", label: `Tech Cards (${form.technologies.length})` },
    { key: "milestones", label: `Milestones (${(form.milestones || []).length})` },
    { key: "domains", label: `Domains (${(form.domains || []).length})` },
    { key: "upcoming", label: `Upcoming (${(form.upcomingProducts || []).length})` },
    { key: "faqs", label: `FAQs (${(form.faqs || []).length})` },
    { key: "cta", label: "CTA Banner" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/95 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Home Page Editor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Home Page <span className="text-gradient-apple-blue">Content Manager</span>
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
            href="/"
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

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#e5e5ea] no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              activeTab === tab.key
                ? "bg-[#0071e3] text-white shadow-sm"
                : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. HERO BANNER SECTION */}
      {activeTab === "hero" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-[#e5e5ea] pb-4">
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0071e3]" />
              Hero Section Keynote & Headlines
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              The flagship keynote title and value proposition displayed at the top of the homepage.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Eyebrow Badge (Accreditation)
              </label>
              <input
                type="text"
                value={form.heroEyebrow}
                onChange={(e) => setForm({ ...form, heroEyebrow: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine1}
                  onChange={(e) => setForm({ ...form, heroTitleLine1: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0071e3] mb-1">
                  Title Highlight (Gradient)
                </label>
                <input
                  type="text"
                  value={form.heroTitleHighlight}
                  onChange={(e) => setForm({ ...form, heroTitleHighlight: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#0071e3]/40 bg-blue-50/20 text-xs font-bold text-[#0071e3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  Title Line 2
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine2}
                  onChange={(e) => setForm({ ...form, heroTitleLine2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Hero Subtitle Copy
              </label>
              <textarea
                rows={3}
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. KEY METRICS (STATS) */}
      {activeTab === "stats" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f]">Hero Keynote Metric Counter Cards</h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Dynamic 4-card statistics strip below the primary hero keynote banner.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddStat}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="p-4 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#86868b]">
                    Metric #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(stat.id)}
                    className="text-gray-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] mb-1">
                      Big Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-sm font-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] mb-1">
                    Supporting Subtext
                  </label>
                  <input
                    type="text"
                    value={stat.subtext}
                    onChange={(e) => handleStatChange(stat.id, "subtext", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-[11px] text-[#6e6e73]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FEATURED TECHNOLOGIES */}
      {activeTab === "technologies" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f]">Featured Technology Pillars</h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Core proprietary systems showcased on the homepage (PURNA BESS, SaralaChip, Swarnali).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTech}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Technology</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.technologies.map((tech, idx) => (
              <div
                key={tech.id}
                className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#86868b]">
                    Technology #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech.id)}
                    className="text-gray-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Category Badge
                    </label>
                    <input
                      type="text"
                      value={tech.badge}
                      onChange={(e) => handleTechChange(tech.id, "badge", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      System Name / Title
                    </label>
                    <input
                      type="text"
                      value={tech.title}
                      onChange={(e) => handleTechChange(tech.id, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={tech.description}
                    onChange={(e) => handleTechChange(tech.id, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Specifications (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={tech.specs.join(", ")}
                      onChange={(e) =>
                        handleTechChange(
                          tech.id,
                          "specs",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Destination Link URL
                    </label>
                    <input
                      type="text"
                      value={tech.linkUrl}
                      onChange={(e) => handleTechChange(tech.id, "linkUrl", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. COLLABORATION MILESTONES (ITEM 1) */}
      {activeTab === "milestones" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Collaboration Section Timeline Roadmap ({(form.milestones || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Edit the chronological timeline under University Research Collaborations (Item 1).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMilestone}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-4">
            {(form.milestones || []).map((m, idx) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#86868b]">
                    Milestone #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(m.id)}
                    className="text-gray-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Year Marker
                    </label>
                    <input
                      type="text"
                      value={m.year}
                      onChange={(e) => handleMilestoneChange(m.id, "year", e.target.value)}
                      placeholder="e.g. 2024 - 2025"
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Quarter / Phase
                    </label>
                    <input
                      type="text"
                      value={m.quarter}
                      onChange={(e) => handleMilestoneChange(m.id, "quarter", e.target.value)}
                      placeholder="e.g. Q1 - Q2"
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={m.badge}
                      onChange={(e) => handleMilestoneChange(m.id, "badge", e.target.value)}
                      placeholder="e.g. Foundation"
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs text-[#0071e3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Milestone Title
                  </label>
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => handleMilestoneChange(m.id, "title", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={2}
                    value={m.desc}
                    onChange={(e) => handleMilestoneChange(m.id, "desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Key Performance Metrics / Results
                  </label>
                  <input
                    type="text"
                    value={m.metrics}
                    onChange={(e) => handleMilestoneChange(m.id, "metrics", e.target.value)}
                    placeholder="e.g. 5,000 sq.ft Bay • 1500V Load Bank"
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono text-[#059669]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. STRATEGIC DEEPTECH DOMAINS (ITEM 5) */}
      {activeTab === "domains" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0071e3]" />
                Strategic Deep-Tech Domain Pillars ({(form.domains || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                8 strategic pillars: R&D, Embedded, VLSI, Defence, Telecom 5G/6G, Quantum, Industry 5.0, BESS (Item 5).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddDomain}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pillar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(form.domains || []).map((dom) => (
              <div
                key={dom.id}
                className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded">
                    {dom.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDomain(dom.id)}
                    className="text-gray-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={dom.title}
                    onChange={(e) => handleDomainChange(dom.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={dom.desc}
                    onChange={(e) => handleDomainChange(dom.id, "desc", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Features (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={dom.features.join(", ")}
                    onChange={(e) =>
                      handleDomainChange(
                        dom.id,
                        "features",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Target Route Link
                  </label>
                  <input
                    type="text"
                    value={dom.link}
                    onChange={(e) => handleDomainChange(dom.id, "link", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. UPCOMING PRODUCTS (ITEM 6) */}
      {activeTab === "upcoming" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                Upcoming Products – R&D in Progress ({(form.upcomingProducts || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                SARALA Chip, Quantum BESS, and SmartLink R&D showcase cards (Item 6).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddUpcoming}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="space-y-4">
            {(form.upcomingProducts || []).map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#86868b]">
                    {prod.brand} • {prod.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUpcoming(prod.id)}
                    className="text-gray-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={prod.name}
                      onChange={(e) => handleUpcomingChange(prod.id, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Brand Line
                    </label>
                    <input
                      type="text"
                      value={prod.brand}
                      onChange={(e) => handleUpcomingChange(prod.id, "brand", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Status Badge
                    </label>
                    <input
                      type="text"
                      value={prod.status}
                      onChange={(e) => handleUpcomingChange(prod.id, "status", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs text-[#059669]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Tagline / Subhead
                    </label>
                    <input
                      type="text"
                      value={prod.tagline}
                      onChange={(e) => handleUpcomingChange(prod.id, "tagline", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Development Stage
                    </label>
                    <input
                      type="text"
                      value={prod.stage}
                      onChange={(e) => handleUpcomingChange(prod.id, "stage", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <ImageUploader
                    label="Product Hardware Image (Upload from System)"
                    value={prod.imageUrl}
                    onChange={(url) => handleUpcomingChange(prod.id, "imageUrl", url)}
                    helperText="Upload official hardware render or lab photo. Saved to server and recorded in database."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Estimated Availability
                    </label>
                    <input
                      type="text"
                      value={prod.availability}
                      onChange={(e) => handleUpcomingChange(prod.id, "availability", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Details Link
                    </label>
                    <input
                      type="text"
                      value={prod.link}
                      onChange={(e) => handleUpcomingChange(prod.id, "link", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Technical Specifications (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={prod.specs.join(", ")}
                    onChange={(e) =>
                      handleUpcomingChange(
                        prod.id,
                        "specs",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. HOMEPAGE FAQS (ITEM 7) */}
      {activeTab === "faqs" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Frequently Asked Questions Section ({(form.faqs || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Questions on organization, VTU internships, production vs R&D, and procurement (Item 7).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] text-xs font-semibold hover:bg-blue-100 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {(form.faqs || []).map((faq, idx) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#86868b]">
                    FAQ #{idx + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={faq.category || ""}
                      onChange={(e) => handleFaqChange(faq.id, "category", e.target.value)}
                      placeholder="Category"
                      className="px-2.5 py-1 rounded-lg border border-[#e5e5ea] bg-white text-xs font-semibold text-[#0071e3]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(faq.id)}
                      className="text-gray-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(faq.id, "question", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#6e6e73] mb-1">
                    Official Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(faq.id, "answer", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. BOTTOM CTA BANNER SECTION */}
      {activeTab === "cta" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="border-b border-[#e5e5ea] pb-4">
            <h2 className="text-lg font-bold text-[#1d1d1f]">Bottom Call-to-Action Banner</h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Footer banner encouraging scholars and partners to apply for cohorts or procure systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                CTA Banner Title
              </label>
              <input
                type="text"
                value={form.ctaTitle}
                onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                value={form.ctaPrimaryText}
                onChange={(e) => setForm({ ...form, ctaPrimaryText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                CTA Subtext
              </label>
              <input
                type="text"
                value={form.ctaSubtitle}
                onChange={(e) => setForm({ ...form, ctaSubtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Button Link URL
              </label>
              <input
                type="text"
                value={form.ctaPrimaryLink}
                onChange={(e) => setForm({ ...form, ctaPrimaryLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
