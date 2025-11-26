/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Omega-Visual-Web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Omega-Visual-Web' : '',
  trailingSlash: true,
}

module.exports = nextConfig

