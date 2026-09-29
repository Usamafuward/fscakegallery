"use client";

import Image from "next/image";
import { Phone, MapPin, Bike } from "lucide-react";
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

export function Footer() {

  return (
    <footer className="bg-[#fff6f0] border-t border-rose-200/80 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden text-rose-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 sm:pb-12 border-b border-rose-200/60">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-rose-300 shadow-sm bg-white">
                <Image
                  src="/images/logo.jpg"
                  alt="FS Cake Gallery Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-rose-950">
                  FS CAKE GALLERY
                </h3>
                <p className="font-cursive text-rose-600 font-bold text-base">
                  Special cake for special day
                </p>
              </div>
            </div>

            <p className="text-xs text-rose-800/85 leading-relaxed max-w-sm mb-4">
              Homemade custom cakes baked fresh with love in Hemmathagama &amp; Thalgaspitiya. 
              Celebrating your birthdays, weddings, anniversaries, and sweet everyday moments ♡.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
              <Bike className="w-3.5 h-3.5 text-rose-600" />
              <span>Delivery available across local areas</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-sm text-rose-950 uppercase tracking-wider mb-4">
              Our Cakes
            </h4>
            <ul className="space-y-2 text-xs text-rose-800/90 font-medium">
              <li>
                <a href="#gallery" className="hover:text-rose-600 transition-colors">
                  Birthday Theme Cakes
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-rose-600 transition-colors">
                  Wedding Celebration Tiers
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-rose-600 transition-colors">
                  Anniversary Romantic Cakes
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-rose-600 transition-colors">
                  Korean Bento Box Cakes
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-rose-600 transition-colors">
                  Gourmet Floral Cupcake Boxes
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-rose-600 transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Socials */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-sm text-rose-950 uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-rose-800 mb-5">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone1}`} className="hover:underline font-bold">
                  {CONTACT_INFO.phone1}
                </a>
                <span>/</span>
                <a href={`tel:${CONTACT_INFO.phone2}`} className="hover:underline font-bold">
                  {CONTACT_INFO.phone2}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.locations}</span>
              </p>
            </div>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-2">
              Connect with us:
            </h5>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200 text-xs font-bold text-rose-900 hover:text-rose-600 shadow-xs"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>{CONTACT_INFO.instagramHandle}</span>
              </a>

              <a
                href={CONTACT_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-black shadow-xs"
              >
                <span className="text-[11px]">♪</span>
                <span>{CONTACT_INFO.tiktokHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-700/80 gap-3 text-center sm:text-left">
          <p className="flex items-center justify-center sm:justify-start gap-1">
            © {new Date().getFullYear()} FS Cake Gallery. Made with love, for your sweet moments ♡
          </p>

          <p className="flex items-center gap-1">
            <span>Designed &amp; Developed by</span>
            <a
              href="https://usamapuward.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-rose-950 hover:text-rose-600 underline underline-offset-2 transition-colors"
              title="Usama Puward | AI/ML Engineer & Full-Stack Developer"
            >
              Usama Puward
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
