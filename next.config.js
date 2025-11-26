/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true'
const basePath = isGithubPages ? '/Omega-Visual-Web' : ''

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig

