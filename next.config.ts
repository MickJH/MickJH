import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS in `out/` for GitHub Pages. Server components run at build time.
  output: "export",
  // GitHub Pages has no image optimizer; the portrait is pre-sized to WebP in /public.
  images: { unoptimized: true },
  reactCompiler: true,
  // No cacheComponents: its Partial Prerendering cannot run in export mode, and with a
  // static export every server component already renders once, at build time.
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
