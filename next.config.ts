import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las fotos del catálogo viven en Cloudinary; el admin puede usar otras URLs https
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
