/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/landing",
      },
      {
        source: "/dashboard/:path*",
        destination: "/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "api.companyurlfinder.com",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
