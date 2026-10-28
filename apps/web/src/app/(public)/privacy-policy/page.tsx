import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | SMPS Tech Lab",
  description: "SMPS Electric Control Pvt Ltd privacy and data protection policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/" className="hover:text-[#0071e3]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1d1d1f]">Privacy Policy</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold mb-4 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          Statutory Compliance & Data Security
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#86868b] mb-10">Last updated: October 2026 • SMPS Electric Control Pvt Ltd</p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-[#6e6e73] leading-relaxed">
          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">1. Information We Collect</h2>
            <p>
              SMPS Electric Control Pvt Ltd collects information to provide industrial hardware orders, academic internship verification, and R&D partnership consultations. We collect personal identifiers (such as name, email address, phone number, and VTU student university seat number / USN) and technical telemetry when submitting proposals.
            </p>
          </section>

          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">2. Use of Information</h2>
            <p>
              Your data is exclusively used to process equipment purchases, issue academic certificates under VTU standards, maintain hardware telemetry, and review mutual non-disclosure partnership agreements. We do not sell or monetize personal or enterprise data.
            </p>
          </section>

          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">3. Enterprise & Hardware Confidentiality</h2>
            <p>
              All technical specifications, single-line diagrams, and BESS capacity queries submitted via our R&D portal are protected under bilateral non-disclosure protocols and stored in sovereign encrypted databases located within Indian territory.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
