"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import {
  FullSiteContent,
  INITIAL_SITE_CONTENT,
  loadSiteContent,
  saveSiteContent,
  resetSiteContentToDefault,
  fetchSiteContentFromDatabase,
  saveSiteContentToDatabase,
  STORAGE_KEY,
} from "@/lib/cms-store";

interface ContentContextValue {
  content: FullSiteContent;
  updateContent: (updater: (prev: FullSiteContent) => FullSiteContent) => void;
  updateSection: <K extends keyof FullSiteContent>(section: K, value: FullSiteContent[K]) => void;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastSavedAt: string | null;
}

const ContentContext = createContext<ContentContextValue>({
  content: INITIAL_SITE_CONTENT,
  updateContent: () => {},
  updateSection: () => {},
  resetToDefaults: () => {},
  isSaving: false,
  lastSavedAt: null,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<FullSiteContent>(INITIAL_SITE_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // 1. Initial instant load from localStorage
    const localContent = loadSiteContent();
    setContent(localContent);

    // 2. Fetch authoritative data from Database API
    fetchSiteContentFromDatabase().then((dbContent) => {
      if (dbContent) {
        startTransition(() => {
          setContent(dbContent);
        });
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbContent));
        }
      } else {
        // If database is empty, seed it with initial authentic content
        saveSiteContentToDatabase(localContent).catch(console.error);
      }
    });

    // 3. Sync across tabs/windows
    const handleUpdate = () => {
      startTransition(() => {
        setContent(loadSiteContent());
      });
    };

    window.addEventListener("smps-cms-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("smps-cms-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateContent = (updater: (prev: FullSiteContent) => FullSiteContent) => {
    setIsSaving(true);
    setContent((prev) => {
      const next = updater(prev);
      saveSiteContent(next); // Saves to localStorage, triggers smps-cms-updated, and calls database API
      return next;
    });
    setLastSavedAt(new Date().toLocaleTimeString());
    setTimeout(() => setIsSaving(false), 400);
  };

  const updateSection = <K extends keyof FullSiteContent>(section: K, value: FullSiteContent[K]) => {
    updateContent((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const resetToDefaults = () => {
    const fresh = resetSiteContentToDefault();
    setContent(fresh);
    setLastSavedAt(new Date().toLocaleTimeString());
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateSection,
        resetToDefaults,
        isSaving,
        lastSavedAt,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a ContentProvider");
  }
  return ctx;
}
