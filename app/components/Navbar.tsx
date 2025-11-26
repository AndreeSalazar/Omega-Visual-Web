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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-xl border-b border-surface/50 shadow-lg shadow-primary/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
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
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(255, 107, 53, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-primary rounded-lg font-semibold text-white relative overflow-hidden group"
            >
              <span className="relative z-10">{t.nav.joinBeta}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
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
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button className="flex-1 px-6 py-2 bg-gradient-primary rounded-lg font-semibold text-white">
                  {t.nav.joinBeta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

