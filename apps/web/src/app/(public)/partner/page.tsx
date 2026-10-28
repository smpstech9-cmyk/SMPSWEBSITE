"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  ShieldCheck,
  BatteryCharging,
  Cpu,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Send,
  Zap,
  Lock,
} from "lucide-react";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    organization: "",
    contactName: "",
    role: "",
    workEmail: "",
    phone: "",
    partnershipType: "bess",
    powerRating: "",
    timeline: "3-6-months",
    ndaRequired: true,
    projectBrief: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const tracks = [
    {
      id: "bess",
      title: "PURNA BESS™ Grid Deployment",
      desc: "50kWh to 2MWh commercial & industrial energy storage pilot off-take.",
      icon: BatteryCharging,
    },
    {
      id: "odm",
      title: "Custom ODM Power Electronics",
      desc: "Bidirectional PCS inverters, isolated DC-DC converters, and magnetics.",
      icon: Zap,
    },
    {
      id: "silicon",
      title: "SaralaChip™ CCU Integration",
      desc: "Proprietary DSP microcontroller boards and custom CAN-FD control firmware.",
      icon: Cpu,
    },
    {
      id: "incubation",
      title: "Hardware Startup Incubation",
      desc: "Lab bench access, DFM engineering, testing bays, and grant acceleration.",
      icon: Rocket,
    },
  ];

  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-20 selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs text-[#6e6e73] font-medium mb-2">
            <Link href="/" className="hover:text-[#0071e3]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1d1d1f]">R&D & Corporate Partnerships</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Executive & Institutional Partnership Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
            Partner with SMPS Tech Lab
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal">
            We collaborate with utilities, clean-energy enterprises, hardware startups, and academic institutions to pilot grid storage, engineer custom ODM converters, and commercialize sovereign power silicon.
          </p>
        </div>

        {/* 4 Partnership Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {tracks.map((t) => {
            const Icon = t.icon;
            const isSelected = formData.partnershipType === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setFormData({ ...formData, partnershipType: t.id })}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/70 border-[#0071e3] shadow-md ring-1 ring-[#0071e3]"
                    : "bg-white border-[#e5e5ea] hover:border-gray-300 shadow-sm"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e5ea] text-[#0071e3] flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1d1d1f]">{t.title}</h3>
                <p className="text-xs text-[#6e6e73] mt-1.5 leading-relaxed font-normal">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: What to Expect & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-[#e5e5ea]">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0071e3] mb-3">
                <Building2 className="w-4 h-4" /> VTU-VRIF-TCOE Campus Facility
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f]">
                Institutional Engagement Framework
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mt-2 leading-relaxed font-normal">
                All partnership inquiries are reviewed directly by our R&D Directors and Principal Engineers within 48 business hours under mutual non-disclosure agreements (NDA).
              </p>

              <div className="space-y-3.5 mt-6 pt-6 border-t border-[#e5e5ea]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                    Strict Intellectual Property Protection (Mutual NDA prior to schematics exchange)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                    Chroma AC/DC regenerative grid benches & 1500V testing facility access
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                    Rapid prototyping with in-house SMT assembly and environmental thermal cycling
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                    ARAI / BIS pre-compliance certification test screening
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Engineering Desk Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1d1d1f]">Confidential R&D Desk</h4>
                <p className="text-xs text-[#6e6e73] mt-0.5">
                  Direct email: <span className="font-mono text-[#0071e3] font-semibold">rnd@smpstechlab.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Dedicated Partnership Intake Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-[#e5e5ea] shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#10b981] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f]">
                    Partnership Inquiry Received
                  </h3>
                  <p className="text-sm text-[#6e6e73] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1d1d1f]">{formData.contactName || "Partner"}</span>. Our R&D leadership has received your proposal for <span className="font-semibold text-[#1d1d1f]">{formData.organization || "your organization"}</span>. We will initiate contact and share our mutual NDA draft within 48 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1f]">
                      Submit Partnership Proposal
                    </h3>
                    <p className="text-xs text-[#6e6e73] mt-1 font-normal">
                      Provide your project details to connect with our core engineering team.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Organization / Enterprise Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Acme Clean Energy Ltd / State University"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Your Full Name & Designation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Kumar, VP Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Target Power / Capacity Spec
                      </label>
                      <input
                        type="text"
                        value={formData.powerRating}
                        onChange={(e) => setFormData({ ...formData, powerRating: e.target.value })}
                        placeholder="e.g. 100 kW / 250 kWh / 1500V DC"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Project Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                      >
                        <option value="immediate">Immediate Pilot (0 - 3 Months)</option>
                        <option value="3-6-months">Medium Term (3 - 6 Months)</option>
                        <option value="6-12-months">Long Term (6 - 12 Months)</option>
                        <option value="exploratory">Exploratory / Feasibility Study</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Technical Scope & Collaboration Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectBrief}
                      onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                      placeholder="Describe your technical specifications, required test benches, expected deliverables, or venture incubation stage..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="nda"
                      checked={formData.ndaRequired}
                      onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                      className="w-4 h-4 rounded border-[#e5e5ea] text-[#0071e3] focus:ring-[#0071e3]"
                    />
                    <label htmlFor="nda" className="text-xs text-[#6e6e73]">
                      Request standard bilateral Non-Disclosure Agreement (NDA) before technical discussions
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,113,227,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Proposal...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Corporate Partnership Proposal</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
