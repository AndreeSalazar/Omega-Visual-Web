/** @type {import('next').NextConfig} */
// For GitHub Pages: use basePath when building in GitHub Actions or when explicitly set
const isGithubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/Omega-Visual-Web' : ''

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true, // Required for GitHub Pages
  distDir: 'out',
  // Ensure static files are properly exported
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig

