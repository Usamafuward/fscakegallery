"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, MessageCircle, Phone, Sparkles } from "lucide-react";
import { CakeItem, CONTACT_INFO } from "@/data/cakes";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCake: CakeItem | null;
}

export function OrderModal({ isOpen, onClose, selectedCake }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [cakeType, setCakeType] = useState("Custom Cake");
  const [flavor, setFlavor] = useState("Chocolate Fudge");
  const [location, setLocation] = useState("Hemmathagama");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (selectedCake) {
      setCakeType(selectedCake.name);
      setFlavor(selectedCake.flavorOptions[0] || "Chocolate Fudge");
      setNotes(`Interested in ordering the ${selectedCake.name} (${selectedCake.categoryLabel}).`);
    } else {
      setCakeType("Custom Cake");
    }
  }, [selectedCake]);

  if (!isOpen) return null;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello FS Cake Gallery! ♡%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Cake:* ${cakeType}%0A*Flavor:* ${flavor}%0A*Event Date:* ${date}%0A*Location:* ${location}%0A*Details / Inscription:* ${notes}%0A%0APlease let me know the pricing and confirmation.`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-auto border border-rose-200 max-h-[90dvh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            Special cake for special day
          </div>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-rose-950 mb-1">
            Order Your Homemade Cake
          </h3>
          <p className="text-xs text-rose-800/80 mb-4 sm:mb-5">
            Fill out the details below to immediately send your order request to our WhatsApp.
          </p>

          {/* Preselected Cake Banner */}
          {selectedCake && (
            <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0">
                <Image
                  src={selectedCake.image}
                  alt={selectedCake.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                  Selected Design
                </span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950 truncate">
                  {selectedCake.name}
                </h4>
              </div>
            </div>
          )}

          <form onSubmit={handleSendOrder} className="space-y-3 sm:space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="077xxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                  Event Date
                </label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                  Delivery Area
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500"
                >
                  <option value="Hemmathagama">Hemmathagama</option>
                  <option value="Thalgaspitiya">Thalgaspitiya</option>
                  <option value="Nearby Area">Nearby Area</option>
                  <option value="Self Pickup">Self Pickup</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                Preferred Flavor
              </label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500"
              >
                <option value="Chocolate Fudge">Chocolate Fudge</option>
                <option value="Vanilla Ribbon">Classic Vanilla Ribbon</option>
                <option value="Strawberry Shortcake">Strawberry Shortcake</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Coffee Mocha">Coffee Mocha</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                Custom Message / Theme Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Inscription text, color theme, size preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-101"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit Order on WhatsApp</span>
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-center gap-4 text-xs text-rose-800">
            <span>Or call us directly:</span>
            <a href={`tel:${CONTACT_INFO.phone1}`} className="font-bold text-rose-600 underline">
              {CONTACT_INFO.phone1}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
