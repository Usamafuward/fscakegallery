"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, MapPin, Bike } from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: () => void;
}

export function PosterModal({ isOpen, onClose, onOrderNow }: PosterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-auto max-h-[90dvh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="relative w-full flex-1 min-h-[280px] max-h-[65dvh] aspect-[3/4] bg-rose-50">
            <Image
              src="/images/poster.jpg"
              alt="FS Cake Gallery Official Poster"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 90vw, 600px"
              priority
            />
          </div>

          <div className="p-3.5 sm:p-4 bg-[#fff9f3] border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="text-xs text-rose-900">
              <span className="font-bold block">FS Cake Gallery Official Promo</span>
              <span className="text-[11px] text-rose-600">Hemmathagama &amp; Thalgaspitiya</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOrderNow();
              }}
              className="brush-btn-pink w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              Order from this Poster
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
