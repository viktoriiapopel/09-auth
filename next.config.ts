// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🔹 Тимчасово ігноруємо ESLint під час build (Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔹 Інші налаштування Next.js можна додати тут
};

module.exports = nextConfig;
