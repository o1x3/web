const withMDX = require('@next/mdx')({
  options: { remarkPlugins: ['remark-gfm'] },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,
}

module.exports = withMDX(nextConfig)
