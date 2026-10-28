import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#0056b3] flex items-center justify-center text-white font-extrabold text-lg shadow-md animate-pulse">
          S
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce"></div>
        </div>
        <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase">
          Loading SMPS Platform...
        </p>
      </div>
    </div>
  );
}
