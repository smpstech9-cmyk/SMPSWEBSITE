"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileImage,
  RefreshCw,
  Link as LinkIcon,
  HardDrive,
} from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  helperText?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Upload Image from System",
  className = "",
  helperText = "PNG, JPG, WebP, SVG up to 10MB. Files are saved and recorded in the database.",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setLastUploadedName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image file");
      }

      // Propagate the new uploaded URL (e.g., /uploads/filename.jpg)
      onChange(data.url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
    // Reset input value so same file can be re-selected if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleClear = () => {
    onChange("");
    setUploadError(null);
    setLastUploadedName(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="text-[10px] text-[#0071e3] hover:underline flex items-center gap-1 font-medium"
          >
            <LinkIcon className="w-3 h-3" />
            {showManualUrl ? "Switch to File Picker" : "Enter Direct URL/Path"}
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onInputChange}
        className="hidden"
      />

      {/* Manual URL Input Mode */}
      {showManualUrl ? (
        <div className="space-y-1.5 animate-in fade-in-50 duration-200">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /uploads/image.jpg or https://..."
            className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5ea] text-xs font-mono text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
          />
          <p className="text-[10px] text-[#86868b]">
            Manual path or CDN URL currently configured.
          </p>
        </div>
      ) : (
        /* Visual Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
            isDragging
              ? "border-[#0071e3] bg-blue-50/50 scale-[1.01]"
              : "border-[#e5e5ea] hover:border-[#0071e3]/60 bg-[#fbfbfd]"
          }`}
        >
          {/* If there's an image configured */}
          {value ? (
            <div className="p-3">
              <div className="flex items-center gap-3">
                {/* Thumbnail Preview */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-[#e5e5ea]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Active Image Synced</span>
                  </div>

                  <p className="text-[11px] font-mono text-[#6e6e73] truncate" title={value}>
                    {lastUploadedName || value}
                  </p>

                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0071e3] text-[11px] font-semibold transition inline-flex items-center gap-1"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          <span>Replace Image</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1 text-[#86868b] hover:text-rose-600 transition rounded-md hover:bg-rose-50"
                      title="Clear image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State: Upload Prompt */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/[0.01] transition"
            >
              {isUploading ? (
                <div className="py-2 space-y-2 flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
                  <p className="text-xs font-semibold text-[#1d1d1f]">
                    Saving to server & registering in database...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0071e3] flex items-center justify-center mb-2 shadow-xs">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-[#1d1d1f]">
                    Click to browse or drag & drop from your computer
                  </p>
                  <p className="text-[11px] text-[#86868b] mt-0.5 max-w-xs font-normal">
                    {helperText}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Upload Error Banner */}
          {uploadError && (
            <div className="p-2.5 bg-rose-50 border-t border-rose-200 text-rose-700 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">{uploadError}</span>
              <button
                type="button"
                onClick={() => setUploadError(null)}
                className="text-xs hover:underline font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
