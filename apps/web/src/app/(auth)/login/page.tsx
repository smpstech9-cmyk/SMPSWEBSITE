"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Lock, Mail, ArrowRight, AlertCircle, Shield } from "lucide-react";
import { apiClient } from "@/lib/api-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        router.push(redirectTarget);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Eyebrow & Keynote Typography */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-xs font-medium tracking-wide shadow-sm mb-4">
          <span className="telemetry-beacon w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="font-mono text-[#6e6e73]">VTU-VRIF Center</span>
          <span className="text-[#86868b]">•</span>
          <span className="text-[#0071e3] font-semibold">Single Sign-On</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
          Sign In to <span className="text-gradient-apple-blue">SMPS Portal</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#6e6e73] font-normal max-w-sm mx-auto">
          Access VTU research programs, student labs, and hardware ordering
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
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usn@vtu.ac.in or work@domain.com"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#0071e3] hover:underline transition"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
          >
            {isLoading ? "Authenticating..." : "Sign In to Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#e5e5ea] text-center">
          <p className="text-xs text-[#6e6e73]">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-semibold text-[#0071e3] hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-[#6e6e73] text-sm">Loading security interface...</div>}>
      <LoginForm />
    </Suspense>
  );
}
