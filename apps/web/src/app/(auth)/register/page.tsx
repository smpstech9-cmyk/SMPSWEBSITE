"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Phone, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"student" | "customer">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await signUp({
        email,
        password,
        fullName,
        phone,
        defaultRole: accountType,
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        router.push(accountType === "student" ? "/internships" : "/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Could not complete account creation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header Eyebrow & Keynote Typography */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
          <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
          <span className="text-[#86868b]">•</span>
          <span className="text-[#0071e3] font-semibold">Single Sign-On</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          Create Your <span className="text-gradient-apple-blue">SMPS ID</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#6e6e73] font-normal max-w-md mx-auto">
          One unified account for VTU engineering research programs and industrial hardware ordering
        </p>
      </div>

      <div className="apple-card-elevated rounded-[28px] p-8 sm:p-10 border border-[#e5e5ea] bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Track Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2">
              Select Primary Track
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType("student")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  accountType === "student"
                    ? "bg-[#f5f5f7] border-[#0071e3] shadow-sm ring-2 ring-[#0071e3]/30"
                    : "bg-white border-[#e5e5ea] text-[#6e6e73] hover:border-[#86868b]"
                }`}
              >
                <span className={`block text-xs font-bold ${accountType === "student" ? "text-[#0071e3]" : "text-[#1d1d1f]"}`}>
                  VTU Engineering Intern
                </span>
                <span className="block text-[11px] text-[#6e6e73] mt-1 leading-snug font-normal">
                  Academic Labs & Hardware Training
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("customer")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  accountType === "customer"
                    ? "bg-[#f5f5f7] border-[#0071e3] shadow-sm ring-2 ring-[#0071e3]/30"
                    : "bg-white border-[#e5e5ea] text-[#6e6e73] hover:border-[#86868b]"
                }`}
              >
                <span className={`block text-xs font-bold ${accountType === "customer" ? "text-[#0071e3]" : "text-[#1d1d1f]"}`}>
                  Industrial Buyer
                </span>
                <span className="block text-[11px] text-[#6e6e73] mt-1 leading-snug font-normal">
                  BESS, PCS & Hardware Orders
                </span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
              Full Legal Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Name as registered with VTU or Enterprise"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
              Secure Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
          >
            {isLoading ? "Provisioning Account..." : "Create SMPS Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#e5e5ea] text-center">
          <p className="text-xs text-[#6e6e73]">
            Already have an active account?{" "}
            <Link href="/login" className="font-semibold text-[#0071e3] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
