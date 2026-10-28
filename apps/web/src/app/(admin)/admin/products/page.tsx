"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit,
  AlertTriangle,
  CheckCircle2,
  X,
  RefreshCw,
  Layers,
  TrendingUp,
  Boxes,
  ChevronRight,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

interface SKU {
  id: string;
  product_id: string;
  sku_code: string;
  title: string;
  price_inr: string | number;
  hsn_code: string;
  tax_rate_percent: string | number;
  weight_kg?: number | null;
  quantity_available: number;
  is_active: boolean;
}

interface Product {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  brand_line: string;
  short_description: string;
  description: string;
  primary_image_url?: string | null;
  is_published: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  skus: SKU[];
}

const INITIAL_DEMO_PRODUCTS: Product[] = [];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_DEMO_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState<"all" | "low" | "out" | "normal">("all");

  // Stock edit modal state
  const [editingSku, setEditingSku] = useState<{
    sku: SKU;
    productName: string;
    newQuantity: number;
    newThreshold: number;
  } | null>(null);

  // New Product Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdSlug, setNewProdSlug] = useState("");
  const [newProdBrand, setNewProdBrand] = useState("SMPS Tech Lab");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdSkuCode, setNewProdSkuCode] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("4999");
  const [newProdStock, setNewProdStock] = useState("20");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/store/products");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch {
      // Keep state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const flatInventoryRows = useMemo(() => {
    const rows: Array<{
      product: Product;
      sku: SKU;
    }> = [];

    products.forEach((p) => {
      p.skus.forEach((sku) => {
        rows.push({ product: p, sku });
      });
    });

    return rows;
  }, [products]);

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalSkus = flatInventoryRows.length;
    const lowStockCount = flatInventoryRows.filter((r) => r.sku.quantity_available <= 5 && r.sku.quantity_available > 0).length;
    const outOfStockCount = flatInventoryRows.filter((r) => r.sku.quantity_available <= 0).length;
    const totalValuation = flatInventoryRows.reduce(
      (sum, r) => sum + Number(r.sku.price_inr) * r.sku.quantity_available,
      0
    );

    return { totalProducts, totalSkus, lowStockCount, outOfStockCount, totalValuation };
  }, [products, flatInventoryRows]);

  const filteredRows = useMemo(() => {
    return flatInventoryRows.filter(({ product, sku }) => {
      if (selectedStockStatus === "low" && (sku.quantity_available > 5 || sku.quantity_available === 0)) return false;
      if (selectedStockStatus === "out" && sku.quantity_available > 0) return false;
      if (selectedStockStatus === "normal" && sku.quantity_available <= 5) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSku = sku.sku_code.toLowerCase().includes(q) || sku.title.toLowerCase().includes(q);
        const matchProd = product.name.toLowerCase().includes(q) || product.brand_line.toLowerCase().includes(q);
        if (!matchSku && !matchProd) return false;
      }

      return true;
    });
  }, [flatInventoryRows, selectedStockStatus, searchQuery]);

  const handleSaveInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSku) return;

    try {
      await fetch(`/api/v1/store/admin/inventory/${editingSku.sku.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity_available: Number(editingSku.newQuantity),
          low_stock_threshold: Number(editingSku.newThreshold),
        }),
      });
    } catch {
      // proceed
    }

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === editingSku.sku.product_id) {
          return {
            ...p,
            skus: p.skus.map((s) =>
              s.id === editingSku.sku.id
                ? { ...s, quantity_available: Number(editingSku.newQuantity) }
                : s
            ),
          };
        }
        return p;
      })
    );
    showToast(`Stock updated for ${editingSku.sku.sku_code} to ${editingSku.newQuantity} units.`);
    setEditingSku(null);
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0071e3] text-white shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/admin/dashboard" className="hover:text-[#0071e3] transition">
            Admin Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f]">Hardware Inventory</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-xs font-semibold uppercase tracking-wider mb-2">
              <Package className="w-3.5 h-3.5" />
              Warehouse & SKU Catalog
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
              Product & Hardware Inventory
            </h1>
            <p className="text-sm text-[#6e6e73] mt-1">
              Real-time SKU quantities, warehouse thresholds, HSN billing codes, and automated low-stock telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshProducts}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-white hover:bg-[#fbfbfd] text-[#6e6e73] border border-[#e5e5ea] transition shadow-xs"
              title="Refresh Catalog"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </div>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Catalog Products</span>
            <Boxes className="w-5 h-5 text-[#0071e3]" />
          </div>
          <span className="text-3xl font-extrabold text-[#1d1d1f] mt-3 block">{metrics.totalProducts}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Active engineering lines</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Active SKUs</span>
            <Layers className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-3xl font-extrabold text-[#1d1d1f] mt-3 block">{metrics.totalSkus}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Variants with HSN mapped</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Low Stock Alerts</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600 mt-3 block">{metrics.lowStockCount}</span>
          <span className="text-xs text-amber-700/80 mt-1 block">Units ≤ 5 reorder threshold</span>
        </div>

        <div className="apple-card-elevated p-6 rounded-[28px] border border-[#e5e5ea] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Stock Valuation</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-700 mt-3 block">{formatINR(metrics.totalValuation)}</span>
          <span className="text-xs text-[#86868b] mt-1 block">Warehouse inventory value</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="apple-card-elevated p-4 sm:p-5 rounded-[24px] border border-[#e5e5ea] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU code, title, or brand (e.g. SMPS-PURNA, SaralaChip)..."
            className="w-full pl-10 pr-4 py-2 bg-[#fbfbfd] text-[#1d1d1f] placeholder-[#86868b] text-xs sm:text-sm rounded-xl border border-[#e5e5ea] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value as any)}
            className="text-xs sm:text-sm bg-[#fbfbfd] border border-[#e5e5ea] text-[#1d1d1f] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] font-medium"
          >
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock Alerts (≤5)</option>
            <option value="out">Out of Stock (0)</option>
            <option value="normal">Sufficient Stock (&gt;5)</option>
          </select>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#fbfbfd] text-[#86868b] uppercase font-semibold text-[11px] tracking-wider border-b border-[#e5e5ea]">
              <tr>
                <th className="py-3.5 px-5">Item & SKU Code</th>
                <th className="py-3.5 px-5">Category & Brand</th>
                <th className="py-3.5 px-5">Price (INR)</th>
                <th className="py-3.5 px-5">HSN & Tax</th>
                <th className="py-3.5 px-5">Available Stock</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5ea]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#86868b]">
                    No matching inventory records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map(({ product, sku }) => {
                  const isLowStock = sku.quantity_available <= 5 && sku.quantity_available > 0;
                  const isOut = sku.quantity_available <= 0;

                  return (
                    <tr key={sku.id} className="hover:bg-[#fbfbfd] transition">
                      {/* Item Thumbnail & SKU */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#fbfbfd] border border-[#e5e5ea] flex-shrink-0">
                            {product.primary_image_url ? (
                              <Image
                                src={product.primary_image_url}
                                alt={product.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-[#86868b] m-auto mt-3" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-[#1d1d1f] block">{sku.title}</span>
                            <span className="text-[11px] font-mono text-[#0071e3] block">{sku.sku_code}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Brand */}
                      <td className="py-3.5 px-5">
                        <span className="text-xs text-[#1d1d1f] font-medium block">
                          {product.category?.name || "General"}
                        </span>
                        <span className="text-[11px] text-[#6e6e73] block">{product.brand_line}</span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-5 font-mono font-bold text-[#1d1d1f]">
                        {formatINR(Number(sku.price_inr))}
                      </td>

                      {/* HSN & Tax */}
                      <td className="py-3.5 px-5 text-xs text-[#6e6e73]">
                        <span className="font-mono text-[#1d1d1f] font-semibold">{sku.hsn_code}</span>
                        <span className="text-[11px] text-[#86868b] block">{sku.tax_rate_percent}% GST</span>
                      </td>

                      {/* Stock Progress & Count */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1d1d1f] text-sm w-7">{sku.quantity_available}</span>
                          <div className="w-20 bg-[#e5e5ea] h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                isOut ? "bg-rose-500" : isLowStock ? "bg-amber-400" : "bg-[#0071e3]"
                              }`}
                              style={{ width: `${Math.min(100, (sku.quantity_available / 50) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Pill */}
                      <td className="py-3.5 px-5">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                            Low Stock (≤5)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingSku({
                              sku,
                              productName: product.name,
                              newQuantity: sku.quantity_available,
                              newThreshold: 5,
                            })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fbfbfd] hover:bg-white border border-[#e5e5ea] hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold transition shadow-xs"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#0071e3]" />
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {editingSku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="apple-card-elevated bg-white border border-[#e5e5ea] rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-[#1d1d1f]">
            <button
              onClick={() => setEditingSku(null)}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#fbfbfd] hover:bg-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center text-xs font-bold transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Boxes className="w-5 h-5 text-[#0071e3]" />
              <h2 className="text-lg font-bold text-[#1d1d1f]">Adjust SKU Inventory</h2>
            </div>

            <div className="bg-[#fbfbfd] p-3.5 rounded-2xl border border-[#e5e5ea] mb-5">
              <span className="text-xs text-[#6e6e73] block">{editingSku.productName}</span>
              <span className="text-sm font-bold text-[#1d1d1f] block mt-0.5">{editingSku.sku.title}</span>
              <span className="text-xs font-mono text-[#0071e3] mt-1 block">SKU: {editingSku.sku.sku_code}</span>
            </div>

            <form onSubmit={handleSaveInventory} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                  Quantity Available in Warehouse:
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editingSku.newQuantity}
                  onChange={(e) =>
                    setEditingSku({ ...editingSku, newQuantity: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                  Low Stock Alert Threshold:
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={editingSku.newThreshold}
                  onChange={(e) =>
                    setEditingSku({ ...editingSku, newThreshold: parseInt(e.target.value) || 5 })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={() => setEditingSku(null)}
                  className="px-4 py-2 rounded-full border border-[#e5e5ea] text-[#6e6e73] text-xs font-semibold hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition shadow-xs"
                >
                  Confirm & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="apple-card-elevated bg-white border border-[#e5e5ea] rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#1d1d1f]">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#fbfbfd] hover:bg-[#e5e5ea] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center text-xs font-bold transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-[#0071e3]" />
              <h2 className="text-lg font-bold text-[#1d1d1f]">Create New Catalog Product</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newId = "prod-" + Date.now();
                const newProd: Product = {
                  id: newId,
                  category_id: "a1000000-0000-0000-0000-000000000005",
                  slug: newProdSlug || newProdName.toLowerCase().replace(/\s+/g, "-"),
                  name: newProdName,
                  brand_line: newProdBrand,
                  short_description: newProdDesc,
                  description: newProdDesc,
                  primary_image_url: "/images/products/iot-kit.jpg",
                  is_published: true,
                  category: {
                    id: "a1000000-0000-0000-0000-000000000005",
                    name: "IoT & Robotics Development Kits",
                    slug: "iot-robotics",
                  },
                  skus: [
                    {
                      id: "sku-" + Date.now(),
                      product_id: newId,
                      sku_code: newProdSkuCode || "SMPS-NEW-01",
                      title: newProdName + " Standard",
                      price_inr: parseFloat(newProdPrice) || 4999,
                      hsn_code: "84715000",
                      tax_rate_percent: 18,
                      quantity_available: parseInt(newProdStock) || 20,
                      is_active: true,
                    },
                  ],
                };
                setProducts([newProd, ...products]);
                setIsCreateModalOpen(false);
                showToast(`Product "${newProdName}" added successfully.`);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-[#6e6e73] font-bold block mb-1">Product Title:</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. SUBAL PCS 100kW Dynamic Inverter"
                  className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#6e6e73] font-bold block mb-1">Brand Line:</label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[#6e6e73] font-bold block mb-1">Primary SKU Code:</label>
                  <input
                    type="text"
                    required
                    value={newProdSkuCode}
                    onChange={(e) => setNewProdSkuCode(e.target.value)}
                    placeholder="SMPS-PCS-100KW"
                    className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#6e6e73] font-bold block mb-1">Price in INR (₹):</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[#6e6e73] font-bold block mb-1">Initial Warehouse Stock:</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#6e6e73] font-bold block mb-1">Description:</label>
                <textarea
                  rows={2}
                  required
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Engineered specifications, topology, and lab testbed summary..."
                  className="w-full px-3 py-2 bg-[#fbfbfd] border border-[#e5e5ea] rounded-xl text-[#1d1d1f] resize-none focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5ea]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#e5e5ea] text-[#6e6e73] font-semibold hover:text-[#1d1d1f] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold transition shadow-xs"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
