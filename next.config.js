const withMDX = require('@next/mdx')({
  options: { remarkPlugins: ['remark-gfm'] },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = withMDX(nextConfig)
