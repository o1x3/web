/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  turbopack: {
    rules: {
      '*.css': ['postcss-loader'],
    },
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
      }
      config.cache = {
        type: 'filesystem',
      }
    }
    
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }
    
    return config
  },
}

module.exports = nextConfig