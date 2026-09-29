"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  ShoppingBag,
  Phone,
  ChevronDown,
  Layers,
  Palette,
  Award,
  Play,
  Pause,
  RotateCcw,
  MessageCircle,
  Bike,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

interface MobileCakeShowcaseProps {
  onOrderNow: () => void;
  onViewPoster: () => void;
}

const CRAFTING_STEPS = [
  {
    step: 1,
    time: 0.8,
    timeRange: [0.0, 2.4],
    badge: "Crumb & Berry Compote",
    title: "Golden Chiffon & Real Berry Confit",
    quote: "“Whisper-soft sponge, baked fresh every morning”",
    description:
      "Our foundation begins with whisper-soft vanilla chiffon sponge soaked in fruit nectar. Each golden tier is generously filled with freshly simmered strawberry compote.",
    color: "from-amber-600 via-amber-500 to-amber-600",
    icon: Layers,
    label: "Crumb & Confit",
  },
  {
    step: 2,
    time: 2.5,
    timeRange: [2.4, 3.9],
    badge: "Silk Velvet Buttercream",
    title: "Hand-Whipped Silky Buttercream",
    quote: "“Porcelain-smooth finish in custom pastel tints”",
    description:
      "Whipped in small batches until feather-light. Our Swiss meringue buttercream recipe is uniquely balanced — delicate, cloud-soft, and never overly sweet.",
    color: "from-pink-500 via-rose-400 to-pink-500",
    icon: Palette,
    label: "Silk Buttercream",
  },
  {
    step: 3,
    time: 4.0,
    timeRange: [3.9, 5.05],
    badge: "Couture Embellishment & Drips",
    title: "Pastel Ganache Drips & Rosettes",
    quote: "“Artistic details tailored to your dream celebration”",
    description:
      "Cascading glossy pastel drips poured along each edge, crowned with delicately piped buttercream rosettes, swirl peaks, and shimmering sugar pearls.",
    color: "from-purple-600 via-fuchsia-500 to-purple-600",
    icon: Sparkles,
    label: "Couture Drips",
  },
  {
    step: 4,
    time: 5.1,
    timeRange: [5.05, 6.0],
    badge: "The Masterpiece • Ready For You",
    title: "FS Signature Butterfly Celebration Cake",
    quote: "“Made with love, for your sweet moments ♡”",
    description:
      "Adorned with delicate edible 3D flutter butterflies, golden pearls, and pastel blooms. Hand-crafted fresh upon order for your most cherished celebration.",
    color: "from-rose-500 to-pink-500",
    icon: Award,
    label: "Masterpiece",
  },
];

export function MobileCakeShowcase({
  onOrderNow,
  onViewPoster,
}: MobileCakeShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepProgress, setStepProgress] = useState(0);

  // Configure video playback rate and sync time with steps
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Gracefully slow down the 6-second video to 0.6x speed (~10s cycle)
    // so mobile viewers have ample time to appreciate each handcrafted step
    video.playbackRate = 0.6;

    const handleTimeUpdate = () => {
      const t = video.currentTime;

      // Determine active step index
      const idx = CRAFTING_STEPS.findIndex(
        (s) => t >= s.timeRange[0] && t < s.timeRange[1]
      );
      const currentIdx = idx === -1 ? (t >= 5.05 ? 3 : 0) : idx;
      setActiveStep(currentIdx);

      // Compute progress inside current step
      const step = CRAFTING_STEPS[currentIdx];
      const range = step.timeRange[1] - step.timeRange[0];
      const elapsed = Math.max(0, t - step.timeRange[0]);
      setStepProgress(Math.min(1, elapsed / range));
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Initial autoplay attempt
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Fallback auto-step timer if video is paused (e.g., iOS Low Power Mode)
  useEffect(() => {
    if (isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CRAFTING_STEPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Jump to specific step
  const handleSelectStep = useCallback((idx: number) => {
    setActiveStep(idx);
    const video = videoRef.current;
    if (video) {
      video.currentTime = CRAFTING_STEPS[idx].time;
      video.play().catch(() => {});
    }
  }, []);

  // Toggle Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const scrollToSteps = () => {
    const el = document.getElementById("mobile-crafting-steps");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentStepData = CRAFTING_STEPS[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="lg:hidden w-full flex flex-col select-none">
      {/* ============================================================ */}
      {/* 1. MOBILE HERO SECTION (Natural height, no scroll hijack)    */}
      {/* ============================================================ */}
      <section
        id="hero-mobile"
        className="relative w-full bg-gradient-to-b from-[#efe3cc] via-[#f1e0cb] to-[#f2e5d2] pt-24 pb-14 px-4 sm:px-5 overflow-hidden text-rose-950"
      >
        {/* Ambient lighting glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
          {/* Floating Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-xs text-xs font-semibold text-rose-800 mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>Homemade in Hemmathagama &amp; Thalgaspitiya</span>
          </div>

          {/* Logo Display */}
          <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-200 to-rose-300 shadow-[0_8px_25px_rgba(244,114,182,0.35)] mb-3.5">
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
          <span className="font-cursive text-2xl text-rose-600 font-bold tracking-wide drop-shadow-xs mb-1">
            Special cake for special day
          </span>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight leading-tight mb-3">
            FS CAKE GALLERY
          </h1>

          {/* Subtitle */}
          <p className="text-rose-900/80 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed font-medium">
            Homemade custom cakes baked fresh with love in Hemmathagama &amp; Thalgaspitiya. 
            Celebrating your birthdays, weddings, anniversaries, and sweet everyday moments ♡.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto mb-5">
            <button
              onClick={onOrderNow}
              className="flex-1 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-xs shadow-[0_8px_20px_rgba(225,29,72,0.35)] active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Order Custom Cake</span>
            </button>

            <button
              onClick={onViewPoster}
              className="flex-1 px-3.5 py-2.5 rounded-full bg-white/95 hover:bg-white text-rose-900 border border-rose-200 font-semibold text-xs shadow-xs active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Official Poster</span>
            </button>
          </div>

          {/* Location & Delivery Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-[11px]">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-rose-200 text-rose-800 font-medium">
              <MapPin className="w-3 h-3 text-rose-600 shrink-0" />
              <span>Hemmathagama &amp; Thalgaspitiya</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 font-medium">
              <Bike className="w-3 h-3 text-rose-600 shrink-0" />
              <span>Delivery available 🛵</span>
            </div>
          </div>

          {/* Featured Cake Preview Card */}
          <div className="relative w-full max-w-xs rounded-2xl p-2.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_10px_30px_rgba(74,21,37,0.08)] mb-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#f1e0cb]">
              <Image
                src="/cake-frames/ezgif-frame-180.webp"
                alt="FS Cake Gallery Signature Cake"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 320px, 400px"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-rose-700 shadow-2xs">
                ✨ Handcrafted Masterpiece
              </div>
            </div>
          </div>

          {/* Prompt to see step-by-step crafting video below */}
          <button
            onClick={scrollToSteps}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 shadow-xs text-xs font-semibold text-rose-700 hover:text-rose-900 active:scale-95 transition-all"
          >
            <span>Watch How We Craft Your Cake (Steps 1–4)</span>
            <ChevronDown className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STEPS 1-4 CRAFTING SECTION (Video/Gif Auto Assembly)       */}
      {/* ============================================================ */}
      <section
        id="mobile-crafting-steps"
        className="relative w-full bg-[#eee1d1] py-14 sm:py-20 px-4 sm:px-5 border-t border-rose-200/70 text-rose-950 overflow-hidden"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Artisan Crafting Process</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-stone-950 tracking-tight leading-tight mb-2 sm:mb-2.5">
              How We Craft Your Dream Cake
            </h2>
            <p className="text-stone-700 text-xs sm:text-base max-w-md mx-auto leading-relaxed">
              Watch our bakers build your celebration cake layer by layer. The video automatically progresses through Steps 1 to 4!
            </p>
          </div>

          {/* Video Showcase Card */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden border-2 border-rose-200/90 shadow-[0_12px_35px_rgba(74,21,37,0.12)] bg-[#efe3cc] mb-4 sm:mb-5">
            <video
              ref={videoRef}
              src="/videos/cake-assembly.mp4"
              poster="/cake-frames/ezgif-frame-180.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />

            {/* Bottom Play/Pause Controller Overlay */}
            <div className="absolute bottom-3 right-3 z-10">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/90 text-stone-900 hover:text-rose-600 flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                title={isPlaying ? "Pause Video" : "Play Video"}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>
            </div>

            {/* 4-Segment Modern Video Progress Bar */}
            <div className="absolute top-0 left-0 right-0 p-2.5 flex items-center gap-1.5">
              {CRAFTING_STEPS.map((step, idx) => {
                let fill = 0;
                if (idx < activeStep) fill = 100;
                else if (idx === activeStep) fill = stepProgress * 100;
                else fill = 0;

                return (
                  <button
                    key={step.step}
                    onClick={() => handleSelectStep(idx)}
                    className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                    title={`Jump to Step ${step.step}: ${step.label}`}
                  >
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-150"
                      style={{ width: `${fill}%` }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Information Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full p-5 rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_30px_rgba(74,21,37,0.08)] flex flex-col gap-2.5 text-left"
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-gradient-to-r ${currentStepData.color} text-white text-[11px] font-bold uppercase tracking-wider shadow-2xs`}
              >
                <StepIcon className="w-3.5 h-3.5" />
                <span>{currentStepData.badge}</span>
              </div>

              {/* Title & Cursive Quote */}
              <div>
                <h3 className="text-xl font-heading font-extrabold text-stone-950 tracking-tight leading-snug">
                  {currentStepData.title}
                </h3>
                <p className="font-cursive text-base text-rose-600 font-bold mt-0.5">
                  {currentStepData.quote}
                </p>
              </div>

              {/* Description */}
              <p className="text-stone-700 text-xs leading-relaxed">
                {currentStepData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
