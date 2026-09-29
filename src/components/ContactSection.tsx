"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Bike, MessageCircle, Heart, Clock, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "@/data/cakes";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.38a6.34 6.34 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.74 4.54V11.3a8.28 8.28 0 0 0 5.85 2.39V10.2a4.84 4.84 0 0 1-3.77-3.51z"/>
    </svg>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cakeType: "Birthday Cake",
    date: "",
    flavor: "Chocolate Fudge",
    location: "Hemmathagama",
    message: "",
  });

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello FS Cake Gallery! ♡%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Cake Type:* ${formData.cakeType}%0A*Flavor:* ${formData.flavor}%0A*Event Date:* ${formData.date}%0A*Delivery Location:* ${formData.location}%0A*Custom Message/Design Notes:* ${formData.message || "Custom design request"}%0A%0AI would like to confirm my cake order.`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-gradient-to-b from-[#fffcf8] via-[#fff4f7] to-[#fff0f4] relative scroll-mt-16">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Get In Touch &amp; Order
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-rose-950 tracking-tight mb-2.5 sm:mb-3">
            Order Your{" "}
            <span className="font-cursive text-rose-600 font-bold italic">
              Special Cake Today
            </span>
          </h2>
          <p className="text-rose-900/75 text-xs sm:text-base">
            Reach out directly by phone, WhatsApp, or submit your celebration details below. We are here to make your sweet moments unforgettable!
          </p>
        </div>

        {/* Cohesive 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch max-w-2xl lg:max-w-none mx-auto w-full">
          {/* Left Column: Unified Bakery & Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-white/95 border border-rose-200/90 shadow-[0_10px_35px_rgba(244,114,182,0.14)] backdrop-blur-sm">
            <div>
              {/* Bakery Atelier Header */}
              <div className="flex items-center gap-3 pb-4 sm:pb-5 border-b border-rose-100">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-rose-300 shadow-sm shrink-0 bg-rose-50">
                  <Image
                    src="/images/logo.jpg"
                    alt="FS Cake Gallery Official Bakery Studio Logo"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-rose-950 truncate">
                      FS CAKE GALLERY
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700 uppercase shrink-0">
                      Homemade
                    </span>
                  </div>
                  <p className="font-cursive text-xs sm:text-sm text-rose-600 truncate">
                    Special cake for special day ♡
                  </p>
                </div>
              </div>

              {/* Contact Phone Numbers */}
              <div className="py-4 sm:py-5 border-b border-rose-100 space-y-2.5 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500 block">
                  Direct Phone Lines
                </span>

                {/* Primary Line */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-rose-50/70 border border-rose-200/70 flex items-center justify-between transition-colors hover:bg-rose-50 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-xs shrink-0">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] text-rose-500 uppercase font-bold block truncate">
                        Primary &amp; WhatsApp
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-rose-950">
                        {CONTACT_INFO.phone1}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shadow-xs transition-transform hover:scale-102"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Chat</span>
                    </a>
                    <a
                      href={`tel:${CONTACT_INFO.phone1}`}
                      className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                {/* Secondary Line */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-rose-50/70 border border-rose-200/70 flex items-center justify-between transition-colors hover:bg-rose-50 gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-xs shrink-0">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] text-rose-500 uppercase font-bold block truncate">
                        Secondary Line
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-rose-950">
                        {CONTACT_INFO.phone2}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.phone2}`}
                    className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* Location & Delivery Information */}
              <div className="py-4 sm:py-5 border-b border-rose-100 space-y-2.5 sm:space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                      Bakery Kitchen Locations
                    </span>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-rose-950">
                      Hemmathagama &amp; Thalgaspitiya
                    </h4>
                    <p className="text-[11px] sm:text-xs text-rose-800/80 mt-0.5 leading-relaxed">
                      Freshly prepared from our local home ateliers in Hemmathagama &amp; Thalgaspitiya.
                    </p>
                  </div>
                </div>

                {/* Delivery Pill Badge */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100/70 border border-rose-200/80 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bike className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1">
                      Doorstep Delivery Available 🛵
                    </span>
                    <p className="text-[10px] sm:text-[11px] text-rose-700/90 leading-tight">
                      Available across Hemmathagama, Thalgaspitiya &amp; nearby areas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3.5 sm:pt-4 space-y-2 sm:space-y-2.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500 block">
                  Follow Us Online
                </span>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {/* Instagram */}
                  <a
                    href={CONTACT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 flex items-center gap-1.5 sm:gap-2 text-rose-950 transition-all hover:scale-102 group min-w-0"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <InstagramIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="overflow-hidden min-w-0">
                      <span className="text-[8px] sm:text-[9px] text-rose-500 uppercase font-bold block leading-none">
                        Instagram
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-rose-900 group-hover:text-rose-600 truncate block">
                        {CONTACT_INFO.instagramHandle}
                      </span>
                    </div>
                  </a>

                  {/* TikTok */}
                  <a
                    href={CONTACT_INFO.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 flex items-center gap-1.5 sm:gap-2 text-rose-950 transition-all hover:scale-102 group min-w-0"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <TikTokIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="overflow-hidden min-w-0">
                      <span className="text-[8px] sm:text-[9px] text-rose-500 uppercase font-bold block leading-none">
                        TikTok
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-rose-900 group-hover:text-rose-600 truncate block">
                        {CONTACT_INFO.tiktokHandle}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Friendly Note */}
            <div className="mt-4 sm:mt-5 pt-3 border-t border-rose-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-rose-700/80 italic">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 shrink-0" />
              <span>Please order custom cakes 1–2 days in advance for best care.</span>
            </div>
          </div>

          {/* Right Column: Instant WhatsApp Order Generator */}
          <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-white/95 border border-rose-200/90 shadow-[0_10px_35px_rgba(244,114,182,0.14)] backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-1.5 text-rose-600 font-cursive text-lg sm:text-2xl font-bold mb-1">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                Fast Custom Cake Order
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-rose-950 mb-1">
                Send Your Order In Seconds
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-800/80 mb-4 sm:mb-5">
                Fill in your celebration details and we will instantly format your order message directly into WhatsApp!
              </p>

              <form onSubmit={handleWhatsAppSend} className="space-y-3 sm:space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Fathima / Sarah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 placeholder:text-rose-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Contact Phone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 077 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 placeholder:text-rose-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Occasion / Cake Type
                    </label>
                    <select
                      value={formData.cakeType}
                      onChange={(e) => setFormData({ ...formData, cakeType: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    >
                      <option value="Birthday Cake">Birthday Cake</option>
                      <option value="Wedding Cake">Wedding Cake</option>
                      <option value="Anniversary Cake">Anniversary Cake</option>
                      <option value="Bridal Shower / Groom Cake">Bridal Shower / Groom Cake</option>
                      <option value="Korean Bento Cake">Korean Bento Cake</option>
                      <option value="Floral Cupcake Box">Floral Cupcake Box</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Event / Delivery Date
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Preferred Flavor
                    </label>
                    <select
                      value={formData.flavor}
                      onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    >
                      <option value="Chocolate Fudge">Rich Chocolate Fudge</option>
                      <option value="Classic Vanilla Ribbon">Classic Vanilla Ribbon</option>
                      <option value="Strawberry Shortcake">Strawberry Shortcake</option>
                      <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                      <option value="Coffee Mocha">Coffee Mocha</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                      Delivery Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                    >
                      <option value="Hemmathagama">Hemmathagama</option>
                      <option value="Thalgaspitiya">Thalgaspitiya</option>
                      <option value="Mawanella / Nearby Delivery">Mawanella / Nearby</option>
                      <option value="Self Pickup">Self Pickup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-900 block mb-1">
                    Name on Cake &amp; Inscription / Theme Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 'Happy 19th Birthday Sarah!', theme colors, butterflies, car topper..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-base sm:text-xs text-rose-950 placeholder:text-rose-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-[0_4px_18px_rgba(5,150,105,0.3)] flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Send Order to WhatsApp ({CONTACT_INFO.phone1})</span>
                </button>
              </form>
            </div>

            {/* Order Reassurance Badge */}
            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-center gap-2 text-[11px] text-rose-800/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Instant direct WhatsApp confirmation • No payment required upfront</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
