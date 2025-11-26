'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

export default function FinalCTA() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.3),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black mb-6 text-gradient"
        >
          {t.finalCTA.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-text/80 mb-12"
        >
          {t.finalCTA.subtitle}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.hero.emailPlaceholder}
              className="flex-1 px-6 py-4 bg-surface border border-text/20 rounded-lg text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting || submitted}
              className="px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                t.finalCTA.requesting
              ) : submitted ? (
                <>
                  <Check size={20} />
                  {t.finalCTA.requested}
                </>
              ) : (
                <>
                  {t.finalCTA.cta}
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-primary"
            >
              {t.finalCTA.success}
            </motion.p>
          )}
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-text/60 mb-8"
        >
          {t.finalCTA.earlyAccess}
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-text/40"
        >
          {t.finalCTA.trusted}{' '}
          <span className="text-text/60">[Tech Co] [AI Labs] [Security Inc]</span>
        </motion.div>
      </div>
    </section>
  )
}

