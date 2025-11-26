'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-2xl border-b border-surface/60 shadow-2xl shadow-primary/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            {/* Developed by Peruvian badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-effect border border-text/10 hover:border-primary/30 transition-all group"
            >
              {/* Peru Flag SVG */}
              <svg 
                className="w-6 h-4 flex-shrink-0" 
                viewBox="0 0 900 600" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                }}
              >
                <rect width="900" height="600" fill="#D91023"/>
                <rect x="0" y="0" width="300" height="600" fill="#D91023"/>
                <rect x="300" y="0" width="300" height="600" fill="#ffffff"/>
                <rect x="600" y="0" width="300" height="600" fill="#D91023"/>
              </svg>
              <span className="text-xs font-semibold text-text/70 group-hover:text-primary transition-colors whitespace-nowrap">
                {t.nav.developedBy}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient"
            >
              Ω Omega-Visual
            </motion.div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {[
              { href: '#features', label: t.nav.features },
              { href: '#use-cases', label: t.nav.useCases },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-text/80 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>

          <button
            className="md:hidden text-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-background"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-text hover:text-primary">
                {t.nav.features}
              </a>
              <a href="#use-cases" className="block text-text hover:text-primary">
                {t.nav.useCases}
              </a>
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

