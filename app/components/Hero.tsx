'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Code, Zap, Users } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

export default function Hero() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 10000
    const duration = 2000
    const steps = 60
    const increment = target / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        return next >= target ? target : next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15), transparent 50%)',
              'radial-gradient(circle at 60% 40%, rgba(255,107,53,0.2), transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.15), transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 80% 20%, rgba(0,217,255,0.15), transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(0,217,255,0.2), transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(0,217,255,0.15), transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(224,231,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(224,231,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating particles with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const startX = Math.random() * 1920
          const startY = Math.random() * 1080
          const size = Math.random() * 3 + 1
          const duration = Math.random() * 15 + 15
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, rgba(255,107,53,0.6), transparent)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(0,217,255,0.6), transparent)'
                  : 'radial-gradient(circle, rgba(255,217,61,0.4), transparent)',
                boxShadow: `0 0 ${size * 4}px currentColor`,
              }}
              initial={{
                x: startX,
                y: startY,
                opacity: 0,
              }}
              animate={{
                y: [startY, Math.random() * 1080, startY],
                x: [startX, Math.random() * 1920, startX],
                opacity: [0, 1, 0.5, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.3, 0.5, 0.7, 1],
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 glass-effect rounded-full mb-8 border-primary/30 glow-primary"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            🔥
          </motion.span>
          <span className="text-sm font-semibold text-text">{t.hero.badge}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <motion.span
            className="text-gradient block"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            {t.hero.title1}
          </motion.span>
          <motion.span
            className="text-gradient block mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t.hero.title2}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-text/80 mb-12 max-w-3xl mx-auto whitespace-pre-line"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {[
            { icon: Code, text: t.hero.badge1, colorClass: 'border-secondary/30 hover:border-secondary/60', iconClass: 'text-secondary' },
            { icon: Zap, text: t.hero.badge2, colorClass: 'border-accent/30 hover:border-accent/60', iconClass: 'text-accent' },
            { icon: Check, text: t.hero.badge3, colorClass: 'border-primary/30 hover:border-primary/60', iconClass: 'text-primary' },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`flex items-center gap-2 px-5 py-2.5 glass-effect rounded-lg ${badge.colorClass} transition-all cursor-default`}
            >
              <badge.icon size={18} className={badge.iconClass} />
              <span className="text-sm font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold">
            <Users className="text-primary" size={32} />
            <span className="text-gradient">
              {Math.floor(count).toLocaleString()}+
            </span>
            <span className="text-text/60">{t.hero.counter}</span>
          </div>
        </motion.div>

        {/* Email Capture Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting || submitted}
              className="px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Joining...
                  </>
                ) : submitted ? (
                  <>
                    <Check size={20} />
                    Joined!
                  </>
                ) : (
                  <>
                    Join Private Beta
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              {!isSubmitting && !submitted && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </motion.button>
          </div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-primary"
            >
              {t.hero.success}
            </motion.p>
          )}
        </motion.form>

        {/* CTA Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-text/60"
        >
          {t.hero.earlyAccess}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-text/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

