"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { ShieldAlert, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallbackUrl?: string;
}

export function AuthGuard({
  children,
  allowedRoles,
  fallbackUrl = "/login",
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectTarget = encodeURIComponent(pathname || "/dashboard");
      router.replace(`${fallbackUrl}?redirect=${redirectTarget}`);
    }
  }, [isLoading, isAuthenticated, router, pathname, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-300">Verifying session security clearance...</p>
        <span className="text-xs text-slate-500 mt-1">SMPS Electric Control Security Perimeter</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // redirecting
  }

  // Check role authorization if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const isAuthorized = allowedRoles.some((role) => hasRole(role));
    if (!isAuthorized) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Your current account role does not have authorization to view this section.
            Required privileges:{" "}
            <span className="font-mono text-amber-300 font-medium">
              {allowedRoles.join(" | ")}
            </span>
          </p>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
            >
              Return to Dashboard
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition"
            >
              Request Access
            </Link>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
