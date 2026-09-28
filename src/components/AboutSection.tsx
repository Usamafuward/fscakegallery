"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Sparkles, Check, Cake, Bike, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

export function AboutSection() {
  const brandPillars = [
    {
      title: "100% Homemade With Love",
      desc: "Every cake is freshly baked from scratch using wholesome ingredients, rich butter, and pure extracts — no artificial shortcuts.",
      icon: Heart,
    },
    {
      title: "Customized To Your Imagination",
      desc: "Whether it's a cartoon character, vintage lambeth piping, floral elegance, or bespoke toppers, we bring your vision to life.",
      icon: Sparkles,
    },
    {
      title: "For All Your Sweet Moments",
      desc: "Birthdays, romantic weddings, joyful anniversaries, bridal showers, baby milestones, or cute weekend bento treats.",
      icon: Cake,
    },
    {
      title: "Local Delivery Available",
      desc: "Carefully packaged and safely hand-delivered across Hemmathagama, Thalgaspitiya, and surrounding towns.",
      icon: Bike,
    },
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Pastel Background Circles */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Story / Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[340px] md:max-w-full lg:max-w-[340px] aspect-square rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 shadow-[0_15px_40px_rgba(244,114,182,0.18)] flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md mb-3 sm:mb-4 bg-white">
                <Image
                  src="/images/logo.jpg"
                  alt="FS Cake Gallery Logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 140px, 150px"
                />
              </div>

              <h3 className="font-heading font-bold text-lg sm:text-xl text-rose-950 mb-1">
                FS CAKE GALLERY
              </h3>
              <p className="font-cursive text-lg sm:text-xl text-rose-600 font-bold mb-2 sm:mb-3">
                “Made with love, for your sweet moments ♡”
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-medium text-rose-800 border border-rose-200 shadow-xs">
                <span>📍 Hemmathagama &amp; Thalgaspitiya</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story &amp; Passion
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight leading-tight mb-4">
              Baking happiness into every{" "}
              <span className="font-cursive text-rose-600 font-bold italic">
                cherished celebration
              </span>
            </h2>

            <p className="text-rose-900/80 text-sm sm:text-base leading-relaxed mb-8">
              At <strong>FS Cake Gallery</strong>, we believe every special day deserves an equally special cake. 
              What began as a heartfelt passion for homemade confectionery has grown into a beloved local cake studio in 
              Hemmathagama and Thalgaspitiya. We hand-craft custom cakes for birthdays, weddings, anniversaries, bridal showers, 
              and memorable events — with fluffy moist cake sponges, velvety frostings, and delicate artistic designs.
            </p>

            {/* 4 Feature Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brandPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-2xl bg-[#fffbf7] border border-rose-100 hover:border-rose-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-rose-950">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-rose-800/80 leading-relaxed pl-10">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
