"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

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
    <div className="relative w-full group">
      {/* 1. Ambient Blurred Neon Underglow in Background */}
      <div className="absolute -inset-2.5 sm:-inset-3.5 rounded-[30px] sm:rounded-[36px] overflow-hidden blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
        <div className="absolute inset-[-150%] animate-neon-run bg-[conic-gradient(from_0deg,transparent_0deg_240deg,#0071e3_280deg,#06b6d4_320deg,#10b981_350deg,#ffffff_360deg)]" />
      </div>

      {/* 2. Razor-Sharp Perimeter Neon Light Runner */}
      <div className="relative w-full aspect-video rounded-[24px] sm:rounded-[28px] p-[2px] overflow-hidden shadow-2xl bg-black/40">
        <div className="absolute inset-[-150%] animate-neon-run bg-[conic-gradient(from_0deg,transparent_0deg_240deg,#0071e3_280deg,#06b6d4_320deg,#10b981_350deg,#ffffff_360deg)] pointer-events-none" />

        {/* 3. Pure Video Container */}
        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-black">
          <video
            ref={videoRef}
            src="/logos/videos/video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover cursor-pointer block border-0 outline-none"
            onClick={togglePlay}
          >
            <source src="/logos/videos/video.mp4" type="video/mp4" />
            <source src="/videos/video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video streaming.
          </video>

          {/* Floating Video Controls */}
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md border-0"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md border-0"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
