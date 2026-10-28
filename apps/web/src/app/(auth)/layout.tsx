import React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1d1d1f] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-hidden">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfbfd] relative">
        {/* Soft Ambient Radial Backlight - Apple Keynote Template */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-blue-500/[0.07] via-indigo-500/[0.03] to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="w-full relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
