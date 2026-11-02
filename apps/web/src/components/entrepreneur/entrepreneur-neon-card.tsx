"use client";

import React from "react";

interface EntrepreneurNeonCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rounded?: string;
}

export function EntrepreneurNeonCard({
  children,
  className = "",
  containerClassName = "",
  rounded = "rounded-3xl",
}: EntrepreneurNeonCardProps) {
  return (
    <div className={`relative ${rounded} group ${containerClassName}`}>
      {/* 1. Very light, very smooth ambient background neon underglow */}
      <div
        className={`absolute -inset-1.5 ${rounded} overflow-hidden blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none -z-10`}
      >
        <div className="absolute inset-[-150%] animate-neon-run-smooth bg-[conic-gradient(from_0deg,transparent_0deg_240deg,rgba(56,189,248,0.35)_280deg,rgba(52,211,153,0.35)_320deg,rgba(168,85,247,0.3)_350deg,rgba(255,255,255,0.4)_360deg)]" />
      </div>

      {/* 2. Delicate perimeter neon border runner */}
      <div className={`relative p-[1px] ${rounded} overflow-hidden h-full flex flex-col`}>
        <div className="absolute inset-[-150%] animate-neon-run-smooth bg-[conic-gradient(from_0deg,transparent_0deg_240deg,rgba(56,189,248,0.45)_280deg,rgba(52,211,153,0.4)_320deg,rgba(168,85,247,0.4)_350deg,rgba(255,255,255,0.5)_360deg)] pointer-events-none opacity-30 group-hover:opacity-65 transition-opacity duration-500" />

        {/* 3. Card Content Interior */}
        <div
          className={`relative ${rounded} bg-[#0c0c14]/90 backdrop-blur-xl h-full flex flex-col ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

