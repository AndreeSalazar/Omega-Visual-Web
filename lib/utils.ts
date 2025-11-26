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
export function getAssetPath(path: string): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Check if we're on GitHub Pages by looking at the current pathname
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    // If pathname starts with /Omega-Visual-Web, we're on GitHub Pages
    if (pathname.startsWith('/Omega-Visual-Web')) {
      return `/Omega-Visual-Web/${cleanPath}`
    }
    // If we're at root in production, also use basePath
    if (pathname === '/' && window.location.hostname !== 'localhost') {
      return `/Omega-Visual-Web/${cleanPath}`
    }
  }
  
  // For server-side rendering or build time
  // Check environment variable or default to basePath for production
  const isProduction = typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
  const basePath = isProduction ? '/Omega-Visual-Web' : ''
  
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
}

