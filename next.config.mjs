/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://my-store-dashboard.vercel.app/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
