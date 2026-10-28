"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  BatteryCharging,
  Zap,
  Building2,
  Award,
  Users,
  ShieldCheck,
  X,
  Check,
  Send,
  FileText,
} from "lucide-react";
import { useSiteContent } from "@/context/content-context";

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  badge: string;
}

const OPEN_ROLES: JobRole[] = [];

export default function CareersPage() {
  const { content } = useSiteContent();
  const allRoles: JobRole[] = ((content.careers || []) as any[]).filter(
    (r) => r.isActive !== false
  ) as JobRole[];

  const [selectedRoleForModal, setSelectedRoleForModal] = useState<JobRole | null>(null);

  // Application Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyClick = (role: JobRole) => {
    setSelectedRoleForModal(role);
    setApplicationSuccess(false);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    // Instant simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationSuccess(true);
    }, 700);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-[#0071e3] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868b]" />
          <span className="text-[#1d1d1f] font-semibold">Careers & Fellowships</span>
        </nav>

        {/* Hero Header */}
        <div className="border-b border-[#e5e5ea] pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-semibold text-[#0071e3] tracking-wide mb-4 shadow-sm">
            <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#0071e3]" />
            We Are Hiring DeepTech Builders in Bengaluru
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
                Build Physical Hardware <br />
                <span className="text-gradient-apple-blue">That Powers the Nation</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6e6e73] max-w-2xl font-normal leading-relaxed">
                Join our engineering team inside the prestigious VTU-VRIF-TCOE Center. We architect indigenous semiconductors, megawatt energy storage, and clean power grids.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#open-roles"
                className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-md transition inline-flex items-center gap-2"
              >
                <span>View {allRoles.length} Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* CULTURE & ENGINEERING VALUES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="apple-card p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Zero-Capex Lab Access</h3>
            <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
              Direct daily access to multi-channel 1GHz oscilloscopes, 1500V DC grid simulators, and thermal stress chambers.
            </p>
          </div>

          <div className="apple-card p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Patent Co-Authorship</h3>
            <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
              Engineers at SMPS Tech Lab are named co-inventors on national patent disclosures and IEEE journal publications.
            </p>
          </div>

          <div className="apple-card p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">VTU-VRIF Facility</h3>
            <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
              Modern air-conditioned research bays located inside the VTU Telecom Center of Excellence Campus in Nagarbhavi.
            </p>
          </div>

          <div className="apple-card p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Competitive Benefits</h3>
            <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
              Attractive compensation, ESOP participation, corporate medical insurance, and conference sponsorship.
            </p>
          </div>
        </div>

        {/* OPEN ROLES LISTING */}
        <div id="open-roles" className="space-y-6 mb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e5ea] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                Current Opportunities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-1">
                Open Engineering & Research Positions
              </h2>
            </div>
            <span className="text-xs font-mono text-[#86868b]">
              Location: VTU-VRIF Facility, Bengaluru
            </span>
          </div>

          {allRoles.length === 0 ? (
            <div className="apple-card-elevated rounded-[32px] border border-[#e5e5ea] bg-white p-10 sm:p-16 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0071e3]">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                  No Open Engineering Positions Currently Posted
                </h3>
                <p className="text-sm text-[#6e6e73] max-w-md mx-auto leading-relaxed">
                  We are not actively recruiting for specific openings right now, but we are always open to hearing from exceptional hardware innovators, power electronics designers, and firmware architects.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact?inquiry=careers"
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
                >
                  <span>Submit General Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/internships"
                  className="px-6 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#e5e5ea] transition inline-flex items-center gap-2"
                >
                  <span>Explore VTU Internships</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {allRoles.map((role) => (
                <div
                  key={role.id}
                  className="apple-card p-6 sm:p-8 rounded-[28px] border border-[#e5e5ea] hover:border-[#0071e3]/40 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                          {role.badge}
                        </span>
                        <span className="text-xs font-semibold text-[#6e6e73]">
                          {role.department}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                        {role.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                        {role.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#1d1d1f] pt-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                          <span>{role.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
                          <span>{role.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#0071e3]" />
                          <span>{role.experience}</span>
                        </div>
                      </div>

                      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1d1d1f] block mb-1.5">
                            Key Deliverables
                          </span>
                          <ul className="space-y-1">
                            {role.responsibilities.slice(0, 3).map((resp, i) => (
                              <li key={i} className="text-xs text-[#6e6e73] flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] flex-shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1d1d1f] block mb-1.5">
                            Prerequisites
                          </span>
                          <ul className="space-y-1">
                            {role.qualifications.slice(0, 3).map((qual, i) => (
                              <li key={i} className="text-xs text-[#6e6e73] flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] flex-shrink-0 mt-1.5" />
                                <span>{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-2 lg:pt-0">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(role)}
                        className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center justify-center gap-2"
                      >
                        <span>Apply for this Role</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GENERAL INQUIRY / SPONTANEOUS APPLICATION */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#fbfbfd] border border-black/[0.06] text-center max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f]">
            Don't see an exact match for your domain?
          </h3>
          <p className="text-xs sm:text-sm text-[#6e6e73] mt-2 max-w-lg mx-auto leading-relaxed">
            We are always eager to meet exceptional hardware engineers, PCB layout wizards, and research scientists. Drop us your portfolio and resume directly.
          </p>
          <div className="pt-6">
            <Link
              href="/contact?inquiry=careers"
              className="px-8 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition inline-flex items-center gap-2"
            >
              <span>Submit General Engineering Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* APPLICATION MODAL */}
      {selectedRoleForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedRoleForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {applicationSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-[#1d1d1f]">
                  Application Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1d1d1f]">{fullName}</strong>! Your application for the <strong className="text-[#0071e3]">{selectedRoleForModal.title}</strong> has been received by our technical review committee.
                </p>
                <p className="text-xs text-[#86868b]">
                  Our lead engineers review every submission and will contact you at <strong>{email}</strong> within 3 business days.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRoleForModal(null)}
                    className="w-full py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-md transition"
                  >
                    Close & Return to Careers
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {selectedRoleForModal.department}
                  </span>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mt-2 leading-tight">
                    Apply: {selectedRoleForModal.title}
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1">
                    {selectedRoleForModal.location}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Deshmukh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      LinkedIn or GitHub Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/... or https://github.com/..."
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      Link to Resume / CV (Google Drive, Dropbox, or Personal URL) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/file/..."
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1">
                      Relevant Hardware Projects / Experience
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe high-voltage hardware, firmware, or PCB design projects you have built..."
                      value={experienceSummary}
                      onChange={(e) => setExperienceSummary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application to Engineering Team"}
                  </button>
                  <p className="text-[10px] text-center text-[#86868b] mt-2">
                    SMPS Electric Control Pvt Ltd is an equal-opportunity employer.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
