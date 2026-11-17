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
  Camera,
  UploadCloud,
  X,
  Search,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { HardwareStoreSettings, CMS_UpcomingProduct } from "@/lib/cms-store";
import { FAQItem } from "@/components/ui/faq-accordion";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function HardwareSettingsPage() {
  const { content, updateSection } = useSiteContent();
  const [form, setForm] = useState<HardwareStoreSettings>(content.hardware);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "toggles" | "upcoming" | "faqs">("products");
  const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogSaved, setCatalogSaved] = useState(false);

  // New Product Modal / Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdSlug, setNewProdSlug] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Battery Energy Storage Systems (BESS)");
  const [newProdBrand, setNewProdBrand] = useState("SMPS CleanTech™");
  const [newProdPrice, setNewProdPrice] = useState<number | string>(75000);
  const [newProdStock, setNewProdStock] = useState<number | string>(10);
  const [newProdShortDesc, setNewProdShortDesc] = useState("");
  const [newProdFullDesc, setNewProdFullDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdIndiamart, setNewProdIndiamart] = useState("https://www.indiamart.com/smpselectriccontrol/");

  // Active Image Uploader for Existing Catalog Products
  const [activeImageUploaderId, setActiveImageUploaderId] = useState<string | null>(null);

  useEffect(() => {
    if (content.hardware) {
      setForm(content.hardware);
    }
  }, [content.hardware]);

  // Load catalog products from /api/v1/store/products
  const loadCatalog = async () => {
    setIsCatalogLoading(true);
    try {
      const res = await fetch("/api/v1/store/products");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCatalogProducts(data);
        }
      }
    } catch (err) {
      console.error("Error loading store products:", err);
    } finally {
      setIsCatalogLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleProductChange = (productId: string, field: string, value: any) => {
    setCatalogProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        if (field === "price_inr") {
          const skus = [...(p.skus || [])];
          if (skus.length > 0) {
            skus[0] = { ...skus[0], price_inr: Number(value) || 0 };
          }
          return { ...p, skus };
        }
        if (field === "quantity_available") {
          const skus = [...(p.skus || [])];
          if (skus.length > 0) {
            skus[0] = { ...skus[0], quantity_available: Number(value) || 0 };
          }
          return { ...p, skus };
        }
        if (field === "category_name") {
          return {
            ...p,
            category: {
              ...(p.category || { id: `cat-${p.id}`, slug: p.slug }),
              name: value,
            },
          };
        }
        return { ...p, [field]: value };
      })
    );
  };

  const handleSaveCatalog = async (updatedList?: any[]) => {
    const listToSave = updatedList || catalogProducts;
    try {
      const res = await fetch("/api/v1/store/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listToSave),
      });
      if (res.ok) {
        setCatalogSaved(true);
        setTimeout(() => setCatalogSaved(false), 2500);
      }
    } catch (err) {
      console.error("Error saving catalog products:", err);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const prod = catalogProducts.find((p) => p.id === productId);
    const confirmed = window.confirm(
      `Are you sure you want to remove "${prod?.name || "this product"}" from the catalog?`
    );
    if (!confirmed) return;

    const updated = catalogProducts.filter((p) => p.id !== productId);
    setCatalogProducts(updated);
    handleSaveCatalog(updated);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const slug =
      newProdSlug.trim() ||
      newProdName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProduct = {
      id: `prod-${Date.now()}`,
      slug,
      name: newProdName.trim(),
      brand_line: newProdBrand.trim() || "SMPS CleanTech™",
      short_description:
        newProdShortDesc.trim() ||
        "Engineered for high-voltage and laboratory power conversion with real-time CAN-FD telemetry.",
      description:
        newProdFullDesc.trim() ||
        newProdShortDesc.trim() ||
        "Engineered for high-voltage and laboratory power conversion with real-time CAN-FD telemetry in technical collaboration with VTU.",
      primary_image_url: newProdImage.trim() || "/images/products/purna-bess.jpg",
      indiamart_url:
        newProdIndiamart.trim() || "https://www.indiamart.com/smpselectriccontrol/",
      is_published: true,
      category: {
        id: `cat-${Date.now()}`,
        name: newProdCategory.trim() || "Hardware",
        slug: slug,
      },
      skus: [
        {
          id: `sku-${Date.now()}`,
          sku_code: `SKU-${slug.slice(0, 10).toUpperCase()}`,
          title: newProdName.trim(),
          price_inr: Number(newProdPrice) || 0,
          quantity_available: Number(newProdStock) || 10,
          hsn_code: "85044090",
          tax_rate_percent: 18,
          is_active: true,
        },
      ],
    };

    const updated = [newProduct, ...catalogProducts];
    setCatalogProducts(updated);
    handleSaveCatalog(updated);
    setIsAddingProduct(false);

    // Reset form
    setNewProdName("");
    setNewProdSlug("");
    setNewProdPrice(75000);
    setNewProdStock(10);
    setNewProdShortDesc("");
    setNewProdFullDesc("");
    setNewProdImage("");
  };

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
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5 shadow-xs"
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
      <div className="flex items-center gap-2 border-b border-[#e5e5ea] pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
            activeTab === "products"
              ? "bg-[#0071e3] text-white shadow-sm"
              : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
          }`}
        >
          Catalog Products ({catalogProducts.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("toggles")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
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
          className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
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
          className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
            activeTab === "faqs"
              ? "bg-[#0071e3] text-white shadow-sm"
              : "bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-[#e5e5ea]"
          }`}
        >
          Store Procurement FAQs ({(form.storeFaqs || []).length})
        </button>
      </div>

      {/* 0. COMMERCIAL CATALOG PRODUCTS */}
      {activeTab === "products" && (
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#0071e3]" />
                Commercial Hardware Catalog ({catalogProducts.length} Systems)
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Manage products, upload/edit hardware imagery, adjust stock & pricing, and direct IndiaMART procurement links.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {catalogSaved && (
                <span className="text-xs text-emerald-600 font-bold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  Catalog Updated!
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0071e3] text-xs font-semibold border border-blue-200 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
              <button
                type="button"
                onClick={() => handleSaveCatalog()}
                className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Catalog</span>
              </button>
            </div>
          </div>

          {/* Add New Product Form */}
          {isAddingProduct && (
            <div className="p-6 sm:p-8 rounded-[24px] border-2 border-blue-200 bg-[#fbfbfd] space-y-5 animate-in fade-in-50 duration-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-blue-50 text-[#0071e3]">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#1d1d1f]">Add New Hardware System</h3>
                    <p className="text-xs text-[#6e6e73]">Create a commercial hardware item in the live store catalog</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="text-xs text-[#6e6e73] hover:text-[#1d1d1f]"
                >
                  Cancel
                </button>
              </div>

              {/* Photo Upload Section for New Product */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e5ea] space-y-3">
                <label className="block text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#0071e3]" />
                  <span>Hardware Image (Upload from System or Enter URL)</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {newProdImage ? (
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-[#e5e5ea] bg-[#f5f5f7] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={newProdImage}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 text-[#0071e3] flex flex-col items-center justify-center shrink-0">
                      <Package className="w-8 h-8 opacity-60" />
                      <span className="text-[10px] font-bold mt-1 uppercase text-[#0071e3]/80">No Image</span>
                    </div>
                  )}

                  <div className="w-full space-y-2">
                    <ImageUploader
                      value={newProdImage}
                      onChange={setNewProdImage}
                      label="Upload Product Image File"
                      helperText="Choose PNG, JPG, or WebP. The photo is saved locally and updated across the store."
                    />
                    <input
                      type="text"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="Or paste image URL (e.g. /images/products/... or https://...)"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs font-mono bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. PURNA BESS™ 100 kWh Industrial Storage"
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs font-bold text-[#1d1d1f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Slug / URL Path
                  </label>
                  <input
                    type="text"
                    value={newProdSlug}
                    onChange={(e) => setNewProdSlug(e.target.value)}
                    placeholder="e.g. purna-bess-100kwh"
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Brand Line
                  </label>
                  <input
                    type="text"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Price (₹ Excl. GST)
                  </label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                    Initial Stock Qty
                  </label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={newProdShortDesc}
                  onChange={(e) => setNewProdShortDesc(e.target.value)}
                  placeholder="Key technical summary, specifications, and primary application."
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  IndiaMART Direct Procurement Link
                </label>
                <input
                  type="url"
                  value={newProdIndiamart}
                  onChange={(e) => setNewProdIndiamart(e.target.value)}
                  placeholder="https://www.indiamart.com/..."
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#e5e5ea] text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#6e6e73] hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs"
                >
                  Save & Add to Catalog
                </button>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search products by name, slug, or brand..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className="w-full px-4 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-full text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          {/* Products List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogProducts
              .filter((p) =>
                catalogSearch
                  ? p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                    p.slug?.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                    p.brand_line?.toLowerCase().includes(catalogSearch.toLowerCase())
                  : true
              )
              .map((prod) => {
                const primarySku = prod.skus?.[0];
                return (
                  <div
                    key={prod.id}
                    className="p-5 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] space-y-4 flex flex-col justify-between transition hover:border-[#0071e3]/30 shadow-xs"
                  >
                    <div className="space-y-3.5">
                      {/* Card Top: Category Pill, Slug, and Delete Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full truncate">
                          {prod.category?.name || prod.brand_line || "Hardware"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-[#86868b] truncate max-w-[120px]">
                            {prod.slug}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(prod.id)}
                            className="p-1 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Remove Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnail & Uploader Section */}
                      <div className="space-y-2">
                        <div className="w-full h-36 rounded-xl bg-white border border-[#e5e5ea] p-2 flex items-center justify-center overflow-hidden relative group">
                          {prod.primary_image_url ? (
                            <img
                              src={prod.primary_image_url}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-gray-300" />
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageUploaderId(
                                activeImageUploaderId === prod.id ? null : prod.id
                              )
                            }
                            className="absolute inset-0 bg-black/60 text-white text-xs font-semibold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition backdrop-blur-xs"
                          >
                            <Camera className="w-4 h-4" />
                            <span>Change / Upload Image</span>
                          </button>
                        </div>

                        {/* Inline Image Uploader */}
                        {activeImageUploaderId === prod.id && (
                          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 animate-in fade-in-50">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#1d1d1f] flex items-center gap-1">
                                <UploadCloud className="w-3.5 h-3.5 text-[#0071e3]" />
                                Upload Image
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveImageUploaderId(null)}
                                className="text-[10px] text-[#6e6e73] hover:text-[#1d1d1f]"
                              >
                                Done
                              </button>
                            </div>
                            <ImageUploader
                              value={prod.primary_image_url || ""}
                              onChange={(url) => {
                                handleProductChange(prod.id, "primary_image_url", url);
                              }}
                              label="Choose Image File"
                              helperText="Upload any PNG, JPG, or WebP. Saved locally to /uploads."
                            />
                          </div>
                        )}

                        {/* Image URL text input */}
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-[#86868b] mb-0.5">
                            Image URL / Path
                          </label>
                          <input
                            type="text"
                            value={prod.primary_image_url || ""}
                            placeholder="/images/products/... or URL"
                            onChange={(e) =>
                              handleProductChange(prod.id, "primary_image_url", e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs font-mono text-[#1d1d1f]"
                          />
                        </div>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleProductChange(prod.id, "name", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs font-bold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                        />
                      </div>

                      {/* Category & Brand */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={prod.category?.name || ""}
                            onChange={(e) => handleProductChange(prod.id, "category_name", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs text-[#1d1d1f]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                            Brand Line
                          </label>
                          <input
                            type="text"
                            value={prod.brand_line || ""}
                            onChange={(e) => handleProductChange(prod.id, "brand_line", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs text-[#1d1d1f]"
                          />
                        </div>
                      </div>

                      {/* Pricing & Stock */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                            Price (₹ Excl. GST)
                          </label>
                          <input
                            type="number"
                            value={primarySku?.price_inr || 0}
                            onChange={(e) => handleProductChange(prod.id, "price_inr", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs font-mono font-bold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                            Available Stock
                          </label>
                          <input
                            type="number"
                            value={primarySku?.quantity_available || 0}
                            onChange={(e) => handleProductChange(prod.id, "quantity_available", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs font-mono font-bold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                          />
                        </div>
                      </div>

                      {/* Short Description */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          value={prod.short_description || ""}
                          onChange={(e) => handleProductChange(prod.id, "short_description", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs text-[#48484a]"
                        />
                      </div>

                      {/* IndiaMART URL */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#86868b] mb-1">
                          IndiaMART Catalog URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://www.indiamart.com/proddetail/..."
                          value={prod.indiamart_url || ""}
                          onChange={(e) => handleProductChange(prod.id, "indiamart_url", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#e5e5ea] rounded-lg text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

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
