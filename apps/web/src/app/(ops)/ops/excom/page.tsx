"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Mail,
  Building2,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";
import { ExComMemberItem } from "@/lib/cms-store";

export default function ExComEditorPage() {
  const { content, updateSection } = useSiteContent();
  const [members, setMembers] = useState<ExComMemberItem[]>(content.excom || []);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    if (content.excom) {
      setMembers(content.excom);
    }
  }, [content.excom]);

  // New member form state
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Academic Council Member");
  const [newDesignation, setNewDesignation] = useState("Professor & Research Guide");
  const [newDepartment, setNewDepartment] = useState("Electrical & Electronics Engineering");
  const [newQualifications, setNewQualifications] = useState("Ph.D. (Power Systems)");
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSection("excom", members);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    updateSection("excom", updated);
  };

  const handleMemberChange = (id: string, field: keyof ExComMemberItem, value: any) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember: ExComMemberItem = {
      id: `excom-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim(),
      designation: newDesignation.trim(),
      department: newDepartment.trim(),
      qualifications: newQualifications.trim(),
      bio: newBio.trim() || "Advises curriculum accreditation and industrial testbench alignment.",
      email: newEmail.trim() || "council@vtu.ac.in",
    };

    const updated = [...members, newMember];
    setMembers(updated);
    updateSection("excom", updated);

    // Reset
    setNewName("");
    setNewBio("");
    setNewEmail("");
    setIsAddingMember(false);
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
            <span className="text-[#1d1d1f] font-semibold">Executive Committee</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Executive Committee <span className="text-gradient-apple-blue">(ExCom) Registry</span>
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
            href="/excom"
            target="_blank"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] border border-[#e5e5ea] transition inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public ExCom</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsAddingMember(!isAddingMember)}
            className="px-4 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0071e3] text-xs font-semibold border border-blue-200 transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
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

      {/* Add New Member Modal Form */}
      {isAddingMember && (
        <form onSubmit={handleAddMember} className="apple-card-elevated rounded-[28px] border-2 border-blue-200 bg-white p-6 sm:p-8 space-y-5 shadow-lg animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-[#e5e5ea] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1d1d1f]">Add Executive Committee Member</h3>
              <p className="text-xs text-[#6e6e73]">Register university council or industrial advisory leadership</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Dr. Ramesh Kumar"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Committee Mandate / Role
              </label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Designation
              </label>
              <input
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Department / Institution
              </label>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Academic Qualifications
              </label>
              <input
                type="text"
                value={newQualifications}
                onChange={(e) => setNewQualifications(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
              Biography & Mandate Summary
            </label>
            <textarea
              rows={2}
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Summary of research impact, patents, or advisory domain."
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="name@vtu.ac.in"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#6e6e73] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs"
            >
              Add to Committee
            </button>
          </div>
        </form>
      )}

      {/* Members List */}
      <div className="space-y-4">
        {members.length === 0 ? (
          <div className="apple-card p-12 text-center rounded-[24px] border border-[#e5e5ea] bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">No Committee Members in Database</h3>
            <p className="text-xs text-[#6e6e73] max-w-sm mx-auto">
              All committee members have been purged. Click &quot;+ Add Committee Member&quot; above whenever you are ready to configure a member profile.
            </p>
          </div>
        ) : (
          members.map((member, idx) => (
          <div
            key={member.id}
            className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-7 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e5ea] pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-[#0071e3] font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#1d1d1f]">{member.name}</h3>
                  <span className="text-[11px] text-[#6e6e73]">{member.designation}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleMemberChange(member.id, "name", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs font-bold text-[#1d1d1f]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Mandate / Role
                </label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => handleMemberChange(member.id, "role", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs text-[#0071e3] font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(member.id, "email", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs font-mono text-[#1d1d1f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Qualifications
                </label>
                <input
                  type="text"
                  value={member.qualifications}
                  onChange={(e) => handleMemberChange(member.id, "qualifications", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs text-[#6e6e73]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={member.department}
                  onChange={(e) => handleMemberChange(member.id, "department", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs text-[#6e6e73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#86868b] uppercase mb-1">
                Bio
              </label>
              <textarea
                rows={2}
                value={member.bio}
                onChange={(e) => handleMemberChange(member.id, "bio", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-xs text-[#6e6e73]"
              />
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
