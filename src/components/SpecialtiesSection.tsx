"use client";

import { motion } from "motion/react";
import { Heart, Sparkles, ArrowRight, Cake, Gift, Crown, Flower2 } from "lucide-react";

interface SpecialtiesSectionProps {
  onSelectCategory: (category: string) => void;
}

export function SpecialtiesSection({ onSelectCategory }: SpecialtiesSectionProps) {
  const specialties = [
    {
      id: "wedding",
      title: "Wedding Cakes",
      subtitle: "Multi-tier elegant masterpieces for your holy union",
      icon: Crown,
      badge: "Couture Tiers",
      accent: "bg-rose-50 text-rose-700 border-rose-200",
      buttonFilter: "wedding"
    },
    {
      id: "birthday",
      title: "Birthday Cakes",
      subtitle: "From whimsical cartoon themes to chic butterfly glam",
      icon: Cake,
      badge: "Theme Cakes",
      accent: "bg-pink-50 text-pink-700 border-pink-200",
      buttonFilter: "birthday"
    },
    {
      id: "anniversary",
      title: "Anniversary Cakes",
      subtitle: "Celebrate your love journey with romantic ruffles & hearts",
      icon: Heart,
      badge: "Sweet Romance",
      accent: "bg-red-50 text-red-700 border-red-200",
      buttonFilter: "anniversary"
    },
    {
      id: "event",
      title: "Event Cakes",
      subtitle: "Milestone corporate banquets, graduations & family feasts",
      icon: Sparkles,
      badge: "Grand Moments",
      accent: "bg-amber-50 text-amber-700 border-amber-200",
      buttonFilter: "event"
    },
    {
      id: "bridal",
      title: "Bridal Shower Cakes",
      subtitle: "Tuxedo 'Groom to be' & bridal floral celebration designs",
      icon: Flower2,
      badge: "Pre-Wedding",
      accent: "bg-purple-50 text-purple-700 border-purple-200",
      buttonFilter: "event"
    },
    {
      id: "bento",
      title: "Bento, Mini & Cupcakes",
      subtitle: "Cute takeaway bento boxes, floral cupcake boxes & cake jars",
      icon: Gift,
      badge: "Everyday Sweetness",
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
      buttonFilter: "bento"
    },
  ];

  return (
    <section id="specialties" className="py-14 sm:py-20 bg-[#fff9f3] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Our Core Specialties
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight mb-2.5 sm:mb-3">
            What Would You Like Us to{" "}
            <span className="font-cursive text-rose-600 font-bold italic">
              Bake For You?
            </span>
          </h2>
          <p className="text-rose-900/75 text-xs sm:text-base">
            Every creation is completely customizable in size, flavor sponge, frosting style, and theme inscriptions.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {specialties.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectCategory(item.buttonFilter)}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-[0_4px_20px_rgba(244,114,182,0.08)] hover:shadow-[0_12px_30px_rgba(244,114,182,0.16)] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 group-hover:bg-rose-100 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.accent}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-rose-950 group-hover:text-rose-600 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-rose-800/80 leading-relaxed mb-4">
                    {item.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(item.buttonFilter);
                  }}
                  className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:text-rose-700 transition-colors w-full cursor-pointer"
                >
                  <span>Browse {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
