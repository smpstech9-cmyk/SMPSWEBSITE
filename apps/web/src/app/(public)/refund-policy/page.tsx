import React from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | SMPS Tech Lab",
  description: "SMPS Electric Control Pvt Ltd cancellation, warranty, and refund terms.",
};

export default function RefundPolicyPage() {
  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-[#6e6e73] font-medium mb-2">
          <Link href="/" className="hover:text-[#0071e3]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1d1d1f]">Refund Policy</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold mb-4 shadow-sm">
          <RotateCcw className="w-3.5 h-3.5" />
          Hardware & Academic Refund Standards
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight mb-4">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-[#86868b] mb-10">Last updated: October 2026 • SMPS Electric Control Pvt Ltd</p>

        <div className="space-y-8 text-sm sm:text-base text-[#6e6e73] leading-relaxed">
          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">1. Hardware & Component Purchases</h2>
            <p>
              Standard developer kits (such as IoT boards and robotics suites) can be returned within 7 calendar days of receipt if delivered with verified manufacturing defects or transit damage. Industrial energy equipment (PURNA BESS™ and SWARNALI™ chargers) are manufactured on-order and governed by individual supply agreements with 36-month standard warranty coverage.
            </p>
          </section>

          <section className="apple-card p-6 sm:p-8 bg-white border border-[#e5e5ea]">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-3">2. VTU Certified Internships</h2>
            <p>
              Internship seat cancellations are eligible for a full refund up to 72 hours prior to cohort orientation. Once laboratory bench allocation and specialized test hardware access have been provisioned, fees are non-refundable but transferable to subsequent cohort schedules upon academic coordinator approval.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
