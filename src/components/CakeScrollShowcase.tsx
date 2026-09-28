"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  Sparkles,
  Phone,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Layers,
  Palette,
  CheckCircle2,
  Bike,
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

  // Smooth lerp state
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Smooth progress state for continuous UI transitions
  const [smoothProgress, setSmoothProgress] = useState(0);

  // Responsive drawing logic with letterbox prevention and responsive side-by-side positioning
  const drawFrame = useCallback((frameIdx: number, progress: number = currentProgressRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find the closest loaded image if this exact frame is still buffering
    let img = imagesRef.current[frameIdx];
    if (!img) {
      for (let offset = 1; offset < 30; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]) {
          img = imagesRef.current[frameIdx + offset];
          break;
        }
      }
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
    bgGradient.addColorStop(0, "#f3e7d7");
    bgGradient.addColorStop(0.5, "#eadcca");
    bgGradient.addColorStop(1, "#ede1d1");
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

      // Seamless extension: Extend the actual photo cyclorama left & right edges across any exposed horizontal canvas
      if (drawX > 0) {
        ctx.drawImage(img, 0, 0, 4, imgH, 0, 0, drawX + 1, canvas.height);
      }
      if (drawX + drawW < canvas.width) {
        ctx.drawImage(img, imgW - 4, 0, 4, imgH, drawX + drawW - 1, 0, canvas.width - (drawX + drawW) + 2, canvas.height);
      }

      // Draw the cake frame
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // On mobile, if the photo does not reach the bottom, softly melt the bottom edge into the studio background
      if (!isDesktop && drawY + drawH < canvas.height) {
        const fadeH = Math.min(24, drawH * 0.08);
        const gBottom = ctx.createLinearGradient(0, drawY + drawH - fadeH, 0, drawY + drawH);
        gBottom.addColorStop(0, "rgba(237, 225, 209, 0)");
        gBottom.addColorStop(1, "#ede1d1");
        ctx.fillStyle = gBottom;
        ctx.fillRect(0, drawY + drawH - fadeH, canvas.width, fadeH + 1);
      }
    }
  }, []);

  // Preload frames logic with async off-thread decoding and controlled batching
  useEffect(() => {
    let isMounted = true;
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    const loadFrame = async (idx: number) => {
      const img = new window.Image();
      const frameStr = String(idx + 1).padStart(3, "0");
      img.src = `/cake-frames/ezgif-frame-${frameStr}.png`;
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch {
        // Fallback for older decoders
      }
      if (!isMounted) return;
      images[idx] = img;
      if (idx === 0) {
        drawFrame(0, 0);
      }
    };

    // 1. Immediately load frame 1
    loadFrame(0);

    // 2. Load sequence: first 25 frames immediately, then batches of 4
    const loadSequence = async () => {
      for (let i = 1; i < Math.min(25, TOTAL_FRAMES); i++) {
        if (!isMounted) return;
        await loadFrame(i);
      }

      for (let i = 25; i < TOTAL_FRAMES; i += 4) {
        if (!isMounted) return;
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + 4, TOTAL_FRAMES); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }
    };

    loadSequence();

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
            className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 pb-20 sm:pt-28 sm:pb-24 max-w-6xl mx-auto px-5 transition-none"
          >
            {/* Center-Top Header */}
            <div
              style={{ pointerEvents: opacity0 > 0.3 ? "auto" : "none" }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              {/* Floating Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 shadow-sm text-xs sm:text-sm font-semibold text-rose-800 mb-3">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span>Homemade in Hemmathagama &amp; Thalgaspitiya</span>
              </div>

              {/* Logo Display */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-200 to-rose-300 shadow-[0_8px_25px_rgba(244,114,182,0.35)] mb-3">
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
              <span className="font-cursive text-2xl sm:text-3xl lg:text-4xl text-rose-600 font-bold tracking-wide drop-shadow-sm mb-1">
                Special cake for special day
              </span>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-rose-950 tracking-tight leading-[1.1] mb-3">
                FS CAKE GALLERY
              </h1>

              <p className="text-rose-900/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-5 leading-relaxed font-medium">
                Watch our bakers craft your dream celebration cake layer by layer. 
                Scroll down to witness the sweet transformation from sponge to masterpiece.
              </p>

              {/* Top Action Suite */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOrderNow}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_12px_28px_rgba(225,29,72,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Custom Cake</span>
                </button>

                <button
                  onClick={onViewPoster}
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/90 hover:bg-white text-rose-900 border border-rose-200/90 font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-rose-500" />
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
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-sm text-xs sm:text-sm font-semibold text-rose-700 animate-bounce">
                <ChevronDown className="w-4 h-4 text-rose-500" />
                <span>Scroll down to watch the cake build</span>
              </div>
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
            className="absolute left-5 right-5 lg:left-5 lg:right-auto w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[51%] lg:-translate-y-1/2 flex flex-col gap-3 sm:gap-3.5 lg:gap-4 pointer-events-none transition-none"
          >
            {/* Badge (No stage number) */}
            <div style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>Crumb &amp; Berry Compote</span>
              </div>
            </div>

            {/* Headline & Cursive Subtitle */}
            <div style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.12] mb-1 drop-shadow-2xs">
                Golden Chiffon &amp; Real Berry Confit
              </h2>
              <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                “Whisper-soft sponge, baked fresh every morning”
              </p>
            </div>

            {/* Artisan Description */}
            <p
              style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}
              className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal"
            >
              Our foundation begins with whisper-soft vanilla chiffon sponge soaked in fruit nectar. Each golden tier is generously filled with freshly simmered strawberry compote.
            </p>

            {/* Feature Highlights */}
            <div
              style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}
              className="grid grid-cols-2 gap-2.5"
            >
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-950 mb-0.5">
                  <span className="text-base">🧈</span>
                  <span>Pure Dairy Butter</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  100% dairy butter for a tender, velvety moist crumb.
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-950 mb-0.5">
                  <span className="text-base">🍓</span>
                  <span>Real Strawberry</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  Slow-reduced compote with zero artificial additives.
                </p>
              </div>
            </div>

            {/* Artisan Recipe Details */}
            <div
              style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}
              className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/10 border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Sponge: Vanilla Chiffon • Moist Chocolate • Ribbon Velvet</span>
            </div>

            {/* Delivery & Trust Details */}
            <div
              style={{ pointerEvents: opacity1 > 0.3 ? "auto" : "none" }}
              className="pt-2.5 border-t border-stone-900/10 text-xs text-stone-700 font-medium"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>100% Baked From Scratch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{CONTACT_INFO.phone1}</span>
                </div>
                <div className="col-span-2 text-[11px] text-stone-600 pt-0.5">
                  <span>📍 Freshly Baked in Hemmathagama &amp; Thalgaspitiya</span>
                </div>
              </div>
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
            className="absolute left-5 right-5 lg:left-5 lg:right-auto w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[51%] lg:-translate-y-1/2 flex flex-col gap-3 sm:gap-3.5 lg:gap-4 pointer-events-none transition-none"
          >
            {/* Badge (No stage number) */}
            <div style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                <Palette className="w-3.5 h-3.5" />
                <span>Silk Velvet Buttercream</span>
              </div>
            </div>

            {/* Headline & Cursive Subtitle */}
            <div style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.12] mb-1 drop-shadow-2xs">
                Hand-Whipped Silky Buttercream
              </h2>
              <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                “Porcelain-smooth finish in custom pastel tints”
              </p>
            </div>

            {/* Artisan Description */}
            <p
              style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}
              className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal"
            >
              Whipped in small batches until feather-light. Our Swiss meringue buttercream recipe is uniquely balanced — delicate, cloud-soft, and never overly sweet.
            </p>

            {/* Feature Highlights */}
            <div
              style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}
              className="grid grid-cols-2 gap-2.5"
            >
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-pink-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-950 mb-0.5">
                  <span className="text-base">☁️</span>
                  <span>Cloud-Light Silk</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  Subtle &amp; balanced, highlighting natural fresh aromas.
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-pink-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-950 mb-0.5">
                  <span className="text-base">🎨</span>
                  <span>Custom Pastel Tints</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  Tailored pastel palettes to match your celebration colors.
                </p>
              </div>
            </div>

            {/* Artisan Technique Details */}
            <div
              style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}
              className="p-2.5 sm:p-3 rounded-2xl bg-pink-500/10 border border-pink-200/60 text-xs sm:text-sm text-rose-950 font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Themes: Blossom Pink • Lavender Lilac • Sage Green • Baby Blue</span>
            </div>

            {/* Delivery & Trust Details */}
            <div
              style={{ pointerEvents: opacity2 > 0.3 ? "auto" : "none" }}
              className="pt-2.5 border-t border-stone-900/10 text-xs text-stone-700 font-medium"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>Smooth Razor Edges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>{CONTACT_INFO.phone1}</span>
                </div>
                <div className="col-span-2 text-[11px] text-stone-600 pt-0.5">
                  <span>📍 Freshly Baked in Hemmathagama &amp; Thalgaspitiya</span>
                </div>
              </div>
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
            className="absolute left-5 right-5 lg:left-5 lg:right-auto w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[51%] lg:-translate-y-1/2 flex flex-col gap-3 sm:gap-3.5 lg:gap-4 pointer-events-none transition-none"
          >
            {/* Badge (No stage number) */}
            <div style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Couture Embellishment &amp; Drips</span>
              </div>
            </div>

            {/* Headline & Cursive Subtitle */}
            <div style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.12] mb-1 drop-shadow-2xs">
                Pastel Ganache Drips &amp; Rosettes
              </h2>
              <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                “Artistic details tailored to your dream celebration”
              </p>
            </div>

            {/* Artisan Description */}
            <p
              style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}
              className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal"
            >
              Cascading glossy pastel drips poured along each edge, crowned with delicately piped buttercream rosettes, swirl peaks, and shimmering sugar pearls.
            </p>

            {/* Feature Highlights */}
            <div
              style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}
              className="grid grid-cols-2 gap-2.5"
            >
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-purple-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-950 mb-0.5">
                  <span className="text-base">✨</span>
                  <span>Glossy Ganache Drips</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  Silky white chocolate ganache cascading down tier edges.
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-purple-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-950 mb-0.5">
                  <span className="text-base">👑</span>
                  <span>Piped Floral Swirls</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug">
                  French star-piped rosettes, swirl peaks, and pearls.
                </p>
              </div>
            </div>

            {/* Celebration Occasions Suite */}
            <div
              style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}
              className="p-2.5 sm:p-3 rounded-2xl bg-purple-500/10 border border-purple-200/60 flex flex-wrap items-center gap-1.5 text-xs text-purple-950 font-bold"
            >
              <span className="flex items-center gap-1 text-xs text-purple-900 font-semibold mr-1">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                <span>Themes:</span>
              </span>
              {["Weddings", "Birthdays", "Anniversaries", "Bridal Showers"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white/80 text-purple-950 border border-purple-200/80 text-[11px] shadow-2xs"
                >
                  ♡ {tag}
                </span>
              ))}
            </div>

            {/* Delivery & Trust Details */}
            <div
              style={{ pointerEvents: opacity3 > 0.3 ? "auto" : "none" }}
              className="pt-2.5 border-t border-stone-900/10 text-xs text-stone-700 font-medium"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Personalized Toppers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{CONTACT_INFO.phone1}</span>
                </div>
                <div className="col-span-2 text-[11px] text-stone-600 pt-0.5">
                  <span>📍 Freshly Baked in Hemmathagama &amp; Thalgaspitiya</span>
                </div>
              </div>
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
            className="absolute left-5 right-5 lg:left-5 lg:right-auto w-auto lg:w-[460px] xl:w-[490px] top-[48%] -translate-y-0 lg:top-[51%] lg:-translate-y-1/2 flex flex-col gap-3 sm:gap-3.5 lg:gap-4 pointer-events-none transition-none"
          >
            {/* Badge */}
            <div style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>The Masterpiece • Ready For Your Special Day</span>
              </div>
            </div>

            {/* Headline & Cursive Subtitle */}
            <div style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-extrabold text-stone-950 tracking-tight leading-[1.12] mb-1 drop-shadow-2xs">
                FS Signature Butterfly Celebration Cake
              </h2>
              <p className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                “Made with love, for your sweet moments ♡”
              </p>
            </div>

            {/* Artisan Description */}
            <p
              style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}
              className="text-stone-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal"
            >
              Adorned with delicate edible 3D flutter butterflies, golden pearls, and pastel blooms. Hand-crafted upon order for your most cherished celebration.
            </p>

            {/* Primary Action Suite */}
            <div
              style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}
              className="flex flex-col gap-2 pt-1"
            >
              <button
                onClick={onOrderNow}
                className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-sm shadow-[0_8px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_12px_28px_rgba(225,29,72,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order This Custom Cake</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    "Hello FS Cake Gallery! I saw the animated Butterfly Celebration Cake on your website and would love to customize an order."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Baker</span>
                </a>

                <button
                  onClick={scrollToNextSection}
                  className="px-3.5 py-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-stone-300 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs hover:scale-[1.02]"
                >
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>
            </div>

            {/* Delivery & Trust Details */}
            <div
              style={{ pointerEvents: opacity4 > 0.3 ? "auto" : "none" }}
              className="pt-2.5 border-t border-stone-900/10 text-xs text-stone-700 font-medium"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Doorstep Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{CONTACT_INFO.phone1}</span>
                </div>
                <div className="col-span-2 text-[11px] text-stone-600 pt-0.5">
                  <span>📍 Freshly Baked in Hemmathagama &amp; Thalgaspitiya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
