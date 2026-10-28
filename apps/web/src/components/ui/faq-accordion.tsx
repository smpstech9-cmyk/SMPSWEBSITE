"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  showCategories?: boolean;
}

export function FAQAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our engineering operations, partnerships, and technical programs.",
  badge = "Clarifications & Knowledge Base",
  showCategories = false,
}: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [items[0]?.id || ""]: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[])),
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          {showCategories && categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? "bg-[#0071e3] text-white shadow-sm"
                      : "bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-3.5">
        {filteredItems.map((item) => {
          const isOpen = !!openIds[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white border-[#0071e3]/30 shadow-[0_8px_24px_rgba(0,113,227,0.08)]"
                  : "bg-[#fbfbfd] border-black/[0.06] hover:border-black/[0.12]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  {item.category && (
                    <span className="hidden sm:inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0071e3] border border-blue-100">
                      {item.category}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-bold text-[#1d1d1f] leading-snug">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-blue-50 text-[#0071e3]" : "bg-[#f5f5f7] text-[#86868b]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-sm text-[#6e6e73] font-normal leading-relaxed border-t border-black/[0.04] pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
