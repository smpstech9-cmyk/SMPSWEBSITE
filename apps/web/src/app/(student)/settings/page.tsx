"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Bell,
  Lock,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function StudentSettingsPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [usn, setUsn] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [mentorAlerts, setMentorAlerts] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#e5e5ea] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-3">
          <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="font-mono text-[#6e6e73]">VTU-VRIF Identity</span>
          <span className="text-[#86868b]">•</span>
          <span className="text-[#0071e3] font-semibold">Scholar Profile</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          Account & <span className="text-gradient-apple-blue">Settings</span>
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#6e6e73]">
          Manage your university academic credentials, notification preferences, and contact details.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#059669] text-xs flex items-center gap-3 animate-in fade-in-50">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold">Academic profile and notification preferences saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Academic Identity Card */}
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#e5e5ea]">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1d1d1f]">VTU Academic Enrollment</h2>
              <span className="text-xs text-[#6e6e73]">Official university affiliation records</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                VTU University Seat Number (USN)
              </label>
              <input
                type="text"
                disabled
                value={usn}
                className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#e5e5ea] rounded-2xl text-xs font-mono font-bold text-[#1d1d1f] cursor-not-allowed"
              />
              <span className="text-[10px] text-[#86868b] mt-1 block">Locked to accredited academic record</span>
            </div>

            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Full Scholar Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Affiliated Engineering College
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Engineering Department / Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Current Semester
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#e5e5ea]">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1d1d1f]">Communication & Dispatch Coordinates</h2>
              <span className="text-xs text-[#6e6e73]">Used for certificate delivery & hardware tracking</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1d1d1f] mb-1.5">
                Mobile Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbfbfd] border border-[#e5e5ea] rounded-2xl text-xs font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#e5e5ea]">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1d1d1f]">Academic Alerts</h2>
              <span className="text-xs text-[#6e6e73]">Notification channels</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] cursor-pointer">
              <div>
                <span className="font-bold text-[#1d1d1f] block">Laboratory Schedule & Calendar Invites</span>
                <span className="text-[#6e6e73]">Receive reminders 2 hours prior to Chroma bay testing sessions</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0071e3] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea] cursor-pointer">
              <div>
                <span className="font-bold text-[#1d1d1f] block">Mentor Assignment Reviews & Grades</span>
                <span className="text-[#6e6e73]">Instant notification when your lab practical is graded</span>
              </div>
              <input
                type="checkbox"
                checked={mentorAlerts}
                onChange={(e) => setMentorAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0071e3] rounded"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold shadow-sm transition active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
