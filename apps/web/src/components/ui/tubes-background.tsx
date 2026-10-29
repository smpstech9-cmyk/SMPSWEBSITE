"use client";

import React, { useEffect, useRef, useState } from "react";

// Helper for generating random hex colors
export const randomHexColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className = "",
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesAppRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Native dynamic import bypassed from compile-time bundler to load the official effect
        const dynamicImport = new Function("url", "return import(url)");
        const module = await dynamicImport(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#0071e3", "#059669", "#8b5cf6"], // Electric blue, neon emerald, tech purple
            lights: {
              intensity: 220,
              colors: ["#38bdf8", "#34d399", "#f43f5e", "#a855f7"],
            },
          },
        });

        tubesAppRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          if (app && typeof app.resize === "function") {
            try {
              app.resize();
            } catch (e) {
              // ignore
            }
          }
        };

        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);
          if (app && typeof app.destroy === "function") {
            try {
              app.destroy();
            } catch (e) {
              // ignore
            }
          }
          tubesAppRef.current = null;
        };
      } catch (error) {
        console.warn("TubesCursor primary CDN load; activating high-performance interactive fallback:", error);
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const resizeCanvas = () => {
          width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
          height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);

        // Smooth interactive neon ribbon trails
        const trail: { x: number; y: number; age: number; color: string; radius: number }[] = [];
        let mouseX = width / 2;
        let mouseY = height / 2;
        let targetX = mouseX;
        let targetY = mouseY;
        const neonPalette = ["#0071e3", "#059669", "#8b5cf6", "#38bdf8", "#ec4899", "#10b981"];

        const onMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          targetX = e.clientX - rect.left;
          targetY = e.clientY - rect.top;
        };
        window.addEventListener("mousemove", onMouseMove);

        const renderFallback = () => {
          mouseX += (targetX - mouseX) * 0.12;
          mouseY += (targetY - mouseY) * 0.12;

          trail.push({
            x: mouseX,
            y: mouseY,
            age: 0,
            color: neonPalette[Math.floor(Math.random() * neonPalette.length)],
            radius: Math.random() * 8 + 4,
          });

          if (trail.length > 60) trail.shift();

          ctx.fillStyle = "rgba(10, 10, 15, 0.22)";
          ctx.fillRect(0, 0, width, height);

          // Render glowing neon curve
          for (let i = 1; i < trail.length; i++) {
            const p1 = trail[i - 1];
            const p2 = trail[i];
            p1.age++;

            const alpha = Math.max(0, 1 - p1.age / 60);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p2.color;
            ctx.lineWidth = p2.radius * alpha * 2.5;
            ctx.lineCap = "round";
            ctx.shadowBlur = 24;
            ctx.shadowColor = p2.color;
            ctx.globalAlpha = alpha;
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;

          animId = requestAnimationFrame(renderFallback);
        };

        animId = requestAnimationFrame(renderFallback);

        cleanup = () => {
          window.removeEventListener("resize", resizeCanvas);
          window.removeEventListener("mousemove", onMouseMove);
          cancelAnimationFrame(animId);
        };
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction) return;

    if (tubesAppRef.current && tubesAppRef.current.tubes) {
      const colors = randomHexColors(3);
      const lightsColors = randomHexColors(4);
      try {
        tubesAppRef.current.tubes.setColors(colors);
        tubesAppRef.current.tubes.setLightsColors(lightsColors);
      } catch (err) {
        // fallback
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#07070a] text-white ${className}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
        style={{ touchAction: "none" }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;

