/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  reactStrictMode: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn-icons-png.flaticon.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
