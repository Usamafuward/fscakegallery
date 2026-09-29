"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CakeScrollShowcase } from "@/components/CakeScrollShowcase";
import { MobileCakeShowcase } from "@/components/MobileCakeShowcase";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AboutSection } from "@/components/AboutSection";
import { SpecialtiesSection } from "@/components/SpecialtiesSection";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { OrderModal } from "@/components/OrderModal";
import { PosterModal } from "@/components/PosterModal";
import { Footer } from "@/components/Footer";
import { CakeItem } from "@/data/cakes";

export default function Home() {
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");

  const handleOpenOrder = (cake?: CakeItem) => {
    setSelectedCake(cake || null);
    setIsOrderOpen(true);
  };

  const handleSelectSpecialty = (category: string) => {
    setGalleryFilter(category);
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fffcf8] text-[#4a1525] flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Silky Smooth Inertia Scrolling */}
      <SmoothScroll />

      {/* Sticky Navigation */}
      <Navbar onOpenOrder={() => handleOpenOrder()} />

      <main className="flex-1">
        {/* 1. Desktop: Interactive Frame-by-Frame Cake Crafting Scroll Showcase */}
        <CakeScrollShowcase
          onOrderNow={() => handleOpenOrder()}
          onViewPoster={() => setIsPosterOpen(true)}
        />

        {/* 1b. Mobile: Clean Hero Section + Step-by-Step Auto Video Process (No Scroll Hijack) */}
        <MobileCakeShowcase
          onOrderNow={() => handleOpenOrder()}
          onViewPoster={() => setIsPosterOpen(true)}
        />

        {/* 2. About Section: Made with love, for your sweet moments ♡ */}
        <AboutSection />

        {/* 3. Core Specialties from Poster (Wedding, Birthday, Anniversary, Event, Bridal, Bento & Cupcakes) */}
        <SpecialtiesSection onSelectCategory={handleSelectSpecialty} />

        {/* 4. Filterable Cake Gallery Showcase */}
        <GallerySection
          activeFilter={galleryFilter}
          onFilterChange={(cat) => setGalleryFilter(cat)}
          onSelectCake={(cake) => handleOpenOrder(cake)}
        />

        {/* 5. Customer Testimonials & Reviews */}
        <ReviewsSection onOrderNow={() => handleOpenOrder()} />

        {/* 6. Contact Section & Direct WhatsApp Order Generator */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Order Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        selectedCake={selectedCake}
      />

      {/* Official Poster Lightbox Modal */}
      <PosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
        onOrderNow={() => {
          setIsPosterOpen(false);
          handleOpenOrder();
        }}
      />
    </div>
  );
}
