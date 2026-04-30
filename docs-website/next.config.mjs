import createNextIntlPlugin from 'next-intl/plugin';
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const withNextIntl = createNextIntlPlugin();

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
    config.resolve.alias["@singular/react"] = path.resolve(process.cwd(), "../packages/react/src");
    return config;
  },
};

export default withNextIntl(nextConfig);