"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  Save,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  Plus,
  Trash2,
  HelpCircle,
  Sparkles,
  Package,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { HardwareStoreSettings, CMS_UpcomingProduct } from "@/lib/cms-store";
import { FAQItem } from "@/components/ui/faq-accordion";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function HardwareSettingsPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<HardwareStoreSettings>(content.hardware);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"toggles" | "upcoming" | "faqs">("toggles");

  useEffect(() => {
    if (content.hardware) {
      setForm(content.hardware);
    }
  }, [content.hardware]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("hardware", form);
    if (form.upcomingProducts) {
      updateSection("home", {
        ...content.home,
        upcomingProducts: form.upcomingProducts,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Upcoming Products Handlers
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
      id: `up-store-${Date.now()}`,
      name: "New Upcoming System",
      brand: "SMPS R&D™",
      tagline: "High-voltage industrial hardware",
      stage: "R&D in Progress • Validation Bay 3",
      imageUrl: "/images/products/quantum-bess.jpg",
      status: "Upcoming R&D",
      specs: ["1500V DC Operating Voltage", "SmartLink™ Real-time Telemetry", "Dual Liquid Thermal Loop"],
      availability: "Trials: Q3 2027",
      link: "/store",
    };
    setForm((prev) => ({
      ...prev,
      upcomingProducts: [...(prev.upcomingProducts || []), newU],
    }));
  };

  const handleRemoveUpcoming = (id: string) => {
    setForm((prev) => {
      const next = {
        ...prev,
        upcomingProducts: (prev.upcomingProducts || []).filter((u) => u.id !== id),
      };
      updateSection("hardware", next);
      return next;
    });
  };

  // Store FAQs Handlers
  const handleFaqChange = (id: string, field: keyof FAQItem, value: string) => {
    setForm((prev) => ({
      ...prev,
      storeFaqs: (prev.storeFaqs || []).map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    }));
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `store-faq-${Date.now()}`,
      question: "New Procurement or Product Specification Question?",
      answer: "Detailed policy or technical ordering explanation for institutional clients.",
      category: "Procurement",
    };
    setForm((prev) => {
      const next = {
        ...prev,
        storeFaqs: [...(prev.storeFaqs || []), newFaq],
      };
      updateSection("hardware", next);
      return next;
    });
  };

  const handleRemoveFaq = (id: string) => {
    setForm((prev) => {
      const next = {
        ...prev,
        storeFaqs: (prev.storeFaqs || []).filter((f) => f.id !== id),
      };
      updateSection("hardware", next);
      return next;
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/95 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Hardware Store & Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Hardware Store <span className="text-gradient-apple-blue">& Commerce Controls</span>
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
            href="/store"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Store</span>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e5e5ea] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("toggles")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
            activeTab === "toggles"
              ? "bg-[#0071e3] text-white shadow-sm"
              : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
          }`}
        >
          Commerce Toggles & Notice
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-[#0071e3] text-white shadow-sm"
              : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
          }`}
        >
          Upcoming Products ({(form.upcomingProducts || []).length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
            activeTab === "faqs"
              ? "bg-[#0071e3] text-white shadow-sm"
              : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
          }`}
        >
          Store Procurement FAQs ({(form.storeFaqs || []).length})
        </button>
      </div>

      {/* 1. MASTER COMMERCE TOGGLES */}
      {activeTab === "toggles" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0071e3]" />
              Global Store Modes & Checkout Locks
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Control whether visitors can purchase hardware online or view products in showroom/datasheet-only mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Ordering Toggle */}
            <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#0071e3]" />
                    Direct Online Ordering
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      form.isOrderingEnabled
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {form.isOrderingEnabled ? "Ordering Open" : "Ordering Disabled"}
                  </span>
                </div>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  When disabled, the "Add to Cart" and checkout buttons are replaced with an "Inquire for Lab Procurement" button, preventing unverified transactions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setForm({ ...form, isOrderingEnabled: !form.isOrderingEnabled })}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 ${
                  form.isOrderingEnabled
                    ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-blue-50 hover:bg-blue-100 text-[#0071e3] border border-blue-200"
                }`}
              >
                {form.isOrderingEnabled ? "Click to Disable Hardware Ordering" : "Click to Enable Hardware Ordering"}
              </button>
            </div>

            {/* Pricing Visibility Toggle */}
            <div className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-1.5">
                    {form.showPricing ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-[#86868b]" />}
                    Hardware Price Tags
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      form.showPricing
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-[#0071e3] border border-blue-200"
                    }`}
                  >
                    {form.showPricing ? "Visible" : "Hidden"}
                  </span>
                </div>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  When hidden, INR currency pricing figures are masked across product cards, replaced by "Institutional Quotation on Request".
                </p>
              </div>

              <button
                type="button"
                onClick={() => setForm({ ...form, showPricing: !form.showPricing })}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 ${
                  form.showPricing
                    ? "bg-gray-100 hover:bg-gray-200 text-[#1d1d1f]"
                    : "bg-blue-50 hover:bg-blue-100 text-[#0071e3] border border-blue-200"
                }`}
              >
                {form.showPricing ? "Click to Hide Prices" : "Click to Display Prices"}
              </button>
            </div>
          </div>

          {/* Store Notice Banner Message */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-1.5">
              Catalog Notice Banner (Shown on /store)
            </label>
            <textarea
              rows={3}
              value={form.storeNotice}
              onChange={(e) => setForm({ ...form, storeNotice: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* 2. UPCOMING PRODUCTS (STORE SHOWCASE) */}
      {activeTab === "upcoming" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                Store Upcoming Products – R&D Showcase ({(form.upcomingProducts || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Manage upcoming hardware units (Quantum BESS, SmartLink, SaralaChip) displayed on /store.
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
                      Brand
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
                      Badge Status
                    </label>
                    <input
                      type="text"
                      value={prod.status}
                      onChange={(e) => handleUpcomingChange(prod.id, "status", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs text-[#0071e3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Tagline / Description
                  </label>
                  <input
                    type="text"
                    value={prod.tagline}
                    onChange={(e) => handleUpcomingChange(prod.id, "tagline", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>

                <div className="pt-1">
                  <ImageUploader
                    label="Product Hardware Image (Upload from System)"
                    value={prod.imageUrl}
                    onChange={(url) => handleUpcomingChange(prod.id, "imageUrl", url)}
                    helperText="Upload official hardware render, PCB layout, or lab photo from your system. File is stored and recorded in the database."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                      Availability Target
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
                      Link / Slug URL
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
                    Specs List (Comma Separated)
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

      {/* 3. STORE PROCUREMENT FAQS */}
      {activeTab === "faqs" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Store Procurement & Ordering FAQs ({(form.storeFaqs || []).length})
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Manage commercial quotation, warranty, and hardware support questions on the store page.
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
            {(form.storeFaqs || []).map((faq, idx) => (
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
    </form>
  );
}
