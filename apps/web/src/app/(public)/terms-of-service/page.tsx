import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | SMPS Tech Lab",
  description: "SMPS Electric Control Pvt Ltd terms of service and institutional usage conditions.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/" className="hover:text-[#0071e3]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1d1d1f]">Terms of Service</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold mb-4 shadow-sm">
          <FileText className="w-3.5 h-3.5" />
          Terms of Service & Institutional Agreements
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-[#86868b] mb-10">Last updated: October 2026 • SMPS Electric Control Pvt Ltd</p>

        <div className="space-y-8 text-sm sm:text-base text-[#6e6e73] leading-relaxed">
          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">1. Scope of Service</h2>
            <p>
              By accessing the digital portals or physical laboratory test benches of SMPS Electric Control Pvt Ltd (operating within the VTU-VRIF-TCOE Facility, Bengaluru), users and enterprises agree to adhere to all laboratory safety protocols, intellectual property guidelines, and statutory regulations.
            </p>
          </section>

          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">2. Laboratory Safety & High-Voltage Handling</h2>
            <p>
              Students, interns, and venture founders operating high-power equipment (including 1500V battery racks and Chroma grid simulators) must hold valid safety certifications and adhere strictly to laboratory safety instructions issued by designated principal test engineers.
            </p>
          </section>

          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">3. Governing Jurisdiction</h2>
            <p>
              All commercial hardware transactions, university technology transfer arrangements, and bilateral NDAs are governed by the laws of India and subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
