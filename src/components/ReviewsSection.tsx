"use client";

import { motion, AnimatePresence } from "motion/react";
import { Star, Heart, Quote, Cake } from "lucide-react";

interface ReviewsSectionProps {
  onOrderNow?: () => void;
}

export interface ReviewItem {
  id: string;
  name: string;
  cakeOrdered: string;
  rating: number;
  date: string;
  comment: string;
  avatarColor: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Fathima Rizna",
    cakeOrdered: "Lavender Butterfly Dream Cake",
    rating: 5,
    date: "3 days ago",
    comment:
      "Ordered the butterfly theme cake for my daughter's 7th birthday. It looked even more magical in person than the photos! The vanilla sponge was whisper-soft and the Swiss butter icing was light, silky, and not overly sweet. Every guest asked where we ordered it!",
    avatarColor: "from-pink-400 to-rose-500",
  },
  {
    id: "review-5",
    name: "Zahra Farook",
    cakeOrdered: "Pastel Berry Celebration Cake",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "I sent a customized Pinterest design idea via WhatsApp just 2 days before the birthday, and FS Cake Gallery brought it to life with perfection. 100% homemade authentic flavor. Will definitely order again!",
    avatarColor: "from-fuchsia-400 to-pink-500",
  },
  {
    id: "review-6",
    name: "Rizwan Mohamed",
    cakeOrdered: "Blush Rose Piped Cupcake Box",
    rating: 5,
    date: "1 month ago",
    comment:
      "Ordered a 12-piece floral rosette cupcake gift box for a family tea party. Each cupcake looked like a real flower bouquet! Soft, moist, and delightfully aromatic. Everyone in our family was thoroughly impressed.",
    avatarColor: "from-rose-500 to-amber-400",
  },
];

export function ReviewsSection({ onOrderNow: _onOrderNow }: ReviewsSectionProps) {
  return (
    <section
      id="reviews"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#fff9f4] to-[#fffcf8] relative scroll-mt-16 overflow-hidden"
    >
      {/* Decorative Pastel Ambient Blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Sweet Customer Love</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight leading-tight mb-2 sm:mb-2.5">
            Loved by Our{" "}
            <span className="font-cursive text-rose-600 font-bold italic">
              Happy Celebrators
            </span>
          </h2>

          <p className="text-rose-900/75 text-xs sm:text-base leading-relaxed">
            Every celebration cake is baked fresh from scratch with love. Read what our happy customers have to say about their special moments ♡.
          </p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {REVIEWS.map((rev, idx) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-100/90 hover:border-rose-300 shadow-[0_4px_20px_rgba(244,114,182,0.08)] hover:shadow-[0_12px_30px_rgba(244,114,182,0.15)] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Stars + Date */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      {rev.date}
                    </span>
                  </div>

                  {/* Cake Tag */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200/70 text-[11px] font-semibold mb-3">
                    <Cake className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate">{rev.cakeOrdered}</span>
                  </div>

                  {/* Review Text */}
                  <div className="relative mb-4">
                    <Quote className="w-5 h-5 text-rose-200 absolute -top-2 -left-1 pointer-events-none opacity-60" />
                    <p className="text-xs sm:text-[13px] text-rose-950/85 leading-relaxed pl-4 font-normal italic">
                      “{rev.comment}”
                    </p>
                  </div>
                </div>

                {/* Bottom Customer Info */}
                <div className="pt-3.5 border-t border-rose-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-tr ${rev.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {rev.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950 truncate">
                        {rev.name}
                      </h4>
                      <p className="text-[10px] text-rose-600 font-medium truncate">
                        Verified Order ♡
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
