"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Enquiry");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMessage("Please accept the privacy policy terms to submit.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="w-full bg-white text-[#1d1d1f] py-12 sm:py-20 selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs text-[#6e6e73] font-medium mb-2">
            <Link href="/" className="hover:text-[#0071e3]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1d1d1f]">Contact Us</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0071e3] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            General Inquiries & Facility Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
            Get in Touch with SMPS Tech Lab
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6e6e73] leading-relaxed font-normal">
            Have questions regarding VTU engineering internships, laboratory equipment access, or general hardware orders? We’re here to assist you.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards & Map Pin */}
          <div className="lg:col-span-5 space-y-5">
            {/* Phone Card */}
            <div className="apple-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f]">+91 98450 12345</h3>
                <p className="text-xs text-[#6e6e73] mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                <p className="text-xs text-[#0071e3] font-semibold mt-2">Voice & WhatsApp Support Available</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="apple-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f]">contact@smpstechlab.com</h3>
                <p className="text-xs text-[#6e6e73] mt-0.5">We respond within 24 business hours.</p>
                <p className="text-xs text-[#0071e3] font-semibold mt-2">Direct Lab Coordinator Inbox</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="apple-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0071e3] flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f]">Bengaluru R&D Center</h3>
                <p className="text-xs text-[#6e6e73] mt-0.5 leading-relaxed font-normal">
                  SMPS Electric Control Pvt Ltd, VTU-VRIF-TCOE Building, Visvesvaraya Technological University Campus, Nagarbhavi, Bengaluru - 560072
                </p>
                <p className="text-xs text-[#6e6e73] font-medium mt-2">Campus lab visits scheduled by appointment</p>
              </div>
            </div>

            {/* Corporate Partnership Banner */}
            <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]">
              <h4 className="text-sm font-bold text-[#1d1d1f]">Looking for B2B or R&D Partnerships?</h4>
              <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed font-normal">
                For ODM power electronics, PURNA BESS™ pilot storage deployments, or hardware startup incubation, visit our dedicated portal.
              </p>
              <Link
                href="/partner"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
              >
                Go to Corporate Partnership Portal →
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[32px] border border-[#e5e5ea] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6e73] mb-6 font-normal">
                Fill in the details below and an SMPS laboratory coordinator will reach out promptly.
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#10b981] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to SMPS Tech Lab. Our academic coordinator or engineering support team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohini Patil"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                    >
                      <option>General Enquiry</option>
                      <option>VTU Internship Admissions</option>
                      <option>Hardware Store Orders & Dispatch</option>
                      <option>Campus Laboratory Visit Scheduling</option>
                      <option>Student Academic Project Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Message / Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our laboratory engineering team assist you today?..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 rounded border-[#e5e5ea] text-[#0071e3] focus:ring-[#0071e3]"
                    />
                    <label htmlFor="terms" className="text-xs text-[#6e6e73]">
                      I agree to the privacy terms regarding the handling of my contact information.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-3 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.3)] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Dispatched...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
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
