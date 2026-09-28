export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fscakegallery.vercel.app";

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${siteUrl}/#bakery`,
    "name": "FS Cake Gallery",
    "alternateName": [
      "fs cake gallery",
      "fscake_gallery",
      "FS Cakes",
      "FS Cake Gallery Sri Lanka",
      "FS Cake Gallery Hemmathagama"
    ],
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.jpg`,
    "image": [
      `${siteUrl}/images/poster.jpg`,
      `${siteUrl}/images/logo.jpg`
    ],
    "description": "FS Cake Gallery - Special cake for special day. Fresh homemade custom cakes for birthdays, weddings, anniversaries, Korean bento cakes & floral cupcakes in Hemmathagama & Thalgaspitiya.",
    "telephone": ["+94778108824", "+94777414759"],
    "priceRange": "$$",
    "currenciesAccepted": "LKR",
    "paymentAccepted": "Cash, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hemmathagama",
      "addressRegion": "Sabaragamuwa Province",
      "addressCountry": "LK"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Hemmathagama"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Thalgaspitiya"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Mawanella"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kegalle"
      },
      {
        "@type": "Country",
        "name": "Sri Lanka"
      }
    ],
    "sameAs": [
      "https://instagram.com/fscake_gallery",
      "https://tiktok.com/@fscake_gallery"
    ],
    "servesCuisine": [
      "Custom Cakes",
      "Birthday Cakes",
      "Wedding Tiers",
      "Anniversary Cakes",
      "Korean Bento Cakes",
      "Floral Cupcakes"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "FS Cake Gallery Specialties",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Custom Birthday Cakes",
            "description": "Handcrafted celebration birthday cakes with personalized themes and flavors."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Wedding Cakes & Tiers",
            "description": "Multi-tier elegant custom wedding cakes finished with fresh florals and delicate piping."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Romantic Anniversary Cakes",
            "description": "Romantic handcrafted anniversary cakes tailored to celebrate love stories."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Korean Bento Lunchbox Cakes",
            "description": "Cute aesthetic mini bento box cakes ideal for intimate surprises."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Gourmet Floral Cupcake Sets",
            "description": "Towering swirl buttercream floral cupcakes in custom gift boxes."
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": "FS Cake Gallery",
    "alternateName": ["fs cake gallery", "fscake_gallery"],
    "url": siteUrl,
    "inLanguage": "en-LK",
    "publisher": {
      "@id": `${siteUrl}/#bakery`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
