import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
      serverActions: {
         bodySizeLimit: '20mb',
      },
   },
   webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
   },
};

export default nextConfig;
