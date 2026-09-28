"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  Sparkles,
  Phone,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Layers,
  Palette,
  Award,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

interface CakeScrollShowcaseProps {
  onOrderNow: () => void;
  onViewPoster: () => void;
}

const TOTAL_FRAMES = 180;

// Smoothstep interpolation
function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Compute stage opacity with smooth S-curves
function getStageOpacity(
  p: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
): number {
  if (p < inStart || p > outEnd) return 0;
  if (p >= inEnd && p <= outStart) return 1;
  if (p < inEnd) return smoothStep(inStart, inEnd, p);
  return 1 - smoothStep(outStart, outEnd, p);
}

export function CakeScrollShowcase({
  onOrderNow,
  onViewPoster,
}: CakeScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  // Smooth lerp state
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Smooth progress state for continuous UI transitions
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  // Responsive drawing logic with letterbox prevention and responsive side-by-side positioning
  const drawFrame = useCallback((frameIdx: number, progress: number = currentProgressRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Resilient fallback: find the closest loaded image across the ENTIRE sequence
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestDist = Infinity;
      let bestImg: HTMLImageElement | null = null;
      const total = imagesRef.current.length;
      for (let i = 0; i < total; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIdx);
          if (dist < closestDist) {
            closestDist = dist;
            bestImg = candidate;
            if (dist === 0) break;
          }
        }
      }
      // Never clear to blank if we already have drawn an image or found a nearest keyframe
      img = bestImg || lastDrawnImgRef.current;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      lastDrawnImgRef.current = img;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.floor(rect.width * dpr);
    const displayHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    // Studio background gradient matching the photoshoot cyclorama paper exactly
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, "#efe3cc");
    bgGradient.addColorStop(0.5, "#f1e0cb");
    bgGradient.addColorStop(1, "#f2e5d2");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const canvasRatio = canvas.width / canvas.height;

      const isDesktop = rect.width >= 1024;
      const shiftRatio = smoothStep(0.12, 0.22, progress);

      // 1. FIRST SECTION (Stage 0): Same size full background photo cover/contain
      let heroW: number;
      let heroH: number;
      let heroX: number;
      let heroY: number;

      if (isDesktop) {
        if (canvasRatio > imgRatio) {
          heroW = canvas.width;
          heroH = canvas.width / imgRatio;
          heroX = 0;
          heroY = (canvas.height - heroH) / 2;
        } else {
          heroH = canvas.height;
          heroW = canvas.height * imgRatio;
          heroX = (canvas.width - heroW) / 2;
          heroY = 0;
        }
      } else {
        // Mobile & Tablet: Plate width scaled proportionally (responsive for both small mobile and medium tablets)
        // Plate source width = 804, center = 979, top rim = 590, pedestal = 1005
        const targetPlateW = canvas.width < 640
          ? Math.max(canvas.width * 1.15, 430)
          : Math.max(canvas.width * 0.95, 540);
        const heroS = targetPlateW / 804;
        heroW = imgW * heroS;
        heroH = imgH * heroS;
        heroX = (canvas.width / 2) - (979 * heroS);
        // Position plate top rim right at ~55.5% of canvas height so buttons sit directly on top of the plate
        const plateTopTargetY = Math.max(375, canvas.height * 0.555);
        heroY = plateTopTargetY - (590 * heroS);
      }

      // 2. AFTER THAT: Transition & fit smoothly to the side
      // Cake bounding box inside 1920x1080 source image:
      const cakeW = 1103;
      const cakeH = 1063;
      const cakeCX = 993.5;
      const cakeCY = 547.5;

      let sideX: number, sideY: number, sideW: number, sideH: number;

      if (isDesktop) {
        // Desktop: Photo is full viewport height so there are NEVER top or bottom gaps or cutoffs
        sideH = canvas.height;
        const sideS = sideH / imgH; // 1:1 proportional to canvas height
        sideW = imgW * sideS;
        sideY = 0;

        // Position the cake in the right column
        const scaledCakeW = cakeW * sideS;
        const scaledCakeCX = cakeCX * sideS;

        // The left column sits inside the main max-w-6xl (1152px) layout
        const layoutLeft = Math.max(16, (canvas.width - 1152) / 2 + 20);
        const cardWidth = canvas.width >= 1280 ? 490 : 450;
        const cardRightEdge = layoutLeft + cardWidth;

        // Target cake center around 71% of screen width, ensuring clear room from left card and right screen edge
        const rightMargin = Math.max(16, canvas.width * 0.02);
        const maxCakeCX = canvas.width - (scaledCakeW * 0.5) - rightMargin;
        const minCakeCX = cardRightEdge + 20 + (scaledCakeW * 0.5);
        const targetCakeCX = Math.min(maxCakeCX, Math.max(minCakeCX, canvas.width * 0.71));

        sideX = targetCakeCX - scaledCakeCX;
      } else {
        // Mobile: Sits in the upper portion
        const sideMaxW = canvas.width * 0.88;
        const sideMaxH = canvas.height * 0.38;
        const sideS = Math.min(sideMaxW / cakeW, sideMaxH / cakeH);
        sideW = imgW * sideS;
        sideH = imgH * sideS;
        const sideCX = canvas.width * 0.50;
        const sideCY = canvas.height * 0.28;
        sideX = sideCX - (cakeCX * sideS);
        sideY = sideCY - (cakeCY * sideS);
      }

      // Smooth interpolation: Full size in first section -> glides to side afterwards
      const drawX = heroX + (sideX - heroX) * shiftRatio;
      const drawY = heroY + (sideY - heroY) * shiftRatio;
      const drawW = heroW + (sideW - heroW) * shiftRatio;
      const drawH = heroH + (sideH - heroH) * shiftRatio;

      // Seamless extension: Extend the actual photo cyclorama across any exposed canvas
      // Top edge extension (column-aligned with drawX and drawW so horizontal lighting matches perfectly with 0 difference)
      if (drawY > 0) {
        ctx.drawImage(img, 0, 0, imgW, 4, drawX, 0, drawW, drawY + 1);
      }
      // Bottom edge extension (column-aligned with drawX and drawW)
      if (drawY + drawH < canvas.height) {
        ctx.drawImage(img, 0, imgH - 4, imgW, 4, drawX, drawY + drawH - 1, drawW, canvas.height - (drawY + drawH) + 2);
      }
      // Left edge extension
      if (drawX > 0) {
        ctx.drawImage(img, 0, 0, 4, imgH, 0, 0, drawX + 1, canvas.height);
      }
      // Right edge extension
      if (drawX + drawW < canvas.width) {
        ctx.drawImage(img, imgW - 4, 0, 4, imgH, drawX + drawW - 1, 0, canvas.width - (drawX + drawW) + 2, canvas.height);
      }
      // 4 Corner extensions for full edge coverage when both horizontal and vertical margins are exposed:
      if (drawX > 0 && drawY > 0) {
        ctx.drawImage(img, 0, 0, 4, 4, 0, 0, drawX + 1, drawY + 1);
      }
      if (drawX + drawW < canvas.width && drawY > 0) {
        ctx.drawImage(img, imgW - 4, 0, 4, 4, drawX + drawW - 1, 0, canvas.width - (drawX + drawW) + 2, drawY + 1);
      }
      if (drawX > 0 && drawY + drawH < canvas.height) {
        ctx.drawImage(img, 0, imgH - 4, 4, 4, 0, drawY + drawH - 1, drawX + 1, canvas.height - (drawY + drawH) + 2);
      }
      if (drawX + drawW < canvas.width && drawY + drawH < canvas.height) {
        ctx.drawImage(img, imgW - 4, imgH - 4, 4, 4, drawX + drawW - 1, drawY + drawH - 1, canvas.width - (drawX + drawW) + 2, canvas.height - (drawY + drawH) + 2);
      }

      // Draw the cake frame
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, []);

  // Preload frames logic: WebP format with 3-tier loading (Frame 0 -> Keyframes -> Parallel Worker Pool)
  useEffect(() => {
    let isMounted = true;
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    let loadedCount = 0;

    const loadFrame = async (idx: number): Promise<HTMLImageElement | null> => {
      if (images[idx]) return images[idx];

      const img = new window.Image();
      const frameStr = String(idx + 1).padStart(3, "0");
      img.src = `/cake-frames/ezgif-frame-${frameStr}.webp`;

      try {
        if (img.decode) {
          await img.decode();
        } else {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
      } catch {
        // Fallback for decode errors
      }

      if (!isMounted) return null;
      images[idx] = img;
      loadedCount++;
      setLoadPercent((loadedCount / TOTAL_FRAMES) * 100);

      // If this is frame 0, render immediately
      if (idx === 0) {
        drawFrame(0, 0);
      }

      return img;
    };

    const runPreload = async () => {
      // Tier 1: Immediately fetch and render Frame 0 (< 50ms, ~14KB)
      await loadFrame(0);
      if (!isMounted) return;

      // Tier 2: Fetch 12 anchor keyframes across the timeline in parallel (< 300ms, ~350KB total)
      const keyframes = [14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 164, 179];
      await Promise.all(keyframes.map((k) => loadFrame(k)));
      if (!isMounted) return;

      // Anchor keyframes are ready: user can now scroll smoothly anywhere without any empty space!
      setIsInitialReady(true);

      // Re-draw current position with the closest keyframe
      const currentIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );
      drawFrame(currentIdx, currentProgressRef.current);

      // Tier 3: Fill in all remaining intermediate frames using a concurrent worker pool of 6
      const remaining: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!images[i]) {
          remaining.push(i);
        }
      }

      const CONCURRENCY = 6;
      let nextIndex = 0;

      const worker = async () => {
        while (nextIndex < remaining.length && isMounted) {
          const current = remaining[nextIndex++];
          await loadFrame(current);
        }
      };

      await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
    };

    runPreload();

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );
      drawFrame(frameIdx, currentProgressRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // High-performance scroll listener and RAF render loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (totalDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalDistance));
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let lastProgressUpdate = 0;

    const renderLoop = () => {
      // Fluid physics damping lerp
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.14;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(p * (TOTAL_FRAMES - 1)))
      );

      // Re-draw when frame index changes OR during transition glide range (0.10 to 0.25)
      const isInGlideRange = p >= 0.10 && p <= 0.25;
      if (frameIdx !== lastDrawnFrameRef.current || isInGlideRange) {
        drawFrame(frameIdx, p);
        lastDrawnFrameRef.current = frameIdx;
      }

      // Smooth progress update for stage UI interpolation
      if (Math.abs(p - lastProgressUpdate) > 0.001) {
        lastProgressUpdate = p;
        setSmoothProgress(p);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  const scrollToNextSection = () => {
    const el = document.getElementById("about") || document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProgress = (p: number) => {
    if (!containerRef.current) return;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + totalDistance * p;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Continuous stage opacity calculations with zero jank
  const opacity0 = getStageOpacity(smoothProgress, 0.0, 0.0, 0.13, 0.19);
  const opacity1 = getStageOpacity(smoothProgress, 0.16, 0.22, 0.38, 0.44);
  const opacity2 = getStageOpacity(smoothProgress, 0.41, 0.47, 0.63, 0.69);
  const opacity3 = getStageOpacity(smoothProgress, 0.66, 0.72, 0.83, 0.88);
  const opacity4 = getStageOpacity(smoothProgress, 0.85, 0.91, 1.0, 1.0);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#eee1d1] select-none"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* ============================================================ */}
        {/* STAGES CONTENT CONTAINER (Aligned with Site Layout max-w-6xl) */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-5 pointer-events-none">
          {/* ------------------------------------------------------------ */}
          {/* STAGE 0: THE BLANK STAND & BRAND HERO (Centered)            */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              opacity: opacity0,
              transform: `translateY(${(1 - opacity0) * -24}px)`,
              visibility: opacity0 > 0.005 ? "visible" : "hidden",
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 pb-6 sm:pt-28 sm:pb-24 max-w-6xl mx-auto px-4 sm:px-5 transition-none"
          >
            {/* Center-Top Header */}
            <div
              style={{ pointerEvents: opacity0 > 0.3 ? "auto" : "none" }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto w-full"
            >
              {/* Floating Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-sm text-xs sm:text-sm font-semibold text-rose-800 mb-5 sm:mb-4">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span>Homemade in Hemmathagama &amp; Thalgaspitiya</span>
              </div>

              {/* Logo Display */}
              <div className="relative w-20 h-20 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-200 to-rose-300 shadow-[0_8px_25px_rgba(244,114,182,0.35)] mb-4 sm:mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-rose-50">
                  <Image
                    src="/images/logo.jpg"
                    alt="FS Cake Gallery Logo"
                    fill
                    className="object-cover"
                    priority
                    sizes="80px"
                  />
                </div>
              </div>

              {/* Cursive Tagline */}
              <span className="font-cursive text-2xl sm:text-3xl lg:text-4xl text-rose-600 font-bold tracking-wide drop-shadow-sm mb-3 sm:mb-1">
                Special cake for special day
              </span>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-rose-950 tracking-tight leading-[1.1] mb-4 sm:mb-3.5">
                FS CAKE GALLERY
              </h1>

              <p className="text-rose-900/80 text-sm md:text-base max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed font-medium">
                Watch our bakers craft your dream celebration cake layer by layer.
                Scroll down to witness the sweet transformation from sponge to masterpiece.
              </p>

              {/* Top Action Suite - Sitting prominently on top of the plate */}
              <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-none mx-auto mt-1 sm:mt-0">
                <button
                  onClick={onOrderNow}
                  className="flex-1 sm:flex-none max-w-[175px] sm:max-w-none px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_10px_25px_rgba(225,29,72,0.4)] hover:shadow-[0_12px_28px_rgba(225,29,72,0.55)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>Order Custom Cake</span>
                </button>

                <button
                  onClick={onViewPoster}
                  className="flex-1 sm:flex-none max-w-[145px] sm:max-w-none px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/95 hover:bg-white text-rose-900 border border-rose-200/90 font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Official Poster</span>
                </button>

                <a
                  href={`tel:${CONTACT_INFO.phone1}`}
                  className="hidden sm:inline-flex px-4 py-2.5 sm:py-3 rounded-full bg-rose-50/90 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold text-xs sm:text-sm shadow-sm transition-all items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-600" />
                  <span>{CONTACT_INFO.phone1}</span>
                </a>
              </div>
            </div>

            {/* Bottom Gentle Scroll Prompt */}
            <div
              style={{ pointerEvents: opacity0 > 0.3 ? "auto" : "none" }}
              className="flex flex-col items-center text-center pb-1 sm:pb-0"
            >
              {!isInitialReady ? (
                <div className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 shadow-sm text-xs font-semibold text-rose-700">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                    <span>Preparing sweet cake animation...</span>
                  </div>
                  <div className="w-32 h-1 bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300"
                      style={{ width: `${Math.max(12, loadPercent)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/85 backdrop-blur-md border border-rose-200 shadow-sm text-xs sm:text-sm font-semibold text-rose-700 animate-bounce">
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
                  <span>Scroll down to watch the cake build</span>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* SIDE-BY-SIDE EDITORIAL STAGES (Balanced & Vertically Centered) */}
          {/* ============================================================ */}

          {/* ------------------------------------------------------------ */}
          {/* STAGE 1: SPONGE STACKING & BERRY CONFIT                      */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              opacity: opacity1,
              transform: `translateY(${(1 - opacity1) * 16}px)`,
              visibility: opacity1 > 0.005 ? "visible" : "hidden",
            }}
            className="absolute left-5 right-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[500px] lg:left-5 lg:right-auto lg:translate-x-0 w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[50%] lg:-translate-y-1/2 pointer-events-none transition-none"
          >
            <div
              style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_35px_rgba(74,21,37,0.08)] flex flex-col gap-2.5 sm:gap-3"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Crumb &amp; Berry Compote</span>
              </div>

              {/* Headline & Cursive Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-1">
                  Golden Chiffon &amp; Real Berry Confit
                </h2>
                <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                  “Whisper-soft sponge, baked fresh every morning”
                </p>
              </div>

              {/* Artisan Description */}
              <p className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                Our foundation begins with whisper-soft vanilla chiffon sponge soaked in fruit nectar. Each golden tier is generously filled with freshly simmered strawberry compote.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* STAGE 2: VELVET BUTTERCREAM & SCULPTING                      */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              opacity: opacity2,
              transform: `translateY(${(1 - opacity2) * 16}px)`,
              visibility: opacity2 > 0.005 ? "visible" : "hidden",
            }}
            className="absolute left-5 right-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[500px] lg:left-5 lg:right-auto lg:translate-x-0 w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[50%] lg:-translate-y-1/2 pointer-events-none transition-none"
          >
            <div
              style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_35px_rgba(74,21,37,0.08)] flex flex-col gap-2.5 sm:gap-3"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <Palette className="w-3.5 h-3.5" />
                <span>Silk Velvet Buttercream</span>
              </div>

              {/* Headline & Cursive Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-1">
                  Hand-Whipped Silky Buttercream
                </h2>
                <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                  “Porcelain-smooth finish in custom pastel tints”
                </p>
              </div>

              {/* Artisan Description */}
              <p className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                Whipped in small batches until feather-light. Our Swiss meringue buttercream recipe is uniquely balanced — delicate, cloud-soft, and never overly sweet.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* STAGE 3: COUTURE DRIPS & ROSETTES                            */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              opacity: opacity3,
              transform: `translateY(${(1 - opacity3) * 16}px)`,
              visibility: opacity3 > 0.005 ? "visible" : "hidden",
            }}
            className="absolute left-5 right-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[500px] lg:left-5 lg:right-auto lg:translate-x-0 w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[50%] lg:-translate-y-1/2 pointer-events-none transition-none"
          >
            <div
              style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_10px_35px_rgba(74,21,37,0.08)] flex flex-col gap-2.5 sm:gap-3"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Couture Embellishment &amp; Drips</span>
              </div>

              {/* Headline & Cursive Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-1">
                  Pastel Ganache Drips &amp; Rosettes
                </h2>
                <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                  “Artistic details tailored to your dream celebration”
                </p>
              </div>

              {/* Artisan Description */}
              <p className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                Cascading glossy pastel drips poured along each edge, crowned with delicately piped buttercream rosettes, swirl peaks, and shimmering sugar pearls.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* STAGE 4: GRAND FINALE SHOWPIECE & ORDERING                   */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              opacity: opacity4,
              transform: `translateY(${(1 - opacity4) * 16}px)`,
              visibility: opacity4 > 0.005 ? "visible" : "hidden",
            }}
            className="absolute left-5 right-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[500px] lg:left-5 lg:right-auto lg:translate-x-0 w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[50%] lg:-translate-y-1/2 pointer-events-none transition-none"
          >
            <div
              style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}
              className="p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_12px_40px_rgba(74,21,37,0.1)] flex flex-col gap-2.5 sm:gap-3.5"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>The Masterpiece • Ready For You</span>
              </div>

              {/* Headline & Cursive Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-1">
                  FS Signature Butterfly Celebration Cake
                </h2>
                <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                  “Made with love, for your sweet moments ♡”
                </p>
              </div>

              {/* Artisan Description */}
              <p className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                Adorned with delicate edible 3D flutter butterflies, golden pearls, and pastel blooms. Hand-crafted fresh upon order for your most cherished celebration.
              </p>

              {/* Primary Action Suite (2 Flex Buttons in One Line) */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 pt-1">
                <button
                  onClick={onOrderNow}
                  className="flex-1 min-w-0 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_12px_28px_rgba(225,29,72,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Order Custom Cake</span>
                </button>

                <button
                  onClick={scrollToNextSection}
                  className="flex-1 min-w-0 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-200/90 font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Background Buffering Pill (Non-blocking) */}
        {loadPercent > 0 && loadPercent < 98 && (
          <div className="absolute bottom-4 right-4 z-30 pointer-events-none transition-opacity duration-500 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-xs text-[11px] font-semibold text-rose-800">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
            <span>Buffering 3D view {Math.round(loadPercent)}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
