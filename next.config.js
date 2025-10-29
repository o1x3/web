/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
}

module.exports = nextConfig