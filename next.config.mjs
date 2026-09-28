/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // lets a local production build run next to the dev server
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
export default nextConfig;
