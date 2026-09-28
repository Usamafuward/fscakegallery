"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Sparkles, Phone, MessageCircle, ShoppingBag, MapPin, Bike, ArrowRight } from "lucide-react";
import { CONTACT_INFO, CAKES } from "@/data/cakes";

interface HeroSectionProps {
  onOrderNow: () => void;
  onViewPoster: () => void;
}

export function HeroSection({ onOrderNow, onViewPoster }: HeroSectionProps) {
  const heroCake = CAKES[0];
  const bentoCake = CAKES.find((c) => c.category === "bento") || CAKES[6];
  const cupcakeItem = CAKES.find((c) => c.category === "cupcakes") || CAKES[7];
  const weddingCake = CAKES.find((c) => c.category === "wedding") || CAKES[2];

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4.5rem)] lg:min-h-screen flex items-center pt-24 pb-8 lg:pt-16 lg:pb-6 overflow-hidden bg-gradient-to-b from-[#fff7f0] via-[#fff1f5] to-[#fffcf8]">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating mini heart accents */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-24 left-8 sm:left-16 text-rose-300 pointer-events-none hidden sm:block"
      >
        <Heart className="w-5 h-5 fill-rose-200 text-rose-300" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 left-1/3 text-pink-300 pointer-events-none hidden sm:block"
      >
        <Sparkles className="w-4 h-4 text-rose-400" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-5 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Top Brand Logo Display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-2.5 sm:mb-3 lg:mb-3.5"
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-200 to-rose-300 shadow-[0_8px_20px_rgba(244,114,182,0.3)] animate-gentle-float">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-rose-50">
                  <Image
                    src="/images/logo.jpg"
                    alt="FS Cake Gallery Logo"
                    fill
                    className="object-cover"
                    priority
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Little cute badge */}
              <div className="absolute -bottom-1 -right-2 bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-sm flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                <span className="text-[9px] font-bold text-rose-900 tracking-wider uppercase">
                  Homemade
                </span>
              </div>
            </motion.div>

            {/* Cursive Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-1"
            >
              <span className="font-cursive text-lg sm:text-2xl lg:text-2xl text-rose-600 font-bold tracking-wide">
                Special cake for special day
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-rose-950 tracking-tight leading-[1.1] mb-2"
            >
              FS CAKE GALLERY
            </motion.h1>

            {/* Sub-tagline from poster */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-2 mb-2.5 sm:mb-3"
            >
              <div className="h-[1px] w-5 bg-rose-300 hidden sm:block" />
              <p className="font-cursive text-base sm:text-xl text-rose-700 italic">
                Made with love, for your sweet moments ♡
              </p>
              <div className="h-[1px] w-5 bg-rose-300 hidden sm:block" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-rose-900/80 text-xs sm:text-sm leading-relaxed max-w-lg mb-4"
            >
              Handcrafted homemade cakes made fresh to order in <strong>Hemmathagama &amp; Thalgaspitiya</strong>. 
              From whimsical birthday themes and elegant wedding tiers to cute Korean bento boxes and gourmet floral cupcakes.
            </motion.p>

            {/* Action Buttons: Order Now + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 w-full sm:w-auto"
            >
              {/* Primary Call to action */}
              <button
                onClick={onOrderNow}
                className="brush-btn-pink w-full sm:w-auto px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER NOW</span>
              </button>

              {/* Direct WhatsApp Call */}
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hello%20FS%20Cake%20Gallery,%20I%20would%20like%20to%20order%20a%20special%20cake!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp ({CONTACT_INFO.phone1})</span>
              </a>

              {/* Call Button */}
              <a
                href={`tel:${CONTACT_INFO.phone2}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white hover:bg-rose-50 text-rose-900 border border-rose-200 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>{CONTACT_INFO.phone2}</span>
              </a>
            </motion.div>

            {/* Delivery & Location Highlights matching the Poster */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-4 pt-3.5 border-t border-rose-200/70 w-full flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-900 border border-rose-200 text-xs">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span><strong>Hemmathagama &amp; Thalgaspitiya</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 text-rose-900 border border-pink-200 font-semibold text-xs">
                <Bike className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Delivery available 🛵</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Poster Inspiration Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            {/* Interactive Cake Showcase Card */}
            <div className="relative w-full max-w-[310px] sm:max-w-[330px] lg:max-w-[340px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white/90 border border-rose-200/90 shadow-[0_15px_40px_rgba(244,114,182,0.2)] backdrop-blur-md">
              {/* Featured Cake Image */}
              <div className="relative h-[240px] sm:h-[260px] lg:h-[285px] rounded-xl sm:rounded-2xl overflow-hidden bg-rose-50">
                <Image
                  src={heroCake.image}
                  alt={heroCake.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 340px"
                />

                {/* Soft gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-transparent" />

                {/* Top Corner Floating Pills */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 text-[10px] font-bold text-rose-700 shadow-sm">
                    ✨ Customer Favorite
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono">
                    Custom Theme
                  </span>
                </div>

                {/* Bottom details inside the image */}
                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-rose-100 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950 truncate">
                        {heroCake.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-rose-600/90 font-cursive truncate">
                        Special cake for special day ♡
                      </p>
                    </div>
                    <button
                      onClick={onOrderNow}
                      className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-rose-500 hover:bg-rose-600 text-white transition-colors shrink-0 shadow-sm cursor-pointer"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Mini thumbnails preview below the card */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="relative h-14 sm:h-16 rounded-lg overflow-hidden border border-rose-100 bg-rose-50 cursor-pointer hover:border-rose-400 transition-colors">
                  <Image
                    src={bentoCake.image}
                    alt={bentoCake.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[8px] sm:text-[9px] font-bold text-center bg-white/90 rounded text-rose-900 py-0.5">
                    Bento
                  </div>
                </div>
                <div className="relative h-14 sm:h-16 rounded-lg overflow-hidden border border-rose-100 bg-rose-50 cursor-pointer hover:border-rose-400 transition-colors">
                  <Image
                    src={cupcakeItem.image}
                    alt={cupcakeItem.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[8px] sm:text-[9px] font-bold text-center bg-white/90 rounded text-rose-900 py-0.5">
                    Cupcakes
                  </div>
                </div>
                <div className="relative h-14 sm:h-16 rounded-lg overflow-hidden border border-rose-100 bg-rose-50 cursor-pointer hover:border-rose-400 transition-colors">
                  <Image
                    src={weddingCake.image}
                    alt={weddingCake.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[8px] sm:text-[9px] font-bold text-center bg-white/90 rounded text-rose-900 py-0.5">
                    Wedding
                  </div>
                </div>
              </div>

              {/* Button to view the full official poster */}
              <button
                onClick={onViewPoster}
                className="w-full mt-2 py-1.5 rounded-lg text-center text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Official FS Cake Poster</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
