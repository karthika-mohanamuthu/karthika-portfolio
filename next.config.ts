import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages. PAGES_BASE_PATH is set in CI
  // (e.g. "/karthika-portfolio") so assets resolve under the repo sub-path.
  output: "export",
  basePath: process.env.PAGES_BASE_PATH || "",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
