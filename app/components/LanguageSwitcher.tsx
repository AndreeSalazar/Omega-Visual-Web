'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import { Locale } from '@/lib/i18n'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Locale; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 glass-effect rounded-lg border border-text/20 hover:border-primary/50 transition-all"
      >
        <Globe size={18} className="text-text" />
        <span className="text-sm text-text hidden sm:inline">
          {languages.find((l) => l.code === locale)?.flag} {languages.find((l) => l.code === locale)?.name}
        </span>
        <span className="text-sm text-text sm:hidden">
          {languages.find((l) => l.code === locale)?.flag}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 glass-effect rounded-lg border border-text/20 overflow-hidden z-50 min-w-[160px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 flex items-center justify-between gap-3 hover:bg-surface/50 transition-colors ${
                    locale === lang.code ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span className="text-sm text-text">{lang.name}</span>
                  </div>
                  {locale === lang.code && (
                    <Check size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

