"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowUpRight,
} from "lucide-react";

export function HeroVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle browser autoplay policy restrictions gracefully
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[32px] border border-[#e5e5ea] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-stretch">
        
        {/* LEFT BRANDING COLUMN */}
        <div className="w-full md:w-[44%] flex flex-col justify-between space-y-4 sm:space-y-5">
          {/* Top: SMPS Tech Lab Logo */}
          <div className="pt-1">
            <Image
              src="/logos/SMPS.png"
              alt="SMPS Tech Lab - Engineering Intelligent Power"
              width={180}
              height={55}
              priority
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Middle: Industry Fitness & Value Proposition */}
          <div className="space-y-3.5 my-auto">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] tracking-wider block uppercase">
                INDUSTRY – FITNESS
              </span>
              <h3 className="text-xs sm:text-[13px] font-black text-[#1d1d1f] tracking-tight leading-snug uppercase mt-0.5">
                INTERNSHIP | DEEP TECH |<br />
                CORE ENGINEERING |<br />
                INNOVATION–DRIVEN
              </h3>
            </div>

            <p className="text-[10px] sm:text-[11px] font-bold text-[#b8860b] tracking-wider uppercase">
              FROM CAMPUS TO CORE TECH
            </p>

            {/* Golden 80% Practical / 20% Theory Badge Box */}
            <div className="border-2 border-[#b8860b] rounded-lg p-2.5 sm:p-3 inline-block bg-[#b8860b]/[0.02]">
              <div className="flex items-baseline gap-1.5 text-[#b8860b]">
                <span className="text-2xl sm:text-3xl font-black leading-none">80%</span>
                <span className="text-xs sm:text-[13px] font-extrabold text-[#1d1d1f] tracking-wide uppercase">
                  PRACTICAL
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 text-[#b8860b] mt-1 pt-1 border-t border-[#b8860b]/20">
                <span className="text-2xl sm:text-3xl font-black leading-none">20%</span>
                <span className="text-xs sm:text-[13px] font-extrabold text-[#b8860b] tracking-wide uppercase">
                  THEORY
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Link to Internships */}
          <div className="flex items-center justify-end pt-1">
            <Link
              href="/internships"
              className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#0071e3] text-[#1d1d1f] hover:text-[#0071e3] hover:bg-blue-50/50 flex items-center justify-center transition-all duration-200 group"
              aria-label="Explore VTU Internships"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* RIGHT VIDEO & AFFILIATION COLUMN */}
        <div className="w-full md:w-[56%] flex flex-col justify-between">
          {/* Top Header: Partner Logos & Video Controls */}
          <div className="flex items-center justify-between pb-2.5 px-0.5 gap-2 border-b border-gray-100 mb-2.5">
            {/* Logos Strip */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
              <Image
                src="/logos/GOVT/Govt1.png"
                alt="Ministry of Communications"
                width={80}
                height={26}
                priority
                className="h-5 sm:h-6 w-auto object-contain shrink-0"
              />
              <span className="w-px h-4 bg-gray-200 shrink-0" />
              <Image
                src="/logos/GOVT/Govt3.png"
                alt="TCOE India"
                width={26}
                height={26}
                priority
                className="h-5 sm:h-6 w-auto object-contain shrink-0"
              />
              <span className="w-px h-4 bg-gray-200 shrink-0" />
              <Image
                src="/logos/collaboration/coll2.png"
                alt="VTU Emblem"
                width={26}
                height={26}
                priority
                className="h-5 sm:h-6 w-auto object-contain shrink-0"
              />
              <span className="w-px h-4 bg-gray-200 shrink-0" />
              <Image
                src="/logos/SMPSele.png"
                alt="SMPS"
                width={60}
                height={24}
                priority
                className="h-4 sm:h-5 w-auto object-contain shrink-0"
              />
            </div>

            {/* Video Controls: Audio & Play/Pause */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={toggleMute}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1d1d1f]/80 hover:bg-[#1d1d1f] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                )}
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1d1d1f]/80 hover:bg-[#1d1d1f] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Video Player Frame with Subtitle Overlay */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black shadow-inner group">
            <video
              ref={videoRef}
              src="/logos/videos/video.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Text Overlay matching Image 2 */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white text-[10px] sm:text-[11px] leading-snug font-medium text-center pointer-events-none">
              Collaborating ideas with future oriented minds by{" "}
              <span className="text-[#ff6b35] font-bold">Dr. Ajith Padyana</span> at Program Director at VTU-VRIF-TCOE at{" "}
              <span className="text-[#ff6b35] font-bold">SMPS TECH LAB</span>
            </div>
          </div>

          {/* Subtle Footer Copyright */}
          <div className="text-[9px] sm:text-[10px] text-gray-400 text-center pt-2 select-none">
            © 2026 SMPS Group. All rights reserved.
          </div>
        </div>

      </div>
    </div>
  );
}

