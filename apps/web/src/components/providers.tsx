"use client";

import React from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { ContentProvider } from "@/context/content-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <AuthProvider>{children}</AuthProvider>
    </ContentProvider>
  );
}
