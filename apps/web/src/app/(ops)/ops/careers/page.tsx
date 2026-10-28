"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { CMS_JobRole } from "@/lib/cms-store";

export default function OpsCareersPage() {
  const { content, updateSection } = useSiteContent();
  const [careers, setCareers] = useState<CMS_JobRole[]>(content.careers || []);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);

  useEffect(() => {
    if (content.careers) {
      setCareers(content.careers);
    }
  }, [content.careers]);

  // New Role Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDepartment, setNewDepartment] = useState("Power Systems & BESS");
  const [newLocation, setNewLocation] = useState("VTU-VRIF Center, Nagarbhavi, Bengaluru");
  const [newType, setNewType] = useState("Full-Time (On-Site)");
  const [newExperience, setNewExperience] = useState("2 – 5 Years Experience");
  const [newBadge, setNewBadge] = useState("Open Role");
  const [newSummary, setNewSummary] = useState("");
  const [newResponsibilities, setNewResponsibilities] = useState("");
  const [newQualifications, setNewQualifications] = useState("");

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("careers", careers);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRoleChange = (id: string, field: keyof CMS_JobRole, value: any) => {
    setCareers((prev) =>
      prev.map((role) => (role.id === id ? { ...role, [field]: value } : role))
    );
  };

  const handleDeleteRole = (id: string) => {
    const updated = careers.filter((r) => r.id !== id);
    setCareers(updated);
    updateSection("careers", updated);
  };

  const handleAddRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const resps = newResponsibilities
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const quals = newQualifications
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const newRole: CMS_JobRole = {
      id: `role-${Date.now()}`,
      title: newTitle.trim(),
      department: newDepartment.trim(),
      location: newLocation.trim(),
      type: newType.trim(),
      experience: newExperience.trim(),
      badge: newBadge.trim() || "Active Opening",
      isActive: true,
      summary: newSummary.trim() || "DeepTech hardware engineering role inside VTU-VRIF Center.",
      responsibilities: resps.length > 0 ? resps : ["Design and validate mission-critical hardware.", "Participate in bench testing and HIL calibration."],
      qualifications: quals.length > 0 ? quals : ["B.E. / M.Tech in relevant engineering discipline.", "Demonstrated hands-on laboratory experience."],
    };

    const updated = [newRole, ...careers];
    setCareers(updated);
    updateSection("careers", updated);

    // Reset Form
    setNewTitle("");
    setNewSummary("");
    setNewResponsibilities("");
    setNewQualifications("");
    setIsAddingRole(false);
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
            <span className="text-[#1d1d1f] font-semibold">Careers & Hiring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Careers & Hiring <span className="text-gradient-apple-blue">Manager</span>
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
            href="/careers"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Careers</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsAddingRole(true)}
            className="px-4 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Opening</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* CREATE NEW ROLE MODAL */}
      {isAddingRole && (
        <form onSubmit={handleAddRoleSubmit} className="apple-card-elevated p-6 sm:p-8 rounded-[28px] border border-[#0071e3]/30 bg-white space-y-5">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <h3 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#0071e3]" />
              Post New Engineering Job Opening
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingRole(false)}
              className="text-xs text-[#86868b] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Power Electronics Architect"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Department</label>
              <input
                type="text"
                placeholder="e.g. Power Systems & BESS"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Badge</label>
              <input
                type="text"
                placeholder="e.g. Priority Hire / Silicon Team"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Employment Type</label>
              <input
                type="text"
                placeholder="e.g. Full-Time (On-Site)"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Experience Level</label>
              <input
                type="text"
                placeholder="e.g. 2 – 5 Years Experience"
                value={newExperience}
                onChange={(e) => setNewExperience(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">Role Summary</label>
              <textarea
                rows={2}
                placeholder="Brief high-level summary of what this engineer will architect..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                Responsibilities (One per line)
              </label>
              <textarea
                rows={3}
                placeholder="Design PCB layout...\nRun thermal simulations..."
                value={newResponsibilities}
                onChange={(e) => setNewResponsibilities(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                Qualifications & Skills (One per line)
              </label>
              <textarea
                rows={3}
                placeholder="B.E. in Electrical Engineering...\nAltium Designer proficiency..."
                value={newQualifications}
                onChange={(e) => setNewQualifications(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAddingRole(false)}
              className="px-5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-[#6e6e73]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold shadow-sm hover:bg-[#0077ed]"
            >
              Publish Job Opening Live
            </button>
          </div>
        </form>
      )}

      {/* EXISTING ROLES LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
            Active Open Roles ({careers.length})
          </span>
          <span className="text-xs text-[#86868b]">
            Directly updates the public /careers page
          </span>
        </div>

        {careers.length === 0 ? (
          <div className="apple-card p-12 text-center rounded-[24px] border border-[#e5e5ea] bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">No Job Openings in Database</h3>
            <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
              All dummy positions have been purged. Click &quot;+ Add New Position&quot; above whenever you are ready to post an active opening.
            </p>
          </div>
        ) : (
          careers.map((role) => (
            <div
              key={role.id}
              className="apple-card p-6 sm:p-7 rounded-[24px] border border-[#e5e5ea] bg-white space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase">
                    {role.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#1d1d1f]">{role.department}</span>
                  {role.isActive ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] text-[10px] font-bold">
                      Hiring Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[#86868b] text-[10px] font-bold">
                      Position Paused
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleChange(role.id, "isActive", !role.isActive)}
                    className="px-3 py-1 rounded-full text-[11px] font-semibold border border-[#e5e5ea] hover:bg-[#f5f5f7] transition"
                  >
                    {role.isActive ? "Pause Hiring" : "Re-activate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-1.5 text-[#86868b] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#86868b] mb-1">Job Title</label>
                  <input
                    type="text"
                    value={role.title}
                    onChange={(e) => handleRoleChange(role.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#86868b] mb-1">Type & Hours</label>
                  <input
                    type="text"
                    value={role.type}
                    onChange={(e) => handleRoleChange(role.id, "type", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#86868b] mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={role.experience}
                    onChange={(e) => handleRoleChange(role.id, "experience", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#86868b] mb-1">Job Summary</label>
                  <textarea
                    rows={2}
                    value={role.summary}
                    onChange={(e) => handleRoleChange(role.id, "summary", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#6e6e73] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
