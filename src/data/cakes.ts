export interface CakeItem {
  id: string;
  name: string;
  category: "birthday" | "wedding" | "anniversary" | "event" | "bento" | "cupcakes";
  categoryLabel: string;
  image: string;
  tagline: string;
  description: string;
  serving: string;
  flavorOptions: string[];
  popular?: boolean;
}

export const CAKES: CakeItem[] = [
  {
    id: "birthday-celebration-dream",
    name: "Lavender Butterfly Dream Cake",
    category: "birthday",
    categoryLabel: "Birthday Cake",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80",
    tagline: "Rustic pastel buttercream, delicate wafer paper butterflies & golden pearls",
    description:
      "A magical handcrafted birthday showpiece crafted with soft pastel textured buttercream, delicate edible sugar butterflies, golden pearls, and custom Happy Birthday lettering.",
    serving: "15 - 20 slices",
    flavorOptions: ["Vanilla Ribbon", "Chocolate Fudge", "Strawberry Cream", "Butterscotch"],
    popular: true,
  },
  {
    id: "pastel-berry-birthday",
    name: "Pastel Berry Celebration Cake",
    category: "birthday",
    categoryLabel: "Birthday Cake",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    tagline: "Pink velvet sponge with fresh forest berries and smooth vanilla frosting",
    description:
      "Luscious multi-layer homemade birthday cake loaded with fresh raspberries, blackberries, and silky vanilla bean frosting. Perfect for milestone birthday parties.",
    serving: "12 - 16 slices",
    flavorOptions: ["Strawberry Shortcake", "Rich Chocolate Fudge", "Vanilla Ribbon"],
    popular: false,
  },
  {
    id: "white-floral-wedding",
    name: "Grand White Flora Wedding Tier",
    category: "wedding",
    categoryLabel: "Wedding Cake",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
    tagline: "Multi-tiered elegant wedding cake with white garden blossoms and pearls",
    description:
      "Bespoke luxury wedding tiers finished in pristine white Swiss meringue buttercream, cascading edible roses, and delicate pearl detailing tailored for your unforgettable union.",
    serving: "50 - 80 guests (Multi-tier)",
    flavorOptions: ["Royal Fruit Cake", "Classic Ribbon Cake", "White Chocolate Raspberry"],
    popular: true,
  },
  {
    id: "sweetheart-strawberry-anniversary",
    name: "Sweetheart Strawberry Anniversary Cake",
    category: "anniversary",
    categoryLabel: "Anniversary Cake",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    tagline: "Decadent strawberry compote glaze with smooth cream and heart motifs",
    description:
      "Celebrate your love milestone with decadent homemade strawberry fruit glaze, pillowy vanilla sponge, and personalized anniversary year inscriptions.",
    serving: "10 - 15 slices",
    flavorOptions: ["Red Velvet", "Belgian Chocolate Fudge", "Strawberry Cream"],
    popular: true,
  },
  {
    id: "golden-macaron-event",
    name: "Golden Glamour Event Cake",
    category: "event",
    categoryLabel: "Event & Bridal",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80",
    tagline: "Golden drip accents, handmade macarons, and celebratory event toppers",
    description:
      "Designed for bridal showers, engagements, graduations, and corporate banquets. Crowned with pastel macarons, gold leaf flakes, and tailored custom toppers.",
    serving: "20 - 25 slices",
    flavorOptions: ["Dark Chocolate Fudge", "Classic Ribbon Cake", "Coffee Mocha"],
    popular: true,
  },
  {
    id: "contemporary-artisan-event",
    name: "Rose Quartz Bridal Soiree Cake",
    category: "event",
    categoryLabel: "Event & Bridal",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80",
    tagline: "Chic contemporary tier with artistic textural brushstrokes",
    description:
      "Sophisticated cake design ideal for bridal showers, gender reveals, and family anniversaries. Finished with delicate pastel pink textured brushstrokes.",
    serving: "18 - 22 slices",
    flavorOptions: ["Vanilla Almond Joconde", "Chocolate Ganache", "Red Velvet"],
    popular: false,
  },
  {
    id: "korean-berry-bento",
    name: "Korean Strawberry Glaze Bento",
    category: "bento",
    categoryLabel: "Bento & Mini",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80",
    tagline: "Cute mini takeaway bento box cake with fresh strawberries & whipped cream",
    description:
      "Our most popular takeaway mini cake! Fluffy vanilla sponge layered with homemade strawberry glaze and sweet personalized lettering inside a charming bento clamshell box.",
    serving: "1 - 2 persons (4-inch mini)",
    flavorOptions: ["Strawberry Shortcake", "Vanilla Bean", "Red Velvet", "Choco Fudge"],
    popular: true,
  },
  {
    id: "blush-rose-cupcakes-box",
    name: "Blush Rose Piped Cupcake Box",
    category: "cupcakes",
    categoryLabel: "Cupcakes & Treats",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80",
    tagline: "12-Piece gift box with floral rosette buttercream piping in pastel shades",
    description:
      "An edible floral bouquet! A dozen freshly baked cupcakes individually piped with realistic buttercream roses, ranunculus, and golden pearls in a rustic gift box.",
    serving: "12 Gourmet Cupcakes",
    flavorOptions: ["Assorted Vanilla & Chocolate", "Red Velvet Cream Cheese", "Caramel Drizzle"],
    popular: true,
  },
  {
    id: "swirl-treats-cupcakes",
    name: "Artisan Swirl Celebration Cupcakes",
    category: "cupcakes",
    categoryLabel: "Cupcakes & Treats",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80",
    tagline: "Fluffy vanilla and chocolate cupcakes with towering swirl buttercream",
    description:
      "Classic party crowd-pleaser! Towering buttercream swirls decorated with colorful sprinkles and mini chocolate pearls for birthdays and events.",
    serving: "6 or 12 Pieces",
    flavorOptions: ["Chocolate Hazelnut", "Vanilla Strawberry", "Cookies & Cream"],
    popular: false,
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Cakes" },
  { id: "birthday", label: "Birthday Cakes" },
  { id: "wedding", label: "Wedding Cakes" },
  { id: "anniversary", label: "Anniversary Cakes" },
  { id: "event", label: "Event & Bridal" },
  { id: "bento", label: "Bento & Mini" },
  { id: "cupcakes", label: "Cupcakes" },
];

export const CONTACT_INFO = {
  phone1: "0778108824",
  phone2: "0777414759",
  locations: "Hemmathagama & Thalgaspitiya",
  deliveryNote: "Delivery available across Hemmathagama, Thalgaspitiya & nearby regions 🛵",
  tiktok: "https://tiktok.com/@fscake_gallery",
  tiktokHandle: "@fscake_gallery",
  instagram: "https://instagram.com/fscake_gallery",
  instagramHandle: "@fscake_gallery",
  whatsappNumber: "94778108824",
};
