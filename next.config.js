/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: { webpack5: true },
  images: {
    domains: ["www.themoviedb.org"],
  },
}

module.exports = nextConfig
