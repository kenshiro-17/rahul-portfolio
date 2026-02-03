import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Turbopack configuration (Next.js 16+)
  turbopack: {
    rules: {
      "*.glsl": ["raw-loader"],
      "*.vert": ["raw-loader"],
      "*.frag": ["raw-loader"],
    },
  },

  // Transpile Three.js packages
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      "framer-motion",
      "@react-three/drei",
      "three",
    ],
  },

  // Reduce build output noise
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
