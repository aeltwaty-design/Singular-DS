import createNextIntlPlugin from 'next-intl/plugin';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["iconsax-react"] = require.resolve("iconsax-react");
    return config;
  },
};

export default withNextIntl(nextConfig);