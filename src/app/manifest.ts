import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FS Cake Gallery",
    short_name: "FS Cakes",
    description: "Special cake for special day - Custom cakes in Hemmathagama & Thalgaspitiya",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf8",
    theme_color: "#fffcf8",
    icons: [
      {
        src: "/images/logo.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
    ],
  };
}
