import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH=/visaprepper only for the interim
// `<username>.github.io/visaprepper` deploy (see .github/workflows/deploy.yml).
// Leave it unset once the visaprepper.com custom domain is attached.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
