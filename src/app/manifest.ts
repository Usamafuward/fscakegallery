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
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
