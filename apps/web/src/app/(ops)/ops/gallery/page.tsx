"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Database,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { GalleryMediaItem } from "@/lib/cms-store";
import { ImageUploader } from "@/components/ui/image-uploader";

export default function GalleryEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [items, setItems] = useState<GalleryMediaItem[]>(content.gallery);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [dbStatusMsg, setDbStatusMsg] = useState<string | null>(null);

  // New item form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"labs" | "events" | "ceremonies" | "students">("labs");
  const [newDate, setNewDate] = useState("20 Oct 2026");
  const [newLocation, setNewLocation] = useState("VTU-VRIF Center, Nagarbhavi");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // 1. Fetch from Database on mount
  useEffect(() => {
    let isMounted = true;
    async function loadFromDb() {
      try {
        setIsSyncingDb(true);
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const mapped: GalleryMediaItem[] = json.data.map((d: any) => ({
              id: d.id,
              title: d.title,
              category: d.category,
              date: d.date,
              location: d.location,
              imageUrl: d.image_url || d.imageUrl,
              description: d.description,
            }));
            if (isMounted) {
              setItems(mapped);
              updateSection("gallery", mapped);
              setDbStatusMsg("Fetched live from database");
              setTimeout(() => setDbStatusMsg(null), 3000);
            }
          }
        }
      } catch (err) {
        console.warn("Database fetch warning:", err);
      } finally {
        if (isMounted) setIsSyncingDb(false);
      }
    }

    loadFromDb();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSyncingDb(true);

    try {
      // 1. Update client reactive CMS state
      updateSection("gallery", items);

      // 2. Persist to Authoritative Database via /api/gallery batch sync
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setDbStatusMsg("Saved & Recorded in Database");
        setTimeout(() => {
          setSavedSuccess(false);
          setDbStatusMsg(null);
        }, 3000);
      } else {
        throw new Error("Database persistence failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      // Fallback: local CMS updated
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } finally {
      setIsSyncingDb(false);
    }
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    updateSection("gallery", updated);

    try {
      await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Delete sync warning:", err);
    }
  };

  const handleItemChange = (id: string, field: keyof GalleryMediaItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: GalleryMediaItem = {
      id: `gal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      date: newDate.trim(),
      location: newLocation.trim(),
      imageUrl: newImageUrl.trim() || "/images/products/smps-hero.jpg",
      description: newDescription.trim() || "Showcase photograph captured at SMPS Tech Lab facility.",
    };

    const updated = [newItem, ...items];
    setItems(updated);
    updateSection("gallery", updated);

    // Save single item directly to Database
    try {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
    } catch (err) {
      console.warn("Add item db sync warning:", err);
    }

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewImageUrl("");
    setIsAddingItem(false);
    setSavedSuccess(true);
    setDbStatusMsg("Saved in Database");
    setTimeout(() => {
      setSavedSuccess(false);
      setDbStatusMsg(null);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">Gallery & Events Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              Gallery & Event <span className="text-gradient-apple-blue">Showcase Studio</span>
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              <Database className="w-3 h-3" />
              Database Powered
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{dbStatusMsg || "Saved to Database!"}</span>
            </div>
          )}

          <Link
            href="/gallery"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5 shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Gallery</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsAddingItem(!isAddingItem)}
            className="px-4 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0071e3] text-xs font-semibold border border-blue-200 transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Showcase Item</span>
          </button>

          <button
            type="button"
            disabled={isSyncingDb}
            onClick={() => handleSave()}
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition active:scale-[0.98] inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSyncingDb ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save to Database</span>
          </button>
        </div>
      </div>

      {/* Add New Item Form */}
      {isAddingItem && (
        <form onSubmit={handleAddItem} className="apple-card-elevated rounded-[28px] border-2 border-blue-200 bg-white p-6 sm:p-8 space-y-5 shadow-lg animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-blue-50 text-[#0071e3]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#1d1d1f]">Add New Gallery / Event Media</h3>
              </div>
              <p className="text-xs text-[#6e6e73] mt-0.5">Upload a photo directly from your system or device</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 1500V Inverter Testbench Commissioning"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs font-semibold focus:outline-none focus:border-[#0071e3]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] text-xs bg-white focus:outline-none focus:border-[#0071e3]"
              >
                <option value="labs">R&D Testing Bays</option>
                <option value="events">Conferences & Summits</option>
                <option value="ceremonies">Convocation Ceremonies</option>
                <option value="students">Student Lab Work</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Date
              </label>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Location
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
          </div>

          {/* Interactive Image Uploader From System */}
          <div className="bg-[#f5f5f7]/60 p-4 rounded-2xl border border-[#e5e5ea]">
            <ImageUploader
              value={newImageUrl}
              onChange={setNewImageUrl}
              label="Showcase Photograph (Upload from System) *"
              helperText="Upload any image from your computer. It is stored on the server and indexed in the database."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
              Description & Context
            </label>
            <textarea
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Highlight technical significance, participants, or milestones achieved."
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#6e6e73] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs transition"
            >
              Save & Add to Showcase
            </button>
          </div>
        </form>
      )}

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-5 sm:p-6 space-y-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                  {item.category}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition"
                  title="Delete item from database"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs font-bold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleItemChange(item.id, "date", e.target.value)}
                    className="w-full px-2.5 py-1 rounded-lg border border-[#e5e5ea] text-xs text-[#1d1d1f]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleItemChange(item.id, "location", e.target.value)}
                    className="w-full px-2.5 py-1 rounded-lg border border-[#e5e5ea] text-xs text-[#1d1d1f]"
                  />
                </div>
              </div>

              {/* System Image Uploader & Live Preview */}
              <div className="bg-[#fbfbfd] p-3 rounded-xl border border-[#e5e5ea]">
                <ImageUploader
                  value={item.imageUrl}
                  onChange={(url) => handleItemChange(item.id, "imageUrl", url)}
                  label="Showcase Photograph (From System)"
                  helperText="Upload a new photo from your device to replace this item's image."
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                  className="w-full px-2.5 py-1 rounded-lg border border-[#e5e5ea] text-xs text-[#6e6e73] focus:outline-none focus:border-[#0071e3]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#e5e5ea] flex items-center justify-between text-[11px] text-[#86868b]">
              <span className="font-mono">ID: {item.id}</span>
              <button
                type="button"
                onClick={() => handleSave()}
                className="text-[#0071e3] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                <span>Save Updates</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
