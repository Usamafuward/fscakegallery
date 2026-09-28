"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, ShoppingBag, Heart, Users, Check, RotateCcw } from "lucide-react";
import { CAKES, CATEGORIES, CakeItem } from "@/data/cakes";

interface GallerySectionProps {
  onSelectCake: (cake: CakeItem) => void;
  activeFilter?: string;
  onFilterChange?: (category: string) => void;
}

function CakeImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => {
        setImgSrc("https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80");
      }}
    />
  );
}

export function GallerySection({ 
  onSelectCake, 
  activeFilter = "all",
  onFilterChange 
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState(activeFilter);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Synchronize when activeFilter changes from outside (e.g. from SpecialtiesSection)
  useEffect(() => {
    if (activeFilter) {
      setSelectedCategory(activeFilter);
    }
  }, [activeFilter]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onFilterChange?.(categoryId);
  };

  const filteredCakes = CAKES.filter((cake) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "bento") {
      return cake.category === "bento" || cake.category === "cupcakes";
    }
    return cake.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white relative scroll-mt-16">

      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Delicious Creations Gallery
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight mb-2">
            Sample Custom{" "}
            <span className="font-cursive text-rose-600 font-bold italic">
              Cake Showcase
            </span>
          </h2>
          <p className="text-rose-900/75 text-xs sm:text-base">
            Every cake is baked with love and customized with your favorite sponge, flavor fillings, and theme inscriptions.
          </p>
        </div>

        {/* Filter Categories Bar with rounded pastel pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-rose-600 text-white shadow-[0_4px_15px_rgba(225,29,72,0.35)] scale-102"
                    : "bg-rose-50/80 text-rose-800 hover:bg-rose-100 border border-rose-200/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Badge and Quick Reset */}
        {selectedCategory !== "all" && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <span>Showing:</span>
              <strong className="text-rose-950 font-bold">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}
              </strong>
              <span className="text-rose-500 font-mono">({filteredCakes.length})</span>
            </div>
            <button
              onClick={() => handleCategorySelect("all")}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 border border-rose-200 text-[11px] font-semibold text-rose-700 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3 h-3 text-rose-500" />
              <span>Show All Cakes</span>
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredCakes.map((cake, idx) => (
              <motion.article
                key={cake.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-[0_4px_20px_rgba(244,114,182,0.1)] hover:shadow-[0_15px_35px_rgba(244,114,182,0.2)] transition-all p-3.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Cake Image Box */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-rose-50 mb-4">
                    <CakeImage
                      src={cake.image}
                      alt={`FS Cake Gallery - ${cake.name} (${cake.categoryLabel})`}
                    />



                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Category Tag Top Left */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 text-[10px] font-bold text-rose-700 shadow-xs">
                      {cake.categoryLabel}
                    </span>

                    {/* Full Preview Zoom Button */}
                    <button
                      onClick={() => setPreviewImage(cake.image)}
                      className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 text-rose-800 hover:bg-rose-600 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md"
                      title="Enlarge Photo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cake Information */}
                  <div className="px-1">
                    <div className="flex items-center gap-2 text-[11px] text-rose-600 font-semibold mb-1">
                      <Users className="w-3.5 h-3.5 text-rose-500" />
                      <span>{cake.serving}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-rose-950 mb-1 group-hover:text-rose-600 transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-xs text-rose-800/80 leading-relaxed line-clamp-2 mb-3">
                      {cake.description}
                    </p>

                    {/* Flavor Pills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cake.flavorOptions.slice(0, 3).map((flavor) => (
                        <span
                          key={flavor}
                          className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-100 text-[10px] text-rose-700 font-medium"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-3 border-t border-rose-50 flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Freshly Baked
                  </span>

                  <button
                    onClick={() => onSelectCake(cake)}
                    className="brush-btn-pink px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Design</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick Note at Bottom */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-6 rounded-3xl bg-[#fff7f0] border border-rose-200/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-rose-950">
              Have a specific photo or theme in mind?
            </h4>
            <p className="text-xs text-rose-800/80">
              Send us your reference photo on WhatsApp for a custom quote!
            </p>
          </div>
          <a
            href="https://wa.me/94778108824?text=Hello%20FS%20Cake%20Gallery,%20I%20have%20a%20custom%20cake%20photo%20I%20would%20like%20to%20bake!"
            target="_blank"
            rel="noopener noreferrer"
            className="brush-btn-pink w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-sm text-center"
          >
            Send Photo on WhatsApp
          </a>
        </div>
      </div>

      {/* Full Photo Modal Lightbox */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden p-2.5 sm:p-3 shadow-2xl max-h-[90dvh] flex flex-col my-auto"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                ✕
              </button>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-rose-50">
                <Image
                  src={previewImage}
                  alt="FS Cake Gallery - Handcrafted Custom Cake Preview"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
