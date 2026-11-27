import type { MetadataRoute } from "next";

/** Home-screen name, icons and colours (the navy and white of the site). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Олександр Ситников",
    short_name: "Ситников",
    start_url: "/uk",
    display: "browser",
    lang: "uk",
    background_color: "#ffffff",
    theme_color: "#091129",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
