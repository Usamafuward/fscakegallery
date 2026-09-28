"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Heart, Menu, X, MessageCircle, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

interface NavbarProps {
  onOpenOrder: () => void;
}

export function Navbar({ onOpenOrder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Specialties", href: "#specialties" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact & Delivery", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-[0_4px_20px_rgba(244,114,182,0.12)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-rose-300 shadow-[0_4px_12px_rgba(244,114,182,0.25)] transition-transform duration-300 group-hover:scale-105 bg-rose-50 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="FS Cake Gallery Logo"
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-heading text-sm sm:text-base lg:text-lg font-bold tracking-wide text-rose-950 group-hover:text-rose-600 transition-colors truncate">
                FS CAKE GALLERY
              </span>
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
            </div>
            <span className="font-cursive text-xs sm:text-sm text-rose-500 font-semibold tracking-wide truncate">
              Special cake for special day
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-rose-200/80 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-900/80 hover:text-rose-600 hover:bg-rose-50/80 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: Order on WhatsApp / Call */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-full border border-rose-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-mono">{CONTACT_INFO.phone1}</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenOrder}
            className="brush-btn-pink px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_4px_15px_rgba(225,29,72,0.3)] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Order Now
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle & Quick Order */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOrder}
            className="brush-btn-pink px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm cursor-pointer"
          >
            Order
          </motion.button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/90 border border-rose-200 text-rose-900 hover:bg-rose-50 transition-colors cursor-pointer touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-rose-100 bg-white/95 backdrop-blur-xl px-5 py-4 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-rose-900 hover:text-rose-600 py-2.5 px-3 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-rose-100 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hello%20FS%20Cake%20Gallery,%20I%20would%20like%20to%20order%20a%20cake!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp ({CONTACT_INFO.phone1})
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrder();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider brush-btn-pink text-white text-center shadow-sm cursor-pointer"
                >
                  Custom Order Form
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
