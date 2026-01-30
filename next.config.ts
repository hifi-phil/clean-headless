import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  async headers() {
    return [
      {
        source: "/api/revalidate",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
        ],
      },
    ];
  },
  images: {
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
};

export default nextConfig;
