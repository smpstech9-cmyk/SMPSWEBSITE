"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Globe,
  Link2,
  Calendar,
  Clock,
  Laptop,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { InternshipTrackItem } from "@/lib/cms-store";

export default function InternshipsEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [tracks, setTracks] = useState<InternshipTrackItem[]>(content.internships || []);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  useEffect(() => {
    if (content.internships) {
      setTracks(content.internships);
    }
  }, [content.internships]);

  // New track form state
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDomain, setNewDomain] = useState("Power Electronics");
  const [newDuration, setNewDuration] = useState("4 Weeks (Hands-on)");
  const [newMode, setNewMode] = useState("Bengaluru VTU Campus Facility");
  const [newLevel, setNewLevel] = useState("3rd & 4th Year B.E. / M.Tech");
  const [newDesc, setNewDesc] = useState("");
  const [newApplyUrl, setNewApplyUrl] = useState("");
  const [newBatchDate, setNewBatchDate] = useState("15 Jan 2027");
  const [newPrice, setNewPrice] = useState("₹6,500");

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSection("internships", tracks);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleActive = (id: string) => {
    const updated = tracks.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t));
    setTracks(updated);
    updateSection("internships", updated);
  };

  const handleDelete = (id: string) => {
    const updated = tracks.filter((t) => t.id !== id);
    setTracks(updated);
    updateSection("internships", updated);
  };

  const handleTrackChange = (id: string, field: keyof InternshipTrackItem, value: any) => {
    const updated = tracks.map((t) => (t.id === id ? { ...t, [field]: value } : t));
    setTracks(updated);
    updateSection("internships", updated);
  };

  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const slug = newSlug.trim() || newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newTrack: InternshipTrackItem = {
      id: `int-${Date.now()}`,
      title: newTitle.trim(),
      slug,
      domain: newDomain.trim(),
      duration: newDuration.trim(),
      mode: newMode.trim(),
      level: newLevel.trim(),
      price: newPrice.trim() || "₹6,500",
      description: newDesc.trim() || "Comprehensive engineering laboratory internship accredited by VTU-VRIF Center.",
      applyPortalUrl: newApplyUrl.trim(),
      isActive: true,
      upcomingBatchDate: newBatchDate.trim(),
    };

    const updated = [...tracks, newTrack];
    setTracks(updated);
    updateSection("internships", updated);

    // Reset form
    setNewTitle("");
    setNewSlug("");
    setNewDesc("");
    setNewApplyUrl("");
    setNewPrice("₹6,500");
    setIsAddingTrack(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6 sticky top-0 bg-[#f5f5f7]/90 backdrop-blur-md z-30 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6e6e73] font-medium mb-1">
            <Link href="/ops" className="hover:text-[#0071e3]">Operations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1d1d1f] font-semibold">VTU Internships</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            VTU Internship Tracks <span className="text-gradient-apple-blue">& Cohorts</span>
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
            type="button"
            onClick={() => setIsAddingTrack(!isAddingTrack)}
            className="px-4 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0071e3] text-xs font-semibold border border-blue-200 transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Track</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition active:scale-[0.98] inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>

      {/* Add New Track Modal / Form Card */}
      {isAddingTrack && (
        <form onSubmit={handleCreateTrack} className="apple-card-elevated rounded-[28px] border-2 border-blue-200 bg-white p-6 sm:p-8 space-y-5 shadow-lg animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1d1d1f]">Add New VTU Internship Track</h3>
              <p className="text-xs text-[#6e6e73]">Create a new research engineering program</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingTrack(false)}
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Program Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Advanced High-Voltage GaN Converter Design"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                URL Slug (Optional)
              </label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="e.g. vtu-gan-converter-design"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Domain
              </label>
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Duration
              </label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Program Fee / Price
              </label>
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="e.g. ₹6,500 or Free"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-bold text-[#1d1d1f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Next Batch Start Date
              </label>
              <input
                type="text"
                value={newBatchDate}
                onChange={(e) => setNewBatchDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-semibold text-[#0071e3]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Engineering topics, lab testbenches, and capstone project overview."
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#0071e3]" />
              <label className="block text-xs font-bold text-[#0071e3]">
                Custom External Application Portal URL (Optional)
              </label>
            </div>
            <p className="text-[11px] text-[#6e6e73]">
              If you leave this empty, clicking "Apply" opens the built-in modal. If you enter an external link (e.g. university ERP or Google Form), applicants will be redirected directly there.
            </p>
            <input
              type="url"
              value={newApplyUrl}
              onChange={(e) => setNewApplyUrl(e.target.value)}
              placeholder="https://vtu.ac.in/admissions/internships/portal"
              className="w-full px-3.5 py-2 rounded-lg border border-blue-200 bg-white text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingTrack(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#6e6e73] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs"
            >
              Publish New Track
            </button>
          </div>
        </form>
      )}

      {/* Existing Tracks List */}
      <div className="space-y-4">
        {tracks.length === 0 ? (
          <div className="apple-card p-12 text-center rounded-[24px] border border-[#e5e5ea] bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">No Internship Tracks in Database</h3>
            <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
              All dummy cohorts have been purged. Click &quot;+ Add New Track&quot; above whenever you are ready to configure a new accredited internship cohort.
            </p>
          </div>
        ) : (
          tracks.map((track, idx) => (
            <div
              key={track.id}
              className={`apple-card-elevated rounded-[28px] border bg-white p-6 sm:p-7 space-y-5 transition shadow-xs ${
                track.isActive ? "border-[#e5e5ea]" : "border-gray-200 opacity-60 bg-gray-50/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e5ea] pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-50 text-[#0071e3] font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#1d1d1f]">{track.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0071e3] border border-blue-100">
                        {track.price || "₹6,500"}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#86868b]">
                      slug: /internships/{track.slug}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(track.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      track.isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {track.isActive ? "Active (Accepting Applications)" : "Inactive (Intake Closed)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(track.id)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete track"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Domain Category
                  </label>
                  <input
                    type="text"
                    value={track.domain}
                    onChange={(e) => handleTrackChange(track.id, "domain", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Duration & Format
                  </label>
                  <input
                    type="text"
                    value={track.duration}
                    onChange={(e) => handleTrackChange(track.id, "duration", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Program Fee / Price
                  </label>
                  <input
                    type="text"
                    value={track.price ?? "₹6,500"}
                    onChange={(e) => handleTrackChange(track.id, "price", e.target.value)}
                    placeholder="e.g. ₹6,500 or Free"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-bold text-[#1d1d1f] focus:border-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                    Upcoming Batch Start Date
                  </label>
                  <input
                    type="text"
                    value={track.upcomingBatchDate}
                    onChange={(e) => handleTrackChange(track.id, "upcomingBatchDate", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs font-semibold text-[#0071e3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={track.description}
                  onChange={(e) => handleTrackChange(track.id, "description", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] bg-white text-xs leading-relaxed"
                />
              </div>

              {/* Custom Apply Portal Link */}
              <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0071e3]">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>External Application Portal URL</span>
                  </div>
                  <input
                    type="url"
                    value={track.applyPortalUrl || ""}
                    onChange={(e) => handleTrackChange(track.id, "applyPortalUrl", e.target.value)}
                    placeholder="https://... (Leave empty to use built-in VTU application modal)"
                    className="mt-1 w-full px-3 py-1.5 rounded-lg border border-blue-200 bg-white text-xs font-mono text-[#1d1d1f]"
                  />
                </div>
                <Link
                  href={`/internships/${track.slug}`}
                  target="_blank"
                  className="shrink-0 text-xs text-[#0071e3] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Program</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
