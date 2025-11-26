import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K+`
  }
  return num.toString()
}

// Get the correct asset path for GitHub Pages
// Next.js automatically handles basePath for static assets, but we need to ensure
// the path is correct during build time and runtime
export function getAssetPath(path: string): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // During build time (SSR/SSG), use environment variable or default basePath
  if (typeof window === 'undefined') {
    const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true'
    const basePath = isGithubPages ? '/Omega-Visual-Web' : ''
    return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
  }
  
  // Runtime: Check if we're on GitHub Pages by looking at the current pathname
  const pathname = window.location.pathname
  // If pathname starts with /Omega-Visual-Web, we're on GitHub Pages
  if (pathname.startsWith('/Omega-Visual-Web')) {
    return `/Omega-Visual-Web/${cleanPath}`
  }
  
  // For localhost, use root path
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return `/${cleanPath}`
  }
  
  // For production (non-GitHub Pages), also use basePath if needed
  // This handles cases where the site might be deployed elsewhere
  return `/${cleanPath}`
}

